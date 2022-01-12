import React, { useContext } from 'react'
import { Button, Card, Col, Form, InputGroup, Spinner,Row, FormControl } from 'react-bootstrap'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { FaFilePdf } from 'react-icons/fa'
import LaboratorioContext from '../../contexts/LaboratorioContext'
import { MyCustomPagination } from '../MyCustomPagination'
import { HistorialTable } from './HistorialTable'

export const HistorialComponent = () => {
    const {dataExamen,getExamenComponent,setDataExamen,setDataModal} = useContext(LaboratorioContext)
    console.log("Historial");
    return (
        <Card className='w-100'>
            <Card.Header>Historial médico</Card.Header>
            <Card.Body>
                <Form.Group as={Row} className="mb-3" controlId="examen">
                    <Form.Label column sm={4} className='text-start'>
                        Examen:
                    </Form.Label>
                    <Col>
                        <Form.Select sm={8} aria-label="Select para examen" name='examen' onChange={(e) => getExamenComponent(e.target.value)}>
                            <option value='bioquimica'>Bioquimica Sanguinea</option>
                            <option value={'coprologia'}>Coprologia para EDA</option>
                            <option value={'coproparasitario'}>Coproparasitario</option>
                            <option value={'examen_orina'}>Examen de orina</option>
                            <option value={'helicobacter_heces'}>HelicoBacter Pylori IgG Heces</option>
                            <option value={'helicobacter_pylori'}>HelicoBacter Pylori IgG</option>
                            <option value={'hematologia'}>Hematología</option>
                            <option value={'hemoglobina_glicosilada'}>Hemoglobina glicosilada</option>
                            <option value={'embarazo'}>Prueba de embarazo</option>
                            <option value={'tiroideas'}>Pruebas tiroideas</option>

                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form className='w-50 ms-auto'>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Ingresa el número de cédula"
                            aria-label="Input para el número de cedula del paciente"
                            className='me-2'
                            type='text'

                        />
                        <Button variant="secondary" type='submit' >
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"

                            />
                        </Button>

                    </InputGroup>
                </Form>
                <HistorialTable/>
                <div className='d-flex justify-content-end mt-2'>
                    {
                        dataExamen && <MyCustomPagination data={dataExamen} setData={setDataExamen} />
                    }
                </div>
            </Card.Body>
        </Card>
    )
}
