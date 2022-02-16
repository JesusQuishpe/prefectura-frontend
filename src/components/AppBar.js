import axios from 'axios';
import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser';


export const AppBar = () => {

  const { user, logout } = useUser();

  const navigate = useNavigate();

  const handleNavItemClick = (e, modulo) => {
    if (modulo.path) navigate(modulo.path);
  }

  const handleLogout = () => {
    logout();
  }


  return (
    <Navbar bg="light" expand="lg" className='shadow-sm' fixed='top'>
      <Container>
        <Navbar.Brand href="#home">Centro médico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='flex-lg-row flex-sm-column '>
          <Nav className="me-auto">
            {
              user?.permisos ? user.permisos.map((permiso) => {
                if (permiso.nombre === "Mantenimiento" || permiso.nombre === "Laboratorio") {
                  return (
                    <NavDropdown key={permiso.id_modulo} title={permiso.nombre} id={`dropdown-${permiso.nombre}`}>
                      {
                        permiso.submodulos.map((submodulo) => {
                          return (
                            <NavDropdown.Item key={submodulo.id_modulo} onClick={(e) => handleNavItemClick(e, submodulo)}>{submodulo.nombre}</NavDropdown.Item>
                          )
                        })
                      }
                    </NavDropdown>
                  )
                }
                else {
                  return (
                    <Nav.Link key={permiso.id_modulo} onClick={(e) => handleNavItemClick(e, permiso)}>{permiso.nombre}</Nav.Link>
                  )
                }
                /*if(permiso.id_parent===null && permiso.submodulos.length===0 && permiso.checked===1){//Es modulo padre y tiene permiso
                  return (
                    <Nav.Link key={permiso.id_modulo} onClick={(e)=>handleNavItemClick(e,permiso)}>{permiso.nombre}</Nav.Link>
                  )
                }else if(permiso.submodulos && permiso.submodulos.length>0){//Verificar si tiene submodulos
                  if(permiso.nombre==="Caja"){
                    return (
                      <Nav.Link key={permiso.id_modulo} onClick={(e)=>handleNavItemClick(e,permiso)}>{permiso.nombre}</Nav.Link>
                    )
                  }
                  return (
                    <NavDropdown key={permiso.id_modulo} title={permiso.nombre} id={`dropdown-${permiso.nombre}`}>
                      {
                        permiso.submodulos.map((submodulo) => {
                          return (
                            <NavDropdown.Item key={submodulo.id_modulo} onClick={(e)=>handleNavItemClick(e,submodulo)}>{submodulo.nombre}</NavDropdown.Item>
                          )
                        })
                      }
                    </NavDropdown>
                  )
                }else{
                  return ("");
                }*/
              })
                :
                "No se pudo cargar los modulos del sistema"
            }
          </Nav>
          <Nav className='me-md-auto me-lg-0'>
            <NavDropdown title={user?.name} id={`dropdown-user`} >
              <NavDropdown.Item to='configuracion' as={Link}>Configuración</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
