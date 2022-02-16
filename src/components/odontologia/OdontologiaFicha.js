import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';
import { General } from './General';
import { IndicesCpoCeo } from './IndicesCpoCeo';
import { Diagnosticos } from './diagnosticos/Diagnosticos';
import { Tratamientos } from './tratamientos/Tratamientos';
import Odontograma from './odontograma/Odontograma';
import DentalLogo from 'assets/jpg/dental-logo.jpg'
import '../../css/Ficha.css';
import OdontologiaContext from 'contexts/OdontologiaContext';
import { Loader } from 'components/Loader';
import Indicadores from './indicadores/Indicadores';

export const OdontologiaFicha = () => {
  const {infoPaciente,infoEnfermeria,loading}=useContext(OdontologiaContext);
  
  return (
    <>
      <div className='d-flex flex-column h-100'>
        <div className='ficha-container'>
          <div className='sidebar'>
            <div id="content-sidebar">
              <div className='text-center'>
                <h4 >ODONTOLOGIA</h4>
                <img src={DentalLogo} alt="" width={"150px"} height={"150px"} />
              </div>
              <span className='fw-bold mb-3'>INFORMACIÓN DEL PACIENTE</span>
              <table>
                <tr>
                  <td>Nombre:</td>
                  <td id="nombres">{infoPaciente.nombres}</td>
                </tr>
                <tr>
                  <td>Apellidos:</td>
                  <td id="apellidos">{infoPaciente.apellidos}</td>
                </tr>
                <tr>
                  <td>Sexo:</td>
                  <td id="sexo">{infoPaciente.sexo}</td>
                </tr>
                <tr>
                  <td>Teléfono:</td>
                  <td id="telefono">{infoPaciente.telefono}</td>
                </tr>
              </table>
              <span className='fw-bold mb-3'>SIGNOS VITALES</span>
              <table id="signos">
                <tr>
                  <td>Presión:</td>
                  <td id="presion">{infoEnfermeria.presion}</td>
                </tr>
                <tr>
                  <td>Estatura:</td>
                  <td id="estatura">{infoEnfermeria.estatura}</td>
                </tr>
                <tr>
                  <td>Temperatura:</td>
                  <td id="temperatura">{infoEnfermeria.temperatura}</td>
                </tr>
                <tr>
                  <td>Peso:</td>
                  <td id="peso">{infoEnfermeria.peso}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className='ficha-content'>
            <div className='d-flex justify-content-end w-100'>
              <Button variant='warning'>Confirmar cita</Button>
            </div>
            <div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="general">
                <Row>
                  <Col>
                    <Nav variant="tabs" className="d-flex">
                      <Nav.Item>
                        <Nav.Link eventKey="general">General</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="indicadores">Indicadores</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="indices">Indices</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="diagnosticos">Diagnósticos</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="tratamientos">Tratamientos</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="odontograma">Odontograma</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Tab.Content className='border-start border-end border-bottom h-100 p-4'>
                      <Tab.Pane eventKey="general">
                        <General/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="indicadores">
                        <Indicadores />
                      </Tab.Pane>
                      <Tab.Pane eventKey="indices">
                        <IndicesCpoCeo />
                      </Tab.Pane>
                      <Tab.Pane eventKey="diagnosticos">
                        <Diagnosticos/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="tratamientos">
                        <Tratamientos />
                      </Tab.Pane>
                      <Tab.Pane eventKey="odontograma">
                        <Odontograma/>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
      <Loader show={loading} message={"Generando ficha...."}/>
    </>
  );
};
