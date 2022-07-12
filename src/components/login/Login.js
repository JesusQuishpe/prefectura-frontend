import React, { useEffect, useState } from 'react'
//import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'hooks/useUser'
import LogoSoftware from 'assets/png/logo-software.png'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'

export const Login = () => {
  //States
  const initialForm = {
    email: "",
    password: ""
  }
  const [form, setForm] = useState(initialForm)
  //Other hooks
  const navigate = useNavigate()
  const { login, isLogged } = useUser()


  /**
   * Handler para loguear al usuario
   * @param {Event} e 
   * @returns 
   */
  const handleClick = async (e) => {
    try {
      e.preventDefault()
      login(form)
    } catch (error) {
      /*if(error.response.status===422){
          alert("Debe proporcionar un correo valido");
          return;
      }*/
      if (error.response.status === 401) {
        alert("Error las credenciales")
        return
      }
    }
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    login(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (isLogged) return navigate('/');
  }, [isLogged])

  /*return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <Form className='w-50 p-4' onSubmit={handleClick}>
        <div className='d-flex flex-column align-items-center mb-4'>
          <img src={LogoSoftware} width={"250"} alt='Logo prefectura'/>
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
  )*/
  return (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
        <Form
          style={{ width: "700px" }}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Row justify='center' className='mb-3'>
            <Col>
              <img src={LogoSoftware} width={300} alt="Logo.png" />
            </Col>
          </Row>
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              {
                required: true,
                message: 'Ingresa un correo electrónico!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Ingresa una contraseña!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form></Col>
    </Row>
  )
}
