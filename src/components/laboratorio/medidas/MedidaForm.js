import { Loader } from 'components/Loader';
import MyToast from 'components/MyToast';
import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MedidaService from 'services/MedidaService'

export const MedidaForm = () => {
  const { idMedida } = useParams();
  const isEdit = idMedida ? true : false;
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //States
  const initialForm = {
    name: "",
    abbreviation: ""
  }

  //Estado para el formulario
  const [form, setForm] = useState(initialForm);

  //Estado para la busqueda de pacientes
  const [showLoader, setShowLoader] = useState({});
  const [showAlert, setShowAlert] = useState(false)

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (form.name === "" || form.abbreviation === "") {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 2000)
        return
      }
      openLoader(isEdit ? "Actualizando datos..." : "Creando unidad de medida...")
      if (!isEdit) {
        await MedidaService.crearMedida(form);
        setForm(initialForm)
      } else {
        await MedidaService.actualizarMedida({ ...form, id: idMedida })
      }
      closeLoader()
      openToast(isEdit ? "Medida actualizada" : "Medida creada", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  };

  const getMedidaById = async (id) => {
    let medida = await MedidaService.getMedida(id);
    setForm({
      name: medida.name,
      abbreviation: medida.abbreviation,
      id: medida.id
    });
  }

  useEffect(() => {
    if (isEdit) {
      getMedidaById(idMedida);
    }
  }, []);

  return (
    <div className='pt-4'>
      <Loader parameters={showLoader} />
      <Container className='w-50 mx-auto'>
        <h3 className='my-3 text-center mb-4'>{isEdit ? "ACTUALIZAR UNIDAD DE MEDIDA" : "CREAR UNIDAD DE MEDIDA"}</h3>
        <Form onSubmit={handleSubmit}>
          <Alert show={showAlert} variant='danger'>Asegúrese de completar todos los campos</Alert>
          <Form.Group as={Row} className="mb-3" controlId="name">
            <Form.Label column sm={4} className='text-start'>
              Nombre:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='name'
                value={form.name}
                onChange={handleForm}
                maxLength={255}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="abbreviation">
            <Form.Label column sm={4} className='text-start'>
              Abreviatura:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='abbreviation'
                value={form.abbreviation}
                maxLength={30}
                onChange={handleForm} />
            </Col>
          </Form.Group>
          <Button variant='primary' type='submit' className='float-end'>{isEdit ? "Actualizar" : 'Guardar'}</Button>
        </Form>
        <MyToast />
      </Container>

    </div>
  )
};
