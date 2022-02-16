import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from '../../../contexts/ToastContext';
import ExamenService from 'services/ExamenService';
import TipoExamenService from 'services/TipoExamenService';

export const ExamenForm = () => {
  const { idExamen } = useParams();
  const isEdit = idExamen ? true : false;
  const { openToast } = useContext(ToastContext);

  const initialForm = {
    nombre: "",
    //id_tipo: ""
  }

  const [form, setForm] = useState(initialForm);
  const [tipos, setTipos] = useState([]);

  const getTiposDeExamen = async () => {
    let tiposExamen = await TipoExamenService.getTipoExamenes();
    console.log(tiposExamen);
    setTipos(tiposExamen);
  }

  const crearExamen = async (examen) => {
    try {
      ExamenService.crearExamen(examen)
      openToast("Registro creado", true);
    } catch (error) {
      openToast("No se pudo crear el registro", false);
      console.log(error);
    }
  }

  const actualizarExamen = async (valores) => {
    try {
      await ExamenService.actualizarExamen({ id: idExamen, ...valores })
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getExamenById = async (id) => {
    let examen = await ExamenService.getExamen(id)
    console.log(examen);
    let { nombre} = examen;
    console.log(nombre);
    setForm({ nombre});
  }

  useEffect(() => {
    if (isEdit) {
      getExamenById(idExamen);
    }
    getTiposDeExamen();
  }, []);

  return (
    <>
      <div className='w-50 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar examen" : "Nuevo examen"}</h2>
        <Formik
          enableReinitialize
          initialValues={
            form
          }

          validationSchema={
            Yup.object({
              nombre: Yup.string().required('El campo es requerido'),
              //id_tipo: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (valores, { resetForm }) => {
            if(valores.id_tipo==="")return;
            console.log(valores);
            if (!isEdit) {
              await crearExamen(valores);
            } else {
              await actualizarExamen(valores);
            }
            resetForm({ values: initialForm });
          }}
        >
          {
            ({ errors, touched, values, handleChange }) => (
              <Form id='form-newuser'>
                {values.id_tipo==="" && touched.id_tipo && <Alert variant='danger'>Debe seleccionar el tipo de examen</Alert>}
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Nombre:</FormReact.Label>
                  <Field name="nombre" className={`form-control ${touched.nombre && errors.nombre && 'error'}`} type="text" />
                  <ErrorMessage name='nombre' component={() => (<FormReact.Text className="text-danger">{errors.nombre}</FormReact.Text>)} />
                </FormReact.Group>
                {/*<div className='mb-4'>
                  <p>Tipo Examen</p>
                  <FormReact.Check
                    id={`radio-1`}
                    inline
                    label={"Individual"}
                    name="id_tipo"
                    type={"radio"}
                    value={1}
                    onChange={handleChange}
                    checked={values.id_tipo==="1" ? true : false}
                  />
                  <FormReact.Check
                    id={`radio-2`}
                    inline
                    label={"Parámetro"}
                    name="id_tipo"
                    type={"radio"}
                    value={2}
                    onChange={handleChange}
                    checked={values.id_tipo==="2" ? true : false}
                  />
                  <FormReact.Check
                    id={`radio-3`}
                    inline
                    label={"Perfil"}
                    name="id_tipo"
                    type={"radio"}
                    value={3}
                    onChange={handleChange}
                    checked={values.id_tipo==="3" ? true : false}
                  />
            </div>*/}

                <Button type='submit'>Guardar</Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  );
};
