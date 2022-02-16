import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { END_POINT } from 'utils/conf'
import 'css/Permisos.css'
import ToastContext from 'contexts/ToastContext'
import UserContext from 'contexts/UserContext'
import RolesPermisosService from 'services/RolesPermisosService'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'hooks/useUser'

export const Permisos = () => {
  const navigate=useNavigate();
  const { openToast } = useContext(ToastContext);
  const {isLogged,user } = useUser();
  const [modulos, setModulos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedChecks,setSelectedChecks]=useState(new Map());


  const crearMapa=(permisos)=>{
    let map=new Map();
    permisos.forEach(permiso => {
      let key=permiso.id_rol.toString()+permiso.id_modulo.toString();
      map.set(key,permiso);
    });
    return map;
  }

  const cargarModulos = async () => {
    let modulos =await RolesPermisosService.getModulosConSubmodulos();
    setModulos(modulos);
  }

  const cargarRoles = async () => {
    let roles = await RolesPermisosService.getRoles();
    setRoles(roles);
  }

  const cargarPermisos=async()=>{
    let permisos = await RolesPermisosService.getPermisos();
    console.log(permisos);
    let seleccionados=[];
    permisos.forEach(permiso => {
      seleccionados.push(permiso);
    });
    console.log(crearMapa(permisos));
    setSelectedChecks(crearMapa(permisos));
    
  }

  useEffect(() => {
    if(!isLogged)return navigate("login");
    cargarModulos();
    cargarRoles();
    cargarPermisos();
  }, []);

  const handleChangeChecks = (e,id_rol,id_modulo) => {
    let checked=e.target.checked;
    let key=id_rol.toString()+id_modulo.toString();
    let newMap=new Map(selectedChecks);
    let permiso=newMap.get(key);
    console.log("entro:",newMap===selectedChecks);
    if(permiso){
      newMap.set(key,{
        id_modulo:permiso.id_modulo,
        id_rol:permiso.id_rol,
        checked,
        submodulos:actualizarCheckedSubmodulos(getSubmodulos(id_modulo),checked,id_rol)
      });
      console.log(newMap);
      setSelectedChecks(newMap);
    }else{//Se crea un nuevo objeto con el modulo y submodulos
      newMap.set(key,{
        id_modulo,
        id_rol,
        checked,
        submodulos:actualizarCheckedSubmodulos(getSubmodulos(id_modulo),checked,id_rol)
      });
      console.log(newMap);
      setSelectedChecks(newMap);
    }
  };

  const getSubmodulos=(idModulo)=>{
    let modulo=modulos.find((modulo)=>modulo.id===idModulo);
    return modulo.submodulos;
  }

  const actualizarCheckedSubmodulos=(submodulos,checked,id_rol)=>{
    return submodulos.map((submodulo)=>{
      return {
        id_modulo:submodulo.id,
        id_rol,
        checked
      };
    })
  }
  const handleSave = async () => {

    try {
      console.log(Object.fromEntries(selectedChecks));
      await axios.post(END_POINT + "permisos", { permisos: Object.fromEntries(selectedChecks) }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      openToast('Datos guardados', true);

    } catch (error) {
      console.error(error);
      openToast('No se ha podido guardar los cambios', false);
    }
  }

  return (
    <>
      <div className='w-50 mx-auto mt-4'>
        <h2 className='mb-4'>Roles y permisos</h2>
        <table className='tb-permisos'>
          <thead className='text-center'>
            <tr>
              <th>

              </th>
              {
                modulos ? modulos.map((mod) => {
                  return (
                    <th key={mod.id}>{mod.nombre}</th>
                  )
                })
                  : "No se cargó los modulos"
              }
            </tr>
          </thead>
          <tbody>
            {
              roles.map((rol) => {
                return (
                  <tr key={rol.id}>
                    <th>{rol.nombre}</th>
                    {
                      modulos.map((modulo, index) => {
                        let key=rol.id.toString()+modulo.id.toString();
                        return (
                          <td key={index} className='text-center'>
                            <Form.Check 
                            checked={selectedChecks.get(key)?.checked ?? false}
                            onChange={(e)=>handleChangeChecks(e,rol.id,modulo.id)}/>
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className='d-flex justify-content-end'>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    </>
  );
};
