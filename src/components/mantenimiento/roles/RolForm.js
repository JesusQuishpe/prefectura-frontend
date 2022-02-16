import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from '../../../contexts/ToastContext';
import { END_POINT } from '../../../utils/conf';
import { MyToast } from '../../MyToast';

export const RolForm = () => {
  const { idRol } = useParams();
  const isEdit = idRol ? true : false;
  const { openToast } = useContext(ToastContext);

  const initialForm = {
    nombre: ""
  }

  const [form, setForm] = useState(initialForm);

  const crearRol = async (rol) => {
    try {
      let response = await axios.post(END_POINT + "roles", rol);
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }

  }

  const actualizarRol = async (valores) => {
    try {
      let response = await axios.put(END_POINT + `roles/${idRol}`, valores);
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getRolById = async (id) => {
    let response = await axios.get(END_POINT + `roles/${id}`);
    let { nombre } = response.data.data;
    console.log(nombre);
    setForm({ nombre });
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
              nombre: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (valores, { resetForm }) => {
            console.log(valores);
            if (!isEdit) {
              await crearRol(valores);
            } else {
              await actualizarRol(valores);
            }
            resetForm({ values: initialForm });
          }}
        >
          {
            ({ errors, touched }) => (
              <Form id='form-newuser'>

                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Nombre:</FormReact.Label>
                  <Field name="nombre" className={`form-control ${touched.nombre && errors.nombre && 'error'}`} type="text" />
                  <ErrorMessage name='nombre' component={() => (<FormReact.Text className="text-danger">{errors.nombre}</FormReact.Text>)} />
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
