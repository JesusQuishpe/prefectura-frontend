import axios from 'axios';
import React, { useState, useEffect, useRef, useDebugValue, useContext } from 'react'
import { Alert, Button, Col, Container, Form, FormControl, InputGroup, Row, Spinner, Table, Toast } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { END_POINT } from '../../utils/conf';
import { Loader } from '../Loader';
import { TableResults } from './TableResults';

function Caja() {

    //Contexts
    const { user } = useContext(UserContext);
    console.log(user);
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

    const initialData = [];
    const initialExamenes = [];

    const [form, setForm] = useState(initialForm);
    const [data, setData] = useState(initialData);
    const [dataToEdit, setDataToEdit] = useState(null)
    const [isDisabledForm, setIsDisabledForm] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [isFinishSearch, setIsFinishSearch] = useState(true);
    const [isFinishSearchFull, setIsFinishSearchFull] = useState(true);
    const [hiddenAlert, setHiddenAlert] = useState(true);
    const [examenHidden, setExamenHidden] = useState(true);
    const [examenes, setExamenes] = useState(initialExamenes);
    //Use Effects
    useEffect(() => {
        if (dataToEdit) {
            setForm({
                ...form,
                ...dataToEdit
            });
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit])

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
        let newArray = [...examenes, e.target.id];
        if (examenes.includes(e.target.id)) {
            newArray = newArray.filter(examen => examen !== e.target.id);
        }
        setExamenes(newArray);
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
            //let response = await axios.post(END_POINT + 'caja', form);
            console.log({
                ...form,
                examenes
            });
            setForm(initialForm);
            setShowLoader(false);
            setIsDisabledForm(false);
        } catch (error) {
            alert("Ha ocurrido un error: " + error);
            setShowLoader(false);

        }
    };

    return (
        <>
            <Loader show={showLoader} />

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
                                        label={`Bioquimica sanguinea`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'coprologia'}
                                        label={`Coprologia EDA`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'coproparasitario'}
                                        label={`Coproparasitario`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'orina'}
                                        label={`Examen de orina`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'heces'}
                                        label={`Helicobacter heces`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'bioquimica'}
                                        label={`helycobacter`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'bioquimica'}
                                        label={`Hematologia`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'bioquimica'}
                                        label={`Hemoglobina`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'bioquimica'}
                                        label={`Prueba de embarazo`}
                                        onChange={handleChecked}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={'bioquimica'}
                                        label={`Prueba de tiroideas`}
                                        onChange={handleChecked}
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
                <TableResults result={data} setDataToEdit={setDataToEdit} setIsDisabledForm={setIsDisabledForm} />
            </Container>
        </>
    )
}

export default Caja
