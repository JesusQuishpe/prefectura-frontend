import { useDeleteModal } from 'hooks/useDeleteModal'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import WarningRedIcon from 'assets/png/warning_red.png'


export const DeleteModalConfirmation = () => {
  const {parameters,closeModal}=useDeleteModal()
  return (
    <Modal show={parameters.show} onHide={closeModal} dialogClassName='modal-25w' scrollable >
      <Modal.Body className='border-top border-5 border-danger'>
        <div className='d-flex align-items-center'>
          <div><img src={WarningRedIcon} width={"100px"} height={"100px"}></img></div>
          <div>
            <span className='fw-bold fs-5'>¿Está seguro de eliminar el registro?</span>
            <br />
            <span className='fst-italic' style={{ fontSize: "13px" }}>{parameters.message}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary"
          className='px-4'
          onClick={() => parameters.deleteCallback(parameters.id)}
        >
          Confirmar
        </Button>
        <Button variant="primary" className='px-4' onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
