import logo from './logo.svg';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Enfermeria from './components/enfermeria/Enfermeria';
import { Laboratorio } from './components/laboratorio/Laboratorio';
import { Login } from './components/login/Login';
import { useState } from 'react';
import { Home } from './components/Home';
import { AppBar } from './components/AppBar';
import { Medicina } from './components/medicina/Medicina';
import { Cambios } from './components/caja/Cambios';
import { OdontologiaEnEspera } from './components/odontologia/OdontologiaEnEspera';
import { OdontologiaTodos } from './components/odontologia/OdontologiaTodos';
import { OdontologiaFicha } from './components/odontologia/OdontologiaFicha';
import { Usuarios } from './components/usuarios/Usuarios';
import { Roles } from './components/mantenimiento/roles/Roles';
import { ToastProvider } from './contexts/ToastContext';
import { MyToast } from './components/MyToast';
import { Modulos } from './components/mantenimiento/modulos/Modulos';
import { Permisos } from './components/mantenimiento/permisos/Permisos';
import { UserProvider } from './contexts/UserContext';

import { Caja } from 'components/caja/Caja';
import { VerificarAuthYPermisos } from 'components/VerificarAuthYPermisos';
import { CajaDashboard } from 'components/caja/CajaDashboard';
import NuevaCita from 'components/caja/NuevaCita';
import { MedicinaMenu } from 'components/medicina/MedicinaMenu';
import { MedicinaEnEspera } from 'components/medicina/MedicinaEnEspera';
import { MedicinaHistorial } from 'components/medicina/MedicinaHistorial';
import { DashboardLaboratorio } from 'components/laboratorio/DashboardLaboratorio';
import { PendienteUI } from 'components/laboratorio/PendienteUI';
import { OdontologiaProvider } from 'contexts/OdontologiaContext';
import { RolDashboard } from 'components/mantenimiento/roles/RolDashboard';
import { RolForm } from 'components/mantenimiento/roles/RolForm';
import { DashboardUsers } from 'components/usuarios/DashboardUsers';
import { UserForm } from 'components/usuarios/UserForm';
import { ExamenDashboard } from 'components/laboratorio/examenes/ExamenDashboard';
import { ExamenForm } from 'components/laboratorio/examenes/ExamenForm';
import { EstudiosDashboard } from 'components/laboratorio/estudios/EstudiosDashboard';
import { EstudioForm } from 'components/laboratorio/estudios/EstudioForm';
import { MedidaDashboard } from 'components/laboratorio/medidas/MedidaDashboard';
import { MedidaForm } from 'components/laboratorio/medidas/MedidaForm';
import { EstudiosExamenes } from 'components/laboratorio/estudios-examenes/EstudiosExamenes';
import { TituloDashboard } from 'components/laboratorio/titulos/TituloDashboard';
import { TituloForm } from 'components/laboratorio/titulos/TituloForm';


function App() {

  return (
    <div className="App">
      <Router>
        <ToastProvider>
          <UserProvider>

            <Routes>
              <Route path="/" element={<Home />}>

                <Route path="caja" element={<Caja />} >
                  <Route
                    index
                    element={
                      <VerificarAuthYPermisos>
                        <CajaDashboard />
                      </VerificarAuthYPermisos>
                    }
                  />

                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <NuevaCita />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="cambios"
                    element={
                      <VerificarAuthYPermisos>
                        <Cambios />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route
                  path="enfermeria"
                  element={
                    <VerificarAuthYPermisos>
                      <Enfermeria />
                    </VerificarAuthYPermisos>
                  } />

                <Route path="medicina" element={<Medicina />}>
                  <Route
                    index
                    element={
                      <VerificarAuthYPermisos>
                        <MedicinaMenu />
                      </VerificarAuthYPermisos>
                    } />
                  <Route
                    path="pacientes"
                    element={
                      <VerificarAuthYPermisos>
                        <MedicinaEnEspera />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="historial"
                    element={
                      <VerificarAuthYPermisos>
                        <MedicinaHistorial />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="odontologia" element={
                  <Outlet />
                }
                >
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <OdontologiaEnEspera />
                    </VerificarAuthYPermisos>
                  }
                  />

                  <Route
                    path="ficha/:idCita"
                    element={
                      <VerificarAuthYPermisos>
                        <OdontologiaProvider>
                          <OdontologiaFicha />
                        </OdontologiaProvider>
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="laboratorio" element={<Laboratorio />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <DashboardLaboratorio />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route path="pendientes/:citaId" element={<PendienteUI />}></Route>
                </Route>

                <Route path="unidades" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <MedidaDashboard />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <MedidaForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idMedida"
                    element={
                      <VerificarAuthYPermisos>
                        <MedidaForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="examenes" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <ExamenDashboard />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <ExamenForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idExamen"
                    element={
                      <VerificarAuthYPermisos>
                        <ExamenForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="titulos" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <TituloDashboard />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <TituloForm/>
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idTitulo"
                    element={
                      <VerificarAuthYPermisos>
                        <TituloForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="estudios" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <EstudiosDashboard />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <EstudioForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idEstudio"
                    element={
                      <VerificarAuthYPermisos>
                        <EstudioForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>
                <Route path="roles" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <RolDashboard />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <RolForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idRol"
                    element={
                      <VerificarAuthYPermisos>
                        <RolForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>

                <Route path="permisos" element={<VerificarAuthYPermisos>
                  <Permisos />
                </VerificarAuthYPermisos>} />

                <Route path="asignacion" element={<VerificarAuthYPermisos>
                  <EstudiosExamenes/>
                </VerificarAuthYPermisos>} />

                <Route path="usuarios" element={<Outlet />}>
                  <Route index element={
                    <VerificarAuthYPermisos>
                      <DashboardUsers />
                    </VerificarAuthYPermisos>
                  }
                  />
                  <Route
                    path="nuevo"
                    element={
                      <VerificarAuthYPermisos>
                        <UserForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                  <Route
                    path="editar/:idUsuario"
                    element={
                      <VerificarAuthYPermisos>
                        <UserForm />
                      </VerificarAuthYPermisos>
                    }
                  />
                </Route>
              </Route>
              <Route path="/login" exact element={<Login />}></Route>
              <Route path="*" element={<div>Not found</div>}></Route>

            </Routes>
          </UserProvider>

        </ToastProvider>

      </Router>
    </div>
  );
}

export default App;
