import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ModuleService from 'services/ModuleService';
import { useUser } from '../hooks/useUser';


export const AppBar = () => {

  const { user, logout } = useUser();

  const navigate = useNavigate();

  const [modules, setModules] = useState([])
  
  const handleNavItemClick = (e, module) => {
    if (module.path) navigate(module.path);
  }

  const handleLogout = () => {
    logout();
  }

  const loadModules = async () => {
    let modules = await ModuleService.getModules()
    console.log(modules);
    setModules(modules)
  }
  useEffect(() => {
    loadModules()
  }, [])


  return (
    <Navbar bg="light" expand="lg" className='shadow-sm' fixed='top'>
      <Container>
        <Navbar.Brand>Centro médico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='flex-lg-row flex-sm-column '>
          <Nav className="me-auto">
            {
              modules.map(module => {
                let permissionsOfModule = user.permissions.filter(per => per.module.parent_id === module.id && per.checked === 1)
                if (permissionsOfModule.length === 0) {
                  return ""
                }
                return (
                  <NavDropdown key={module.id} title={module.name} id={`dropdown-${module.name}`}>
                    {
                      permissionsOfModule.map(per => {
                        return (
                          <NavDropdown.Item
                            key={per.module.id}
                            onClick={(e) => handleNavItemClick(e, per.module)}>{per.module.name}</NavDropdown.Item>
                        )
                      })
                    }
                  </NavDropdown>

                )
              })
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
