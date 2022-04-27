import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { END_POINT } from 'utils/conf'
import 'css/Permisos.css'
import ToastContext from 'contexts/ToastContext'
import UserContext from 'contexts/UserContext'
import PermissionService from 'services/PermissionService'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'hooks/useUser'

export const Permissions = () => {
  const navigate=useNavigate();
  const { openToast } = useContext(ToastContext);
  const {isLogged,user } = useUser();
  const [modules, setModules] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedChecks,setSelectedChecks]=useState(new Map());


  const createMapOfPermissions=(permissions)=>{
    let map=new Map();
    permissions.forEach(permission => {
      let key=permission.rol_id.toString()+permission.module_id.toString();
      map.set(key,permission);
    });
    return map;
  }

  const loadModules = async () => {
    let modulesFromService =await PermissionService.getModulesWithSubmodules();
    setModules(modulesFromService);
  }

  const loadRoles = async () => {
    let rolesFromService = await PermissionService.getRoles();
    setRoles(rolesFromService);
  }

  const loadPermissions=async()=>{
    let permissions = await PermissionService.getPermissions();
    console.log(permissions);
    let selected=[];
    permissions.forEach(permission => {
      selected.push(permission);
    });
    console.log(createMapOfPermissions(permissions));
    setSelectedChecks(createMapOfPermissions(permissions));
  }

  useEffect(() => {
    if(!isLogged)return navigate("login");
    loadModules();
    loadRoles();
    loadPermissions();
  }, []);

  const handleChangeChecks = (e,rol_id,module_id) => {
    let checked=e.target.checked;
    let key=rol_id.toString()+module_id.toString();
    let newMap=new Map(selectedChecks);
    let permission=newMap.get(key);
    console.log("entro:",newMap===selectedChecks);
    if(permission){
      newMap.set(key,{
        module_id:permission.module_id,
        rol_id:permission.rol_id,
        checked,
        submodules:updateSubmoduleChecks(getSubmodules(module_id),checked,rol_id)
      });
      console.log(newMap);
      setSelectedChecks(newMap);
    }else{//Se crea un nuevo objeto con el modulo y submodulos
      newMap.set(key,{
        module_id,
        rol_id,
        checked,
        submodules:updateSubmoduleChecks(getSubmodules(module_id),checked,rol_id)
      });
      console.log(newMap);
      setSelectedChecks(newMap);
    }
  };

  const getSubmodules=(module_id)=>{
    let module=modules.find((module)=>module.id===module_id);
    return module.submodules;
  }

  const updateSubmoduleChecks=(submodules,checked,rol_id)=>{
    console.log(submodules);
    return submodules.map((submodule)=>{
      return {
        module_id:submodule.id,
        rol_id,
        checked
      };
    })
  }
  const handleSave = async () => {

    try {
      console.log(Object.fromEntries(selectedChecks));
      await axios.post(END_POINT + "permisos", { permissions: Object.fromEntries(selectedChecks) }, {
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
                modules ? modules.map((module) => {
                  return (
                    <th key={module.id}>{module.name}</th>
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
                    <th>{rol.name}</th>
                    {
                      modules.map((module, index) => {
                        let key=rol.id.toString()+module.id.toString();
                        return (
                          <td key={index} className='text-center'>
                            <Form.Check 
                            checked={selectedChecks.get(key)?.checked ?? false}
                            onChange={(e)=>handleChangeChecks(e,rol.id,module.id)}/>
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
