import React, { useCallback } from 'react'

export const PermissionsArea = ({ modules, checks, updateChecks, rolSelected }) => {

  /**
   * Handler para cuando cambia el estado del check.
   * Se busca los permisos del rol
   * Se busca si el submodulo existe en los permisos
   * Si no existe el submodulo se agrega, caso contrario se cambia su  estado checked
   * Se actualiza los permisos (checks)
   */
  const onChangeCheck = useCallback((e, submodule) => {
    const { checked } = e.target
    let permissionsGroupedByRol = [...checks]
    let rolFinded = permissionsGroupedByRol.find(rol => rol.id === rolSelected.rolId)

    //verificamos si existe el submodulo
    let index = rolFinded.permissions.findIndex(per => per.module_id === submodule.id)
    if (index < 0) {
      rolFinded.permissions.push({ rol_id: rolSelected.rolId, module_id: submodule.id, checked })
    } else {
      rolFinded.permissions[index].checked = checked
    }

    console.log(permissionsGroupedByRol);
    updateChecks(permissionsGroupedByRol)
  }, [checks, rolSelected])


  /**
   * Funcion para determinar el valor del check
   * Se busca el rol
   * Se busca el submodulo en los permisos del rol
   * Devuelve false si no existe el submodulo, caso contrario devuelve el estado checked
   */
  const toggleSubmoduleCheck = useCallback(
    (submodule) => {
      let rol = checks?.find(rol => rol.id === rolSelected.rolId)
      let moduleFinded = rol?.permissions?.find(per => per.module_id === submodule.id)
      if (!moduleFinded) return false
      return moduleFinded.checked ? true : false
    },
    [checks, rolSelected]
  )

  return (
    <div className='d-flex flex-column w-100'>
      <div className='fw-bold mb-3 fst-italic'>Módulos</div>
      <ul className='module-area'>
        {
          modules?.map(module => {
            return (
              <li key={module.id}>
                <div className='module-header'>{module.name}</div>
                <ul>
                  {
                    module.submodules.length > 0 ?
                      module.submodules.map(sub => {
                        return (
                          <li key={sub.id}>
                            <div className='d-flex justify-content-between'>
                              <div className='submodule-name'>{sub.name}</div>
                              <div>
                                <input
                                  type={'checkbox'}
                                  checked={toggleSubmoduleCheck(sub)}
                                  onChange={(e) => onChangeCheck(e, sub)}
                                />
                              </div>
                            </div>
                          </li>
                        )
                      }) : <div className='submodule-name'>Sin submodulos</div>
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
