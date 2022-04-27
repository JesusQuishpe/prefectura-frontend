import axios from 'axios';
import React from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser';


export const AppBar = () => {

  const { user, logout } = useUser();

  const navigate = useNavigate();

  const handleNavItemClick = (e, module) => {
    if (module.path) navigate(module.path);
  }

  const handleLogout = () => {
    logout();
  }


  return (
    <Navbar bg="light" expand="lg" className='shadow-sm' fixed='top'>
      <Container>
        <Navbar.Brand>Centro médico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='flex-lg-row flex-sm-column '>
          <Nav className="me-auto">
            {
              user?.permissions ? user.permissions.map((permission) => {
                if (
                  permission.name === "Caja" ||
                  permission.name === "Medicina" ||
                  permission.name === "Laboratorio" ||
                  permission.name === "Odontologia" ||
                  permission.name === "Mantenimiento"
                  ) {
                  return (
                    <NavDropdown key={permission.module_id} title={permission.name} id={`dropdown-${permission.name}`}>
                      {
                        permission.submodules.map((submodule) => {
                          return (
                            <NavDropdown.Item key={submodule.module_id} onClick={(e) => handleNavItemClick(e, submodule)}>{submodule.name}</NavDropdown.Item>
                          )
                        })
                      }
                    </NavDropdown>
                  )
                }
                else {
                  return (
                    <Nav.Link key={permission.module_id} onClick={(e) => handleNavItemClick(e, permission)}>{permission.name}</Nav.Link>
                  )
                }
                /*if(permission.id_parent===null && permission.submodules.length===0 && permission.checked===1){//Es module padre y tiene permission
                  return (
                    <Nav.Link key={permission.module_id} onClick={(e)=>handleNavItemClick(e,permission)}>{permission.name}</Nav.Link>
                  )
                }else if(permission.submodules && permission.submodules.length>0){//Verificar si tiene submodules
                  if(permission.name==="Caja"){
                    return (
                      <Nav.Link key={permission.module_id} onClick={(e)=>handleNavItemClick(e,permission)}>{permission.name}</Nav.Link>
                    )
                  }
                  return (
                    <NavDropdown key={permission.module_id} title={permission.name} id={`dropdown-${permission.name}`}>
                      {
                        permission.submodules.map((submodule) => {
                          return (
                            <NavDropdown.Item key={submodule.module_id} onClick={(e)=>handleNavItemClick(e,submodule)}>{submodule.name}</NavDropdown.Item>
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
                "No se pudo cargar los modules del sistema"
            }
          </Nav>
          <Nav className='me-md-auto me-lg-0'>
            <NavDropdown title={"Bienvenid@          " + user?.name} id={`dropdown-user`} >
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
