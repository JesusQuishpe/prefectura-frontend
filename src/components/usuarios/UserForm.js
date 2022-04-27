import axios from 'axios';
import LoaderContext from 'contexts/LoaderContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserService } from 'services/UserService';
import * as Yup from 'yup';
import ToastContext from '../../contexts/ToastContext';
import { END_POINT } from '../../utils/conf';

export const UserForm = () => {
  const { idUser } = useParams();
  const isEdit = idUser ? true : false;
  const { openToast } = useContext(ToastContext);
  const {openLoader,closeLoader} = useContext(LoaderContext)

  const initialForm = {
    name: "",
    email: "",
    password: "",
    old_password: "",
    isOldPassword: isEdit ? true : false,
    rol: ""
  }
  const [form, setForm] = useState(initialForm);

  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    let response = await axios.get(END_POINT + "roles");
    setRoles(response.data.data);
  }

  const getUserById = async (id) => {
    let response = await axios.get(END_POINT + `users/${id}`);
    let { name, email, rol_id } = response.data.data;
    console.log(name, email);
    setForm({ ...form, name, email, rol: rol_id });
  }

  useEffect(() => {
    if (isEdit) {
      getUserById(idUser);
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
              old_password: Yup.string().when('isOldPassword', {
                is: true,
                then: Yup.string()
                  .required('El campo es obligatorio'),
                otherwise: Yup.string(),
              }),
              password: Yup.string().required('El campo es requerido'),
              rol: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (values, { resetForm }) => {
            try {
              console.log(values);
              if (!isEdit) {
                openLoader("Creando usuario...")
                await UserService.createUser(values)
                openToast("Usuario creado correctamente",true)
                resetForm({ values: initialForm });
              } else {
                openLoader("Actualizando usuario...")
                await UserService.updateUser({ ...values, id: idUser })
                openToast("Usuario actualizado correctamente",true)
              }
              closeLoader()
            } catch (error) {
              console.log(error);
              closeLoader()
              let message = error.response.data.message ? "El nombre de usuario o email ya existen" :
                error.response.data.exception_message
              openToast(message, false)
            }

          }}

        >
          {
            ({ errors, touched }) => (
              <Form id='form-newuser'>
                <FormReact.Group className='mb-3'>
                  <FormReact.Label>Nombre de usuario</FormReact.Label>
                  <Field name="name" maxLength={50} className={`form-control ${touched.name && errors.name && 'error'}`} type="text" />
                  <ErrorMessage name='name' component={() => (<FormReact.Text className="text-danger">{errors.name}</FormReact.Text>)} />
                </FormReact.Group>
                <FormReact.Group className='mb-3'>
                  <FormReact.Label>Correo electrónico</FormReact.Label>
                  <Field name="email" className={`form-control ${touched.email && errors.email && 'error'}`} type="text" />
                  <ErrorMessage name='email' component={() => (<FormReact.Text className="text-danger">{errors.email}</FormReact.Text>)} />
                </FormReact.Group>
                {
                  isEdit && <FormReact.Group className='mb-3'>
                    <FormReact.Label>Contraseña actual</FormReact.Label>
                    <Field
                      type="password"
                      name="old_password"
                      autoComplete="false"
                      className={`form-control ${touched.old_password && errors.old_password && 'error'}`} />
                    <ErrorMessage name='old_password' component={() => (<FormReact.Text className="text-danger">{errors.old_password}</FormReact.Text>)} />
                  </FormReact.Group>
                }
                <FormReact.Group className='mb-3'>
                  <FormReact.Label>{isEdit ? "Contraseña nueva" : "Contraseña"}</FormReact.Label>
                  <Field
                    type="password"
                    name="password"
                    autoComplete="false"
                    className={`form-control ${touched.password && errors.password && 'error'}`} />
                  <ErrorMessage name='password' component={() => (<FormReact.Text className="text-danger">{errors.password}</FormReact.Text>)} />
                </FormReact.Group>

                <FormReact.Group className='mb-3'>
                  <FormReact.Label>Rol:</FormReact.Label>
                  <Field name="rol" as="select" className={`form-select ${touched.rol && errors.rol && 'error'}`}>
                    <option value="">Selecciona un rol</option>
                    {
                      roles ? roles.map((rol) => {
                        return (
                          <option key={rol.id} value={rol.id}>{rol.name}</option>
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
