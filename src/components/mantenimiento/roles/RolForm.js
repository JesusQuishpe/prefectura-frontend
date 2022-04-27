import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from 'contexts/ToastContext';
import { END_POINT } from 'utils/conf';


export const RolForm = () => {
  const { idRol } = useParams();
  const isEdit = idRol ? true : false;
  const { openToast } = useContext(ToastContext);

  const initialForm = {
    name: ""
  }

  const [form, setForm] = useState(initialForm);

  const createRole = async (rol) => {
    try {
      await axios.post(END_POINT + "roles", rol);
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }

  }

  const updateRole = async (values) => {
    try {
      await axios.put(END_POINT + `roles/${idRol}`, values);
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getRolById = async (id) => {
    let response = await axios.get(END_POINT + `roles/${id}`);
    let { name } = response.data.data;
    console.log(name);
    setForm({ name });
  }

  useEffect(() => {
    if (isEdit) {
      getRolById(idRol);
    }
  }, []);

  return (
    <>
      <div className='w-50 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar rol" : "Nuevo rol"}</h2>
        <Formik
          enableReinitialize
          initialValues={
            form
          }

          validationSchema={
            Yup.object({
              name: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (values, { resetForm }) => {
            console.log(values);
            if (!isEdit) {
              await createRole(values);
            } else {
              await updateRole(values);
            }
            resetForm({ values: initialForm });
          }}
        >
          {
            ({ errors, touched }) => (
              <Form id='form-newuser'>
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Nombre:</FormReact.Label>
                  <Field name="name" className={`form-control ${touched.name && errors.name && 'error'}`} type="text" />
                  <ErrorMessage name='name' component={() => (<FormReact.Text className="text-danger">{errors.name}</FormReact.Text>)} />
                </FormReact.Group>
                <Button type='submit'>Guardar</Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  );
};
