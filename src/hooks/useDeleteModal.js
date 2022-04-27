import DeleteModalContext from 'contexts/DeleteModalContext'
import React, { useContext } from 'react'

export const useDeleteModal = (params={}) => {
  const {parameters,setParameters}=useContext(DeleteModalContext)


  /**
   * Muestra el modal con los parametros pasados
   * @param {{show:boolean,id:number,deleteCallback:any}} newParams 
   */
   const openModal=(newParams)=>{
    setParameters({
      ...parameters,...newParams
    })
  }
  
  /**
   * Cierra el modal
   */
  const closeModal=()=>{
    setParameters({
      show:false,
      id:undefined,
      deleteCallback:undefined
    })
  }
  
  return {
    openModal,
    closeModal,
    parameters
  }
}
