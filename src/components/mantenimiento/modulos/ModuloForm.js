import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form as FormReact } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import ToastContext from '../../../contexts/ToastContext';
import { END_POINT } from '../../../utils/conf';


export const ModuloForm = () => {
    const { idModulo } = useParams();
    const isEdit = idModulo ? true : false;
    const { openToast } = useContext(ToastContext);

    const initialForm = {
        nombre: ""
    }

    const [form, setForm] = useState(initialForm);

    const crearModulo = async (modulo) => {
        try {
            let response = await axios.post(END_POINT + "modulos", modulo);
            openToast("Registro creado", true);
        } catch (error) {
            openToast("No se pudo crear el registro", false);
            console.log(error);
        }

    }

    const actualizarModulo = async (valores) => {
        try {
            let response = await axios.put(END_POINT + `modulos/${idModulo}`, valores);
            openToast("Registro actualizado", true);
        } catch (error) {
            openToast("No se pudo actualizar el registro", false);
            console.log(error);
        }

    }

    const getModuloById = async (id) => {
        let response = await axios.get(END_POINT + `modulos/${id}`);
        let { nombre } = response.data.data;
        console.log(nombre);
        setForm({ nombre});
    }

    useEffect(() => {
        if (isEdit) {
            getModuloById(idModulo);
        }
    }, []);

    return (
        <>
            <div className='w-50 mx-auto'>
                <h2 className='mb-4'>{isEdit ? "Editar modulo" : "Nuevo modulo"}</h2>
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
                        if(!isEdit){
                            await crearModulo(valores);
                        }else{
                            await actualizarModulo(valores);
                        }
                        resetForm({values:initialForm});
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
