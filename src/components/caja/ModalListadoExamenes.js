import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import ExamenService from 'services/ExamenService';

export const ModalListadoExamenes = ({ show, closeModal }) => {

  const [examenes, setExamenes] = useState([]);

  const cargarListadoDeExamenes = async () => {
    let examenes = await ExamenService.getListaDeExamenes();
    console.log(examenes);
    setExamenes(examenes)
  }

  useEffect(() => {
    cargarListadoDeExamenes()
  }, [])

  return (
    <Modal show={show} onHide={closeModal} dialogClassName='modal-25w' size='lg'>
      <Modal.Header closeButton>
        <Modal.Title id="exampleModalLabel">Listado de examenes de laboratorio</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Row>
          {
            examenes.map((examen, index) => {
              return (
                <>
                  <Col>
                    <ul>
                      <li>
                        <div>{examen.nombre}</div>
                        <ul>
                          {
                            examen.estudios.map((estudio) => {
                              if (estudio.children && estudio.children.length > 0) {
                                return (
                                  <li key={estudio.id}>
                                    <div>{estudio.nombre}</div>
                                    <ul>
                                      {
                                        estudio.children.map((child) => {
                                          return (
                                            <li key={child.id}>
                                              <Form.Check
                                                type="checkbox"
                                                label={child.nombre}
                                                id={child.id}
                                              />
                                            </li>
                                          )
                                        })
                                      }
                                    </ul>
                                  </li>
                                )
                              }
                              return (
                                <li key={estudio.id}>
                                  <Form.Check
                                    type="checkbox"
                                    label={estudio.nombre}
                                    id={estudio.id}
                                  />
                                </li>
                              )
                            })
                          }
                        </ul>
                      </li>
                    </ul>
                  </Col>
                  {
                    (index > 0 && index % 2 !== 0) && <div className='w-100' />
                  }
                </>
              )
            })
          }
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" form='form-coprologia' type='submit'>
          Guardar
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
