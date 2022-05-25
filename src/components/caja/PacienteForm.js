import LoaderContext from 'contexts/LoaderContext';
import ToastContext from 'contexts/ToastContext';
import React, { useState, useContext, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import PatientService from 'services/PatientService';


export const PacienteForm = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //Other hooks
  const { idPatient } = useParams();
  //States
  const initialForm = {
    identification_number: "",
    name: "",
    lastname: "",
    birth_date: "",
    gender: "",
    cellphone_number: "",
    address: "",
    province: "",
    city: "",
  }
  const [form, setForm] = useState(initialForm);
  
  const isEdit = idPatient ? true : false;

  /**
   * Handler para el formulario
   * @param {Event} e 
   */
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  /**
   * Handler para guardar el paciente
   * @param {Event} e 
   * @returns 
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!form.identification_number || !form.name || !form.lastname || !form.gender) {
        return alert("Debe completar los campos obligatorios")
      }
      if (!isEdit) {
        openLoader("Creando paciente...")
        await PatientService.createPatient(form)
        setForm(initialForm)
      } else {
        openLoader("Actualizando paciente")
        await PatientService.updatePatient(form)
      }
      closeLoader()
      openToast(isEdit ? "Paciente actualizado" : "Paciente creado", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      openToast("Ha ocurrido un error, no se pudo crear el paciente", false)
    }
  };

  /**
   * Carga el paciente por id
   * @param {number} id 
   */
  const loadPatientById = async (id) => {
    let patient = await PatientService.getPatient(id);
    setForm({ ...patient });
  }

  useEffect(() => {
    if (isEdit) {
      loadPatientById(idPatient);
    }
  }, []);

  return (
    <div className='pt-4'>
      <Container className='w-50 mx-auto'>
        <h3 className='my-3 text-center mb-4'>{isEdit ? "ACTUALIZAR PACIENTE" : "NUEVO PACIENTE"}</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="identification_number">
            <Form.Label column sm={4} className='text-start'>
              Cédula <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='identification_number'
                value={form.identification_number}
                onChange={handleForm}
                maxLength={10} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="name">
            <Form.Label column sm={4} className='text-start'>
              Nombres <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='name'
                value={form.name}
                onChange={handleForm}
                maxLength={50} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="lastname">
            <Form.Label column sm={4} className='text-start'>
              Apellidos <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='lastname'
                value={form.lastname}
                onChange={handleForm}
                maxLength={50} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="birth_date">
            <Form.Label column sm={4} className='text-start'>
              Nacimiento (DD-MM-YYYY):
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="date" name='birth_date' value={form.birth_date} onChange={handleForm} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="gender">
            <Form.Label column sm={4} className='text-start'>
              Sexo <span className='text-danger'>*</span> :
            </Form.Label>
            <Col>
              <Form.Select sm={8} aria-label="Select para género" name='gender' value={form.gender} onChange={handleForm}>
                <option value={""}>--Seleccione un género--</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="cellphone_number">
            <Form.Label column sm={4} className='text-start'>
              Teléfono:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='cellphone_number'
                value={form.cellphone_number}
                onChange={handleForm}
                maxLength={20} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="address">
            <Form.Label column sm={4} className='text-start'>
              Domicilio:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                name='address'
                value={form.address}
                onChange={handleForm}
                maxLength={150} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="province">
            <Form.Label column sm={4} className='text-start'>
              Provincia:
            </Form.Label>
            <Col>
              <Form.Select sm={8} aria-label="Select para provincias" name='province' value={form.province} onChange={handleForm}>
                <option value={""}>--Seleccione una provincia--</option>
                <option>El Oro</option>
                <option>Azuay</option>
                <option>Bolívar</option>
                <option>Cañar</option>
                <option>Carchi</option>
                <option>Chimborazo</option>
                <option>Cotopaxi</option>
                <option>Esmeraldas</option>
                <option>Galápagos</option>
                <option>Guayas</option>
                <option>Imbabura</option>
                <option>Loja</option>
                <option>Los Rios</option>
                <option>Manabi</option>
                <option>Morona Santiago</option>
                <option>Napo</option>
                <option>Orellana</option>
                <option>Pastaza</option>
                <option>Pichincha</option>
                <option>Santa Elena</option>
                <option>Santo Domingo</option>
                <option>Sucumbíos</option>
                <option>Tungurahua</option>
                <option>Zamora</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="city">
            <Form.Label column sm={4} className='text-start'>
              Ciudad:
            </Form.Label>
            <Col>
              <Form.Select sm={8} aria-label="Select para ciudad" name='city' value={form.city} onChange={handleForm}>
                <option value={""}>--Seleccione una ciudad--</option>
                <option >Machala</option>
                <option>Arenillas</option>
                <option>Atahualpa</option>
                <option>Balsas</option>
                <option>Chilla</option>
                <option>El Guabo</option>
                <option>Guayaquil</option>
                <option>Huaquillas</option>
                <option>Las Lajas</option>
                <option>Marcabeli</option>
                <option>Pasaje</option>
                <option>Piñas</option>
                <option>Portovelo</option>
                <option>Santa Rosa</option>
                <option>Zaruma</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='float-end'>
            {isEdit ? "Actualizar" : 'Guardar'}
          </Button>
        </Form>
      </Container>

    </div>
  )
}
