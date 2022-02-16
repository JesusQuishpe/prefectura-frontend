import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from '../../../contexts/ToastContext';
import TituloService from 'services/TituloService';

export const TituloForm = () => {
  const { idTitulo } = useParams();
  const isEdit = idTitulo ? true : false;
  const { openToast } = useContext(ToastContext);

  const initialForm = {
    nombre: ""
  }

  const [form, setForm] = useState(initialForm);

  const crearTitulo = async (titulo) => {
    try {
      TituloService.crearTitulo(titulo)
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }
  }

  const actualizarTitulo = async (valores) => {
    try {
      await TituloService.actualizarTitulo({id:idTitulo,...valores})
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getTituloById = async (id) => {
    let titulo = await TituloService.getTitulo(id)
    console.log(titulo);
    let { nombre } = titulo;
    console.log(nombre);
    setForm({ nombre });
  }

  useEffect(() => {
    if (isEdit) {
      getTituloById(idTitulo);
    }
  }, []);

  return (
    <>
      <div className='w-50 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar titulo" : "Nuevo titulo"}</h2>
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
              await crearTitulo(valores);
            } else {
              await actualizarTitulo(valores);
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
