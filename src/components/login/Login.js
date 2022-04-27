import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import LogoSoftware from '../../assets/png/prefectura_logo.png'

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLogged } = useUser();
  const initialForm = {
    email: "",
    password: ""
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault()
      login(form);
    } catch (error) {
      /*if(error.response.status===422){
          alert("Debe proporcionar un correo valido");
          return;
      }*/
      if (error.response.status === 401) {
        alert("Error las credenciales");
        return;
      }
    }
  };

  useEffect(() => {
    if (isLogged) return navigate('/');
  }, [isLogged]);

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <Form className='w-50 p-4' onSubmit={handleClick}>
        <div className='d-flex flex-column align-items-center mb-4'>
          <img src={LogoSoftware} width={"250"} />
        </div>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label as={Col} sm={3} className='text-start'>
            Correo electrónico:
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" name='email' value={form.email} onChange={handleChange} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label as={Col} sm={3} className='text-start'>
            Contraseña:
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="password" name='password' value={form.password} onChange={handleChange} />
          </Col>
        </Form.Group>
        <div className='d-flex justify-content-end'>
          <Button type='submit'>Ingresar</Button>
        </div>

      </Form>
    </div>
  )
}
