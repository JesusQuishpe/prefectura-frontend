import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from 'contexts/ToastContext';
import RolService from 'services/RolService';

export const RolForm = () => {
  //Contexts
  const { openToast } = useContext(ToastContext);
  //Other hooks
  const { idRol } = useParams();
  //States
  const initialForm = {
    name: ""
  }
  const [form, setForm] = useState(initialForm);

  const isEdit = idRol ? true : false;

  /**
   * Crea el rol en la BD
   * @param {object} rol 
   */
  const createRole = async (rol) => {
    try {
      await RolService.crearRol(rol)
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }
  }

  /**
   * Actualiza el rol en la BD
   * @param {object} rol 
   */
  const updateRole = async (rol) => {
    try {
      await RolService.actualizarRol(rol)
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  /**
   * Carga la informacion del rol dado el id
   * @param {number} id 
   */
  const getRolById = async (id) => {
    let response = await RolService.getRol(id)
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
            resetForm({ values: initialForm, errors: {} });
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
