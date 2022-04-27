import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import LoginService from '../services/LoginService';

export const useUser = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [currentModule, setCurrentModule] = useState(JSON.parse(localStorage.getItem('currentModule')) || -1);
  const { user, setUser } = useContext(UserContext);
  const [hasPermission,setHasPermission]=useState(false);

  const login = useCallback((form) => {
    LoginService(form)
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
    window.localStorage.removeItem('currentModule');
    setUser(null);
    setCurrentModule(-1);
    navigate('login');
  }

  const updateCurrentModule = (module) => {
    let parentModuleId = module.parent_id;
    setCurrentModule(module.module_id);
    window.localStorage.setItem('currentModule', JSON.stringify({
      parentModule: parentModuleId || module.module_id,
      submodule: parentModuleId ? module.module_id : -1
    }));
  }

  const findModuleByPath=(path)=>{
    if(path==="" || !path || !user) return null;
    for (let index = 0; index < user.permissions.length; index++) {
      const permission = user.permissions[index];
      if(permission.submodules && permission.submodules.length>0){
        //buscamos primero en submodules
        let submodule= permission.submodules.find((submodule)=>{
          return path.includes(submodule.path) && submodule.checked===1;
        });
        if(submodule) return submodule;
        if(path.includes(permission.path) && permission.checked===1) return permission;
        
      }else{
        //console.log(path.includes(permission.path) && permission.checked===1);
        if(path.includes(permission.path) && permission.checked===1) return permission;
      }
      //if(path.includes(permission.path))return permission;

    }
    return null
  }

  const hasPermissionToCurrentModule = (path) => {
    let module=findModuleByPath(path);
    //console.log(module);
    if(!module)return false;
    return module.checked===1 ? true : false;
  }

  useEffect(() => {
    setHasPermission(hasPermissionToCurrentModule(location.pathname));
  }, [location]);
  
  return {
    isLogged: Boolean(user),
    hasPermission,
    login,
    user,
    logout,
    currentModule,
    updateCurrentModule,
    hasPermissionToCurrentModule
  }
};
