import React, { useContext, useEffect, useState } from 'react';
import GrupoService from 'services/GrupoService';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ToastContext from '../../../contexts/ToastContext';
import Select from 'react-select'
import AreaService from 'services/AreaService';
import LoaderContext from 'contexts/LoaderContext';

const optionsFun = (data) => {
  let opts = []
  opts = data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    }
  })
  return opts
}

export const GrupoForm = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //Other hooks
  const { idGrupo } = useParams()
  //States
  const [options, setOptions] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const initialForm = {
    code: "",
    name: "",
    price: "",
    area: null,
    showAtPrint: false
  }
  const [form, setForm] = useState(initialForm);

  const isEdit = idGrupo ? true : false

  /**
   * Handler para actualizar los valores del formulario, solo inputs.
   * @param {Event} e 
   */
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value.toUpperCase()
    });
  }

  /**
   * Handler para el check del formulario
   * @param {Event} e 
   */
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }

  /**
   * Handler para el select del formulario
   * @param {object} selected 
   */
  const handleSelectedArea = (selected) => {
    setForm({ ...form, area: selected })
  }

  /**
   * Handler para guardar los datos del grupo en la BD
   * @param {Event} e 
   * @returns 
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (form.code === "" || form.name === "" || form.price === "" || form.area === null) {
        setShowAlert(true)
        return
      }
      openLoader(isEdit ? "Actualizando datos..." : "Creando grupo...")
      if (!isEdit) {
        await GrupoService.crearGrupo(form)
        setForm(initialForm)
      } else {
        await GrupoService.actualizarGrupo({ ...form, id: idGrupo })
      }
      closeLoader()
      openToast(isEdit ? "Grupo actualizado" : "Grupo creado", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  };

  /**
   * Carga los datos del grupo dado el idenficador
   * @param {number} id identificador del grupo
   */
  const getGrupoById = async (id) => {
    let grupo = await GrupoService.getGrupo(id);
    console.log(grupo);
    setForm({
      code: grupo.code,
      name: grupo.name,
      area: {
        value: grupo.area.id,
        label: grupo.area.name
      },
      price: grupo.price,
      showAtPrint: grupo.showAtPrint
    });

  }

  /**
   * Carga las areas para el select del formulario
   */
  const getAreas = async () => {
    let areasFromService = await AreaService.getAreas()
    console.log(areasFromService);
    setOptions(optionsFun(areasFromService))
  }

  useEffect(() => {
    getAreas()
    if (isEdit) {
      getGrupoById(idGrupo);
    }
  }, []);

  useEffect(() => {
    let timer = null
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [showAlert])

  return (
    <div className='pt-4'>
      <Container className='w-50 mx-auto'>
        <h3 className='my-3 text-center mb-4'>{isEdit ? "ACTUALIZAR GRUPO" : "NUEVO GRUPO"}</h3>
        <Form onSubmit={handleSubmit}>
          <Alert show={showAlert} variant='danger'>Asegúrese de completar todos los campos</Alert>
          <Form.Group as={Row} className="mb-3" controlId="code">
            <Form.Label column sm={4} className='text-start'>
              Código:
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="text"
                name='code'
                value={form.code}
                maxLength={20}
                onChange={handleForm} />

              <Form.Text className="text-muted" >
                Max. 20 caracteres
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="name" >
            <Form.Label column sm={4} className='text-start'>
              Nombre:
            </Form.Label>
            <Col sm={8} >
              <Form.Control
                type="text"
                name='name'
                value={form.name}
                maxLength={100}
                onChange={handleForm} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={4}>
              Area:
            </Form.Label>
            <Col sm={8}>
              <Select
                options={options}
                placeholder="Seleccione un area"
                value={form.area}
                onChange={handleSelectedArea}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 2,
                  }),
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-4 align-items-center'>
            <Form.Label column sm={4}>
              Mostrar al imprimir:
            </Form.Label>
            <Col sm={8}>
              <Form.Check
                id='showAtPrint'
                name='showAtPrint'
                checked={form.showAtPrint}
                onChange={handleCheck}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm={4} className='text-start'>
              Precio:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                name='price'
                value={form.price}
                onChange={handleForm}
                step={0.5}
              />
            </Col>
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='float-end'>{isEdit ? "Actualizar" : 'Guardar'}</Button>
        </Form>
      </Container>
    </div >
  )
}
