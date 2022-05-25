import React, { useContext, useEffect, useState } from 'react'
import 'css/Permisos.css'
import ToastContext from 'contexts/ToastContext'
import PermissionService from 'services/PermissionService'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'hooks/useUser'
import { RolesArea } from './RolesArea'
import { PermissionsArea } from './PermissionsArea'
import 'css/PermissionStyle.css'
import { Button } from 'react-bootstrap'
import LoaderContext from 'contexts/LoaderContext'

/**
 * Mapea la data de la BD
 * @param {Array} permissionsGroupedByRole 
 * @returns 
 */
const initPermissions = (permissionsGroupedByRole) => {
  return permissionsGroupedByRole.map(rol => {
    return {
      id: rol.id,
      name: rol.name,
      permissions: rol.permissions.map(per => ({
        rol_id: per.rol_id,
        module_id: per.module_id,
        checked: per.checked === 1 ? true : false
      }))
    }
  })
}

export const Permissions = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //Other hooks
  const navigate = useNavigate()
  const { isLogged, user, updateUserPermissions } = useUser()
  //States
  const [data, setData] = useState({
    modules: [],
    roles: [],
    permissions: []
  })
  const [rolSelected, setRolSelected] = useState({ rolId: user.rol_id })
  const [checks, setChecks] = useState([])//Permisos agrupados por rol

  /**
   * Actualiza el rol seleccionado
   * @param {object} rol 
   */
  const udpateRolSelected = (rol) => {
    setRolSelected(rol)
  }

  /**
   * Carga los roles, modulos, submodulos y los permisos
   */
  const loadData = async () => {
    try {
      const p1 = PermissionService.getModulesWithSubmodules()
      const p2 = PermissionService.getRoles()
      const p3 = PermissionService.getPermissions()
      const values = await Promise.all([p1, p2, p3])
      console.log(initPermissions(values[2]))
      setData({
        modules: values[0],
        roles: values[1],
        permissions: values[2]
      })
      setChecks(initPermissions(values[2]))
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Actualiza los checks de los permisos
   * @param {Array} newChecks 
   */
  const updateChecks = (newChecks) => {
    setChecks(newChecks)
  }

  useEffect(() => {
    if (!isLogged) return navigate("login");
    loadData()
    return () => {
      setData({
        modules: [],
        roles: [],
        permissions: []
      })
      setChecks([])
    }
  }, []);

  /**
   * Guarda los nuevos permisos en la BD
   */
  const handleSave = async () => {
    try {
      console.log(checks)
      openLoader("Guardando cambios...")
      let response = await PermissionService.save({ permissionsGroupedByRol: checks })
      openLoader("Actualizando permisos del usuario...")
      await updateUserPermissions()
      closeLoader()
      openToast("Cambios guardados correctamente", true)
      console.log(response)
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h2 className='mb-3'>Roles y permisos</h2>
        <div className='d-flex justify-content-end mb-3'>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
        <div className='d-flex h-100'>
          <RolesArea
            roles={data.roles}
            onRolClick={udpateRolSelected}
            rolSelected={rolSelected} />

          <PermissionsArea
            modules={data.modules}
            checks={checks}
            rolSelected={rolSelected}
            updateChecks={updateChecks} />
        </div>
      </div>
    </>
  );
};
