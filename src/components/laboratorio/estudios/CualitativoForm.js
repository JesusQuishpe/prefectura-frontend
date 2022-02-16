import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Form as FormReact } from 'react-bootstrap';

export const CualitativoForm = () => {

  const initialForm = {
    nombre: ""
  }
  const [form, setForm] = useState(initialForm);

  return (
    <>
      <div className='w-50 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar estudio" : "Nuevo estudio"}</h2>
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
            resetForm({ values: initialForm });
          }}
        >
          {
            ({ errors, touched}) => (
              <Form id='form-cualitativo'>
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Nombre:</FormReact.Label>
                  <Field name="nombre" className={`form-control ${touched.nombre && errors.nombre && 'error'}`} type="text" />
                  <ErrorMessage name='nombre' component={() => (<FormReact.Text className="text-danger">{errors.nombre}</FormReact.Text>)} />
                </FormReact.Group>
              </Form>
            )
          }
        </Formik>
      </div>
    </>
  );
}
