import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserService } from 'services/UserService';
import UserContext from '../contexts/UserContext';
import LoginService from '../services/LoginService';

export const useUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [hasPermission, setHasPermission] = useState(null);

  const login = useCallback((credentials) => {
    LoginService(credentials)
      .then(res => {
        let userFromService = res.data.data;
        window.localStorage.setItem('user', JSON.stringify(userFromService));
        setUser(userFromService);
        console.log(userFromService);
        navigate("/");
      })
      .catch(err => {
        console.error(err);
      });

  }, [setUser, navigate]);

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    navigate('login');
  }

  const updateUserPermissions = useCallback(
    async () => {
      let userWithPermissions = await UserService.getUserById(user.id)
      window.localStorage.setItem('user', JSON.stringify(userWithPermissions));
      setUser(userWithPermissions)
    },
    [setUser, user],
  )


  const findPermissionByPath = useCallback((path) => {
    if (path === "" || !path || !user) return null;
    for (let index = 0; index < user.permissions.length; index++) {
      const permission = user.permissions[index];
      //buscamos primero en submodules
      if (path.includes(permission.module.path) && permission.checked === 1) {
        return permission
      }
    }
    return null
  }, [user])

  const hasPermissionToCurrentModule = useCallback((path) => {
    let permission = findPermissionByPath(path);
    if (!permission) return false;
    return permission.checked === 1 ? true : false;
  }, [findPermissionByPath])

  useEffect(() => {
    setHasPermission(hasPermissionToCurrentModule(location.pathname));
  }, [location, user, hasPermissionToCurrentModule]);

  return {
    isLogged: Boolean(user),
    hasPermission,
    login,
    user,
    logout,
    hasPermissionToCurrentModule,
    updateUserPermissions
  }
};
