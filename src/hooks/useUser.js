import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import LoginService from '../services/LoginService';

export const useUser = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [moduloActual, setModuloActual] = useState(JSON.parse(localStorage.getItem('moduloActual')) || -1);
  const { user, setUser } = useContext(UserContext);
  const [tienePermiso,setTienePermiso]=useState(false);

  const login = useCallback((form) => {
    LoginService(form)
      .then(res => {
        let userFromService = res.data.data;
        window.localStorage.setItem('user', JSON.stringify(userFromService));
        setUser(userFromService);
        navigate("home");
      })
      .catch(err => {
        console.error(err);
      });

  }, [setUser, navigate]);

  const logout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('moduloActual');
    setUser(null);
    setModuloActual(-1);
    navigate('login');
  }

  const actualizarModuloActual = (modulo) => {
    let idModuloPadre = modulo.id_parent;
    setModuloActual(modulo.id);
    window.localStorage.setItem('moduloActual', JSON.stringify({
      moduloPadre: idModuloPadre || modulo.id,
      submodulo: idModuloPadre ? modulo.id : -1
    }));
  }

  const encontrarModuloPorRuta=(path)=>{
    if(path==="" || !path || !user) return null;
    for (let index = 0; index < user.permisos.length; index++) {
      const permiso = user.permisos[index];
      if(permiso.submodulos && permiso.submodulos.length>0){
        //buscamos primero en submodulos
        let submodulo= permiso.submodulos.find((submodulo)=>{
          return path.includes(submodulo.path) && submodulo.checked===1;
        });
        if(submodulo) return submodulo;
        if(path.includes(permiso.path) && permiso.checked===1) return permiso;
        
      }else{
        //console.log(path.includes(permiso.path) && permiso.checked===1);
        if(path.includes(permiso.path) && permiso.checked===1) return permiso;
      }
      //if(path.includes(permiso.path))return permiso;

    }
    return null
  }

  const tienePermisoAlModuloActual = (path) => {
    let modulo=encontrarModuloPorRuta(path);
    //console.log(modulo);
    if(!modulo)return false;
    return modulo.checked===1 ? true : false;
  }

  useEffect(() => {
   
    setTienePermiso(tienePermisoAlModuloActual(location.pathname));
  }, [location]);
  
  return {
    isLogged: Boolean(user),
    tienePermiso,
    login,
    user,
    logout,
    moduloActual,
    actualizarModuloActual,
    tienePermisoAlModuloActual
  }
};
