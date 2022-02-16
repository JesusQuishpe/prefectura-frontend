import axios from 'axios';
import React, { useState, useEffect, useRef, useDebugValue, useContext } from 'react'
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row, Spinner, Table, Toast } from 'react-bootstrap'
import { END_POINT } from 'utils/conf';
import { Loader } from '../Loader';
import DataTable from 'react-data-table-component';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from 'hooks/useUser'
import { SinPermisoPage } from 'components/SinPermisoPage';
import { ModalListadoExamenes } from './ModalListadoExamenes';

function NuevaCita() {
  const navigate = useNavigate();
  //Config datatable
  const paginationConfig = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos"
  }
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Cedula",
      selector: (row) => row.cedula,
      sortable: true
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true
    },
    {
      name: "Fecha de nacimiento",
      selector: (row) => row.fecha_nacimiento,
      sortable: true
    },
    {
      name: "Sexo",
      selector: (row) => row.sexo,
      sortable: true
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true
    },
    {
      name: "Ciudad",
      selector: (row) => row.ciudad,
      sortable: true
    },
    {
      name: "Acciones",
      cell: (row) => <Button variant='secondary' onClick={() => handleOnClik(row)}>Llenar</Button>,
      sortable: true,
    },
  ]

  //References
  const inputCedula = useRef();
  const query = useRef();
  //States
  const initialForm = {
    cedula: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    sexo: "Masculino",
    telefono: "",
    domicilio: "",
    provincia: "El Oro",
    ciudad: "Machala",
    area: "Medicina",
    valor: 0
  }
  const initialChecks = {
    bioquimica: false,
    coprologia: false,
    coproparasitario: false,
    examen_orina: false,
    helicobacter_heces: false,
    helicobacter_pylori: false,
    hematologia: false,
    hemoglobina_glicosilada: false,
    embarazo: false,
    tiroideas: false
  };

  const initialData = [];
  const initialExamenes = [];

  //Estado para el formulario
  const [form, setForm] = useState(initialForm);
  const [checks, setChecks] = useState(initialChecks);
  //Estado para la busqueda de pacientes
  const [data, setData] = useState(initialData);
  const [isDisabledForm, setIsDisabledForm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isFinishSearch, setIsFinishSearch] = useState(true);
  const [isFinishSearchFull, setIsFinishSearchFull] = useState(true);
  const [hiddenAlert, setHiddenAlert] = useState(true);
  const [examenHidden, setExamenHidden] = useState(true);
  const [examenes, setExamenes] = useState(initialExamenes);

  //Handlers

  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "area") {
      if (value === "Laboratorio") {
        setExamenHidden(false);
      } else {
        setExamenHidden(true);
      }
    }
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleChecked = (e) => {
    let newArray = [...examenes];
    let index = examenes.findIndex(exa => exa.id_tipo === e.target.value);
    if (index >= 0) {
      newArray.splice(index, 1);
    } else {
      newArray.push({ id_tipo: e.target.value, tablename: e.target.id });
    }
    setExamenes(newArray);
    setChecks({
      ...checks,
      [e.target.id]: e.target.checked
    });

  }

  const handleSubmit = (e) => {
    save();
  };

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setIsFinishSearch(false);
      let json = await axios.get(END_POINT + `pacientes?cedula=` + inputCedula.current.value);
      setForm({ ...form, ...json.data });
      setIsFinishSearch(true);
      setIsDisabledForm(true);
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 404) {
        setIsFinishSearch(true);
        setHiddenAlert(false);
      } else {
        setIsFinishSearch(true);
        setHiddenAlert(false);
      }
      setTimeout(() => {
        setHiddenAlert(true);
      }, 2000);
    }
  };

  const handleSearchFull = async (e) => {
    try {
      e.preventDefault();
      setIsFinishSearchFull(false);
      let response = await axios.get(END_POINT + `pacientes?query=` + query.current.value)
      setData(response.data);
      setIsFinishSearchFull(true);
    } catch (error) {
      alert("No hay resultados de la busqueda!!");
      setIsFinishSearchFull(true);
    }
  };

  const save = async () => {
    try {
      setShowLoader(true);
      console.log({
        ...form,
        examenes
      });

      await axios.post(END_POINT + 'caja', { ...form, examenes });

      setForm(initialForm);
      setExamenes(initialExamenes);
      setChecks(initialChecks);
      setIsDisabledForm(false);
      setShowLoader(false);
    } catch (error) {
      alert("Ha ocurrido un error: " + error);
      setShowLoader(false);
    }
  };

  const handleOnClik = (row) => {
    console.log(row);
    setForm({ ...form, ...row });
    setIsDisabledForm(true);
  }

  return (
    <>
      {
        <div>
          <Loader show={showLoader} message="Cargando..."/>

          <Container className='w-50 mx-auto'>
            <h1 className='w-50 mx-auto my-3 text-center'>CENTRO MÉDICO</h1>
            <Form onSubmit={handleSearch}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Ingresa el número de cédula"
                  aria-label="Input para el número de cedula del paciente"
                  className='me-2'
                  type='text'
                  ref={inputCedula}
                />
                <Button variant="secondary" type='submit' disabled={!isFinishSearch}>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className={`me-1 ${isFinishSearch && "visually-hidden"}`}

                  />
                  {isFinishSearch ? ">>" : "Buscando..."}
                </Button>

              </InputGroup>
            </Form>
            <Alert variant='danger' hidden={hiddenAlert}>No existe el paciente</Alert>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="fecha">
                <Form.Label column sm={4} className='text-start'>
                  Fecha:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='fecha' defaultValue={new Date(Date.now()).toLocaleDateString()} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="cedula">
                <Form.Label column sm={4} className='text-start'>
                  Cedula:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='cedula' value={form.cedula} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nombres">
                <Form.Label column sm={4} className='text-start'>
                  Nombres:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='nombres' value={form.nombres} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="apellidos">
                <Form.Label column sm={4} className='text-start'>
                  Apellidos:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='apellidos' value={form.apellidos} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="fecha_nacimiento">
                <Form.Label column sm={4} className='text-start'>
                  Nacimiento (DD-MM-YYYY):
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="date" name='fecha_nacimiento' value={form.fecha_nacimiento} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="sexo">
                <Form.Label column sm={4} className='text-start'>
                  Sexo:
                </Form.Label>
                <Col>
                  <Form.Select sm={8} aria-label="Select para género" name='sexo' value={form.sexo} onChange={handleForm} disabled={isDisabledForm}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="telefono">
                <Form.Label column sm={4} className='text-start'>
                  Teléfono:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='telefono' value={form.telefono} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="domicilio">
                <Form.Label column sm={4} className='text-start'>
                  Domicilio:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="text" name='domicilio' value={form.domicilio} onChange={handleForm} disabled={isDisabledForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="provincia">
                <Form.Label column sm={4} className='text-start'>
                  Provincia:
                </Form.Label>
                <Col>
                  <Form.Select sm={8} aria-label="Select para provincias" name='provincia' value={form.provincia} onChange={handleForm} disabled={isDisabledForm}>
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
              <Form.Group as={Row} className="mb-3" controlId="ciudad">
                <Form.Label column sm={4} className='text-start'>
                  Ciudad:
                </Form.Label>
                <Col>
                  <Form.Select sm={8} aria-label="Select para ciudad" name='ciudad' value={form.ciudad} onChange={handleForm} disabled={isDisabledForm}>
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
              <Form.Group as={Row} className="mb-3" controlId="area">
                <Form.Label column sm={4} className='text-start'>
                  Area a atenderse:
                </Form.Label>
                <Col>
                  <Form.Select sm={8} aria-label="Select para area" name='area' value={form.area} onChange={handleForm} >
                    <option value="Medicina">Medicina</option>
                    <option value="Pediatria">Pediatria</option>
                    <option value="Ginecologia">Ginecologia</option>
                    <option value="Reumatologia">Reumatologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                    <option value="Terapia Energetica">Terapia Energetica</option>
                    <option value="Terapia Fisica">Terapia Fisica</option>
                    <option value="Terapia Respiratoria">Terapia Respiratoria</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Alergologia">Alergologia</option>
                    <option value="Laboratorio">Laboratorio</option>
                    <option value="Odontologia">Odontologia</option>
                    <option value="Psicologia">Psicologia</option>
                    <option value="Inyeccion">Inyeccion</option>
                    <option value="Curacion">Curacion</option>
                    <option value="Presion Arterial">Presion Arterial</option>
                    <option value="Ecografia">Ecografia</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" hidden={examenHidden}>
                <Form.Label column sm={4} className='text-start'>
                  Tipos de examen:
                </Form.Label>
                <Col sm={8}>
                  <Row>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'bioquimica'}
                        value={1}
                        label={`Bioquimica sanguinea`}
                        onChange={handleChecked}
                        checked={checks.bioquimica}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'coprologia'}
                        value={2}
                        label={`Coprologia EDA`}
                        onChange={handleChecked}
                        checked={checks.coprologia}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'coproparasitario'}
                        value={3}
                        label={`Coproparasitario`}
                        onChange={handleChecked}
                        checked={checks.coproparasitario}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'examen_orina'}
                        value={4}
                        label={`Examen de orina`}
                        onChange={handleChecked}
                        checked={checks.examen_orina}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'helicobacter_heces'}
                        value={5}
                        label={`Helicobacter heces`}
                        onChange={handleChecked}
                        checked={checks.helicobacter_heces}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'helicobacter_pylori'}
                        value={6}
                        label={`Helycobacter`}
                        onChange={handleChecked}
                        checked={checks.helicobacter_pylori}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'hematologia'}
                        value={7}
                        label={`Hematologia`}
                        onChange={handleChecked}
                        checked={checks.hematologia}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'hemoglobina_glicosilada'}
                        value={8}
                        label={`Hemoglobina`}
                        onChange={handleChecked}
                        checked={checks.hemoglobina_glicosilada}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'embarazo'}
                        value={9}
                        label={`Prueba de embarazo`}
                        onChange={handleChecked}
                        checked={checks.embarazo}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type={'checkbox'}
                        id={'tiroideas'}
                        value={10}
                        label={`Prueba de tiroideas`}
                        onChange={handleChecked}
                        checked={checks.tiroideas}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="valor">
                <Form.Label column sm={4} className='text-start'>
                  Valor:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="number" step={0.5} min={0.00} placeholder="$2,00" name='valor' value={form.valor} onChange={handleForm} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3 justify-content-center" controlId="acciones">
                <Button variant='light' as={Col} sm={2} disabled>Actualizar</Button>
                <Button variant='light' className='mx-2' as={Col} sm={2} disabled>Eliminar</Button>
                <Button variant='primary' as={Col} sm={2} onClick={handleSubmit}>Agregar</Button>
              </Form.Group>
            </Form>
            <Form onSubmit={handleSearchFull}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Ingresa el número de cédula o apellidos"
                  aria-label="Input para buscar por cedula o apellidos"
                  className='me-2'
                  type='text'
                  ref={query}
                />
                <Button variant="secondary" type='submit' disabled={!isFinishSearchFull}>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className={`me-1 ${isFinishSearchFull && "visually-hidden"}`}

                  />
                  {isFinishSearchFull ? ">>" : "Buscando..."}
                </Button>
              </InputGroup>
            </Form>
          </Container>
          <Container className='w-75 mx-auto'>
            {/*<TableResults result={data} setDataToEdit={setDataToEdit} setIsDisabledForm={setIsDisabledForm} />*/}
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationComponentOptions={paginationConfig}
            />
          </Container>
          {/*<ModalListadoExamenes show={true} closeModal={()=>console.log("ASDAS")}/>*/}
        </div>
      }
    </>
  )
}

export default NuevaCita
