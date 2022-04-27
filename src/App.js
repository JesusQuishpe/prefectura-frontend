import logo from './logo.svg';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import Enfermeria from './components/enfermeria/Enfermeria';
import { Login } from './components/login/Login';
import { Home } from './components/Home';
import { Medicina } from './components/medicina/Medicina';
import { Cambios } from './components/caja/Cambios';
import { OdontologiaEnEspera } from './components/odontologia/OdontologiaEnEspera';
import { OdontologiaFicha } from './components/odontologia/OdontologiaFicha';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';
import { VerificarAuthYPermisos } from 'components/VerificarAuthYPermisos';
import { CajaDashboard } from 'components/caja/CajaDashboard';
import NuevaCita from 'components/caja/NuevaCita';
import { MedicinaEnEspera } from 'components/medicina/MedicinaEnEspera';
import { OdontologyProvider } from 'contexts/OdontologyContext';
import { RolDashboard } from 'components/mantenimiento/roles/RolDashboard';
import { RolForm } from 'components/mantenimiento/roles/RolForm';
import { DashboardUsers } from 'components/usuarios/DashboardUsers';
import { UserForm } from 'components/usuarios/UserForm';
import { MedidaDashboard } from 'components/laboratorio/medidas/MedidaDashboard';
import { MedidaForm } from 'components/laboratorio/medidas/MedidaForm';
import { PacienteForm } from 'components/caja/PacienteForm';
import { PacienteDashboard } from 'components/caja/PacienteDashboard';
import { CapturaResultados } from 'components/laboratorio/captura-resultados/CapturaResultados';
import { AreasDashboard } from 'components/laboratorio/areas/AreasDashboard';
import { AreaForm } from 'components/laboratorio/areas/AreaForm';
import { GruposDashboard } from 'components/laboratorio/grupos/GruposDashboard';
import { GrupoForm } from 'components/laboratorio/grupos/GrupoForm';
import { PruebasDashboard } from 'components/laboratorio/pruebas/PruebasDashboard';
import { PruebaForm } from 'components/laboratorio/pruebas/PruebaForm';
import { ConsultarResultados } from 'components/laboratorio/captura-resultados/ConsultarResultados';
import { ResultadoForm } from 'components/laboratorio/captura-resultados/ResultadoForm';
import { Permissions } from './components/mantenimiento/permissions/Permissions';
import { ConsultarHistorial } from 'components/odontologia/ConsultarHistorial';
import { MedicinaDashboard } from 'components/medicina/MedicinaDashboard';
import { MedicinaForm } from 'components/medicina/MedicinaForm';
import { DeleteModalProvider } from 'contexts/DeleteModalContext';
import { LoaderProvider } from 'contexts/LoaderContext';
import { NotFound } from 'components/NotFound';


function App() {

  return (
    <div className="App">
      <Router >{/*El basename basename='/tesis-sistema/tesis-backend/public/ se agrega solo para ejecutar el comando npm run build */}
        <ToastProvider>
          <LoaderProvider>
            <UserProvider>
              <DeleteModalProvider>
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route path="citas" element={<Outlet/>} >
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
                    <Route path="pacientes" element={<Outlet />}>
                      <Route index element={
                        <VerificarAuthYPermisos>
                          <PacienteDashboard />
                        </VerificarAuthYPermisos>
                      }
                      />
                      <Route
                        path="nuevo"
                        element={
                          <VerificarAuthYPermisos>
                            <PacienteForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                      <Route
                        path="editar/:idPatient"
                        element={
                          <VerificarAuthYPermisos>
                            <PacienteForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>

                    <Route
                      path="nuevo-paciente"
                      element={
                        <PacienteForm />
                      }
                    />

                    <Route
                      path="enfermeria"
                      element={
                        <VerificarAuthYPermisos>
                          <Enfermeria />
                        </VerificarAuthYPermisos>
                      } />

                    <Route path="medicina" element={<Medicina />}>
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
                            <MedicinaDashboard />
                          </VerificarAuthYPermisos>
                        }
                      />

                      <Route
                        path="historial/:medicineId/editar"
                        element={
                          <VerificarAuthYPermisos>
                            <div className='p-4'>
                              <MedicinaForm />
                            </div>
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>

                    <Route path="odontologia" element={
                      <Outlet />
                    }
                    >
                      <Route path='pacientes' element={
                        <VerificarAuthYPermisos>
                          <OdontologiaEnEspera />
                        </VerificarAuthYPermisos>
                      }
                      />

                      <Route
                        path="fichas"
                        element={
                          <VerificarAuthYPermisos>
                            <ConsultarHistorial />
                          </VerificarAuthYPermisos>
                        }
                      />

                      <Route
                        path="cita/:appoId/nuevo"
                        element={
                          <VerificarAuthYPermisos>
                            <OdontologyProvider>
                              <OdontologiaFicha />
                            </OdontologyProvider>
                          </VerificarAuthYPermisos>
                        }
                      />

                      <Route
                        path="cita/:appoId/enfermeria/:nurId/ficha/:recId"
                        element={
                          <VerificarAuthYPermisos>
                            <OdontologyProvider>
                              <OdontologiaFicha />
                            </OdontologyProvider>
                          </VerificarAuthYPermisos>
                        }
                      />

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

                    <Route path="areas" element={<Outlet />}>
                      <Route index element={
                        <VerificarAuthYPermisos>
                          <AreasDashboard />
                        </VerificarAuthYPermisos>
                      }
                      />
                      <Route
                        path="nuevo"
                        element={
                          <VerificarAuthYPermisos>
                            <AreaForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                      <Route
                        path="editar/:idArea"
                        element={
                          <VerificarAuthYPermisos>
                            <AreaForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>

                    <Route path="grupos" element={<Outlet />}>
                      <Route index element={
                        <VerificarAuthYPermisos>
                          <GruposDashboard />
                        </VerificarAuthYPermisos>
                      }
                      />
                      <Route
                        path="nuevo"
                        element={
                          <VerificarAuthYPermisos>
                            <GrupoForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                      <Route
                        path="editar/:idGrupo"
                        element={
                          <VerificarAuthYPermisos>
                            <GrupoForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>

                    <Route path="pruebas" element={<Outlet />}>
                      <Route index element={
                        <VerificarAuthYPermisos>
                          <PruebasDashboard />
                        </VerificarAuthYPermisos>
                      }
                      />
                      <Route
                        path="nuevo"
                        element={
                          <VerificarAuthYPermisos>
                            <PruebaForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                      <Route
                        path="editar/:idPrueba"
                        element={
                          <VerificarAuthYPermisos>
                            <PruebaForm />
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
                      <Permissions />
                    </VerificarAuthYPermisos>} />


                    <Route path="captura" element={<VerificarAuthYPermisos>
                      <CapturaResultados />
                    </VerificarAuthYPermisos>} />

                    <Route path="resultados" element={<Outlet />}>
                      <Route index element={
                        <VerificarAuthYPermisos>
                          <ConsultarResultados />
                        </VerificarAuthYPermisos>
                      }
                      />
                      <Route
                        path=":idResultado"
                        element={
                          <VerificarAuthYPermisos>
                            <ResultadoForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>

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
                        path="editar/:idUser"
                        element={
                          <VerificarAuthYPermisos>
                            <UserForm />
                          </VerificarAuthYPermisos>
                        }
                      />
                    </Route>
                  </Route>

                  <Route path="/login" exact element={<Login />}></Route>
                  <Route path="*" element={<NotFound/>}></Route>

                </Routes>
              </DeleteModalProvider>
            </UserProvider>
          </LoaderProvider>
        </ToastProvider>
      </Router>
    </div>
  );
}

export default App;
