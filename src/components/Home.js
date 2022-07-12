import React, { useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { AppBar } from './AppBar'
import '../css/Home.css'
import { useUser } from '../hooks/useUser'
import MyToast from './MyToast'
import { DeleteModalConfirmation } from './DeleteModalConfirmation'
import { Loader } from './Loader'


import { LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, Space } from 'antd';
import ModuleService from 'services/ModuleService'
//import { OdontologiaEnEspera } from './components/odontologia/OdontologiaEnEspera';
//import { OdontologiaFicha } from './components/odontologia/OdontologiaFicha';
//import { ToastProvider } from './contexts/ToastContext';
//import { UserProvider } from './contexts/UserContext';
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
//import { Permissions } from './components/mantenimiento/permissions/Permissions';
import { ConsultarHistorial } from 'components/odontologia/ConsultarHistorial';
import { MedicinaDashboard } from 'components/medicina/MedicinaDashboard';
import { MedicinaForm } from 'components/medicina/MedicinaForm';
import { DeleteModalProvider } from 'contexts/DeleteModalContext';
import { LoaderProvider } from 'contexts/LoaderContext';
import { NotFound } from 'components/NotFound';
import { EnfermeriaHistorial } from 'components/enfermeria/EnfermeriaHistorial';
import Enfermeria from './enfermeria/Enfermeria'
import { Cambios } from './caja/Cambios'
import { OdontologiaEnEspera } from './odontologia/OdontologiaEnEspera'
import { OdontologiaFicha } from './odontologia/OdontologiaFicha'
import { Permissions } from './mantenimiento/permissions/Permissions'
import LogoSoftware from 'assets/png/logo-software.png'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ScheduleOutlined,
  DesktopOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  ReconciliationOutlined,
  ToolOutlined
} from '@ant-design/icons';

import 'css/Home.css'
import { VerExpediente } from './medicina/VerExpediente'
import { EmpresaForm } from './mantenimiento/empresa/EmpresaForm'
import { BuscarExpediente } from './medicina/BuscarExpediente'
import { NuevaConsulta } from './medicina/nueva-consulta/NuevaConsulta'

const { Header, Content, Sider } = Layout;

const items1 = ['Salir'].map((key, index) => ({
  key: index,
  label: key,
  icon: <LogoutOutlined />,

}));

const modulesMapped = (modules, permissions) => {
  if (!modules) return []
  return modules.map(mod => {
    const submodules = permissions.filter(per => per.module.parent.id === mod.id)
    let icon = (name) => {
      if (name === "Caja") return <DesktopOutlined />
      if (name === "Enfermeria") return <ReconciliationOutlined />
      if (name === "Medicina") return <MedicineBoxOutlined />
      if (name === "Laboratorio") return <ExperimentOutlined />
      if (name === "Mantenimiento") return <ToolOutlined />
      if (name === "Odontologia") return <ScheduleOutlined />
    }
    return {
      key: `mod-${mod.id}`,
      icon: icon(mod.name),
      label: mod.name,
      children: submodules.map(sub => ({
        key: `sub-${sub.module.id}`, label: (
          <Link to={sub.module.path}>{sub.module.name}</Link>
        )
      }))
    }
  })
}

export const Home = () => {

  const navigate = useNavigate()
  const [current, setCurrent] = useState('mod-1')
  const [collapsed, setCollapsed] = useState(false);

  const { isLogged } = useUser()
  const [modules, setModules] = useState([])
  const { user, logout } = useUser()

  const loadModules = async () => {
    let modules = await ModuleService.getModules()
    console.log(modules)
    setModules(modulesMapped(modules, user.permissions))
  }

  const onClick = (e) => {
    console.log('click ', e)
    setCurrent(e.key);
  }

  useEffect(() => {
    loadModules()
  }, [])

  useEffect(() => {
    if (!isLogged) navigate("login");
  }, [isLogged]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Salutic</div>
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={['mod-1']}
          defaultOpenKeys={['mod-1']}
          style={{
            height: '100%',
            //borderRight: 0,
          }}
          items={modules}

        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="header"
        >
          <div className='d-flex justify-content-between align-items-center w-100 h-100'>
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })
            }
            <Button type='link' icon={<LogoutOutlined />} onClick={() => logout()}>
              Salir
            </Button>
          </div>

        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: "100vh",
          }}
        >
          <Routes>
            <Route path="citas" element={<Outlet />} >
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
              path="enfermeria/citas"
              element={
                <VerificarAuthYPermisos>
                  <Enfermeria />
                </VerificarAuthYPermisos>
              } />
            <Route
              path="enfermeria/historial"
              element={
                <VerificarAuthYPermisos>
                  <EnfermeriaHistorial />
                </VerificarAuthYPermisos>
              } />

            <Route path="medicina" element={
              <VerificarAuthYPermisos>
                <Outlet />
              </VerificarAuthYPermisos>
            }>
              <Route
                path="citas"
                element={
                  <VerificarAuthYPermisos>
                    <MedicinaEnEspera />
                  </VerificarAuthYPermisos>
                }
              />
              
              <Route
                path='citas/:nurId/nuevo'
                element={
                  <VerificarAuthYPermisos>
                    <NuevaConsulta />
                  </VerificarAuthYPermisos>
                }
              />

              <Route
                path="expedientes"
                element={
                  <VerificarAuthYPermisos>
                    <Outlet />
                  </VerificarAuthYPermisos>
                }
              >
                <Route
                  index
                  element={
                    <VerificarAuthYPermisos>
                      <BuscarExpediente />
                    </VerificarAuthYPermisos>
                  }
                />

                <Route path=':recId'
                  element={
                    <VerificarAuthYPermisos>
                      <VerExpediente />
                    </VerificarAuthYPermisos>
                  }
                />

              </Route>

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
              <VerificarAuthYPermisos>
                <Outlet />
              </VerificarAuthYPermisos>
            }
            >
              <Route path='citas' index element={
                <VerificarAuthYPermisos>
                  <OdontologiaEnEspera />
                </VerificarAuthYPermisos>
              }
              />

              <Route
                path="historial"
                element={
                  <VerificarAuthYPermisos>
                    <ConsultarHistorial />
                  </VerificarAuthYPermisos>
                }
              />

              <Route
                path="citas/:appoId/nuevo"
                element={
                  <VerificarAuthYPermisos>
                    <OdontologyProvider>
                      <OdontologiaFicha />
                    </OdontologyProvider>
                  </VerificarAuthYPermisos>
                }
              />

              <Route
                path="historial/:recId/editar"
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

            <Route path='empresa' element={<EmpresaForm />} />
          </Routes>
        </Content>
      </Layout>
      <MyToast />
      <Loader />
      <DeleteModalConfirmation />

    </Layout>
  );
}
