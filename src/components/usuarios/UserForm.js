import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from '../../contexts/ToastContext';
import { END_POINT } from '../../utils/conf';

export const UserForm = () => {
  const { idUsuario } = useParams();
  const isEdit = idUsuario ? true : false;
  const { openToast } = useContext(ToastContext);

  const initialForm = {
    name: "",
    email: "",
    password: "",
    rol: ""
  }
  const [form, setForm] = useState(initialForm);

  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    let response = await axios.get(END_POINT + "roles");
    setRoles(response.data.data);
  }

  const crearUsuario = async (usuario) => {
    try {
      let response = await axios.post(END_POINT + "users", usuario);
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }

  }

  const actualizarUsuario = async (usuario) => {
    try {
      await axios.put(END_POINT + `users/${idUsuario}`, usuario);
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getUsuarioById = async (id) => {
    let response = await axios.get(END_POINT + `users/${id}`);
    let { name, email, id_rol } = response.data.data;
    console.log(name, email);
    setForm({ ...form, name, email, rol: id_rol });
  }

  useEffect(() => {
    if (isEdit) {
      getUsuarioById(idUsuario);
    }
    getRoles();
  }, []);

  return (
    <>
      <div className='w-25 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar usuario" : "Nuevo usuario"}</h2>
        <Formik
          enableReinitialize
          initialValues={
            form
          }

          validationSchema={
            Yup.object({
              name: Yup.string().required('El campo es requerido'),
              email: Yup.string().required('El campo es requerido').email('Debe ser un email válido'),
              password: Yup.string().required('El campo es requerido'),
              rol: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (valores, { resetForm }) => {
            console.log(valores);
            if (!isEdit) {
              await crearUsuario(valores);
            } else {
              await actualizarUsuario(valores);
            }
            resetForm({ values: initialForm });
          }}

        >
          {
            ({ errors, touched }) => (
              <Form id='form-newuser'>
                <FormReact.Group>
                  <FormReact.Label>Nombre de usuario</FormReact.Label>
                  <Field name="name" className={`form-control ${touched.name && errors.name && 'error'}`} type="text" />
                  <ErrorMessage name='name' component={() => (<FormReact.Text className="text-danger">{errors.name}</FormReact.Text>)} />
                </FormReact.Group>
                <FormReact.Group>
                  <FormReact.Label>Correo electrónico</FormReact.Label>
                  <Field name="email" className={`form-control ${touched.email && errors.email && 'error'}`} type="text" />
                  <ErrorMessage name='email' component={() => (<FormReact.Text className="text-danger">{errors.email}</FormReact.Text>)} />
                </FormReact.Group>
                {
                  !isEdit && (<FormReact.Group>
                    <FormReact.Label>Contraseña</FormReact.Label>
                    <Field type="password" name="password" className={`form-control ${touched.password && errors.password && 'error'}`}/>
                    <ErrorMessage name='password' component={() => (<FormReact.Text className="text-danger">{errors.password}</FormReact.Text>)} />
                  </FormReact.Group>)
                }

                <FormReact.Group>
                  <FormReact.Label>Rol:</FormReact.Label>
                  <Field  name="rol" as="select" className={`form-select ${touched.rol && errors.rol && 'error'}`}>
                    <option value="">Selecciona un doctor</option>
                    {
                      roles ? roles.map((rol) => {
                        return (
                          <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                        )
                      })
                        : "No se pudo cargar los roles"
                    }
                  </Field>
                  <ErrorMessage name='rol' component={() => (<FormReact.Text className="text-danger">{errors.rol}</FormReact.Text>)} />
                </FormReact.Group>

                <Button type='submit' className='mt-4'>Guardar</Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  );
};
