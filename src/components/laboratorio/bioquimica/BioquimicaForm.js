import React, { useContext, useEffect, useState } from 'react';
import { Col, Form as FormReact, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import '../../../css/Errors.css';
import { calcularBilirrubinaIndirecta, calcularColesterolHdl, calcularColesterolLdl, calcularGlobulina, calcularRelacionAG } from '../../../utils/formulas.js';
import axios from 'axios';
import { END_POINT } from '../../../utils/conf';
import { MyToast } from '../../MyToast';
import LaboratorioContext from '../../../contexts/LaboratorioContext';
import ModalContext from '../../../contexts/ModalContext';


const MyField = (props) => {
    const {
        values: { colesterol_total, trigliceridos, colesterol_hdl,
            albumina, globulina, proteinas_totales,
            bilirrubina_directa, bilirrubina_total },
        touched,
        setFieldValue,
    } = useFormikContext();

    const [field, meta] = useField(props);

    useEffect(() => {
        if (props.name === "colesterol_hdl") {
            if (colesterol_total != "" && !isNaN(colesterol_total)) {
                setFieldValue(props.name, calcularColesterolHdl(colesterol_total));
            } else {
                setFieldValue(props.name, 0);
                setFieldValue("colesterol_ldl", 0);
            }
        }
        if (props.name === "colesterol_ldl") {
            if (trigliceridos != "" && !isNaN(trigliceridos) && colesterol_total != "" && !isNaN(colesterol_total)) {
                setFieldValue(props.name, calcularColesterolLdl(trigliceridos, colesterol_total, colesterol_hdl));
            } else {
                setFieldValue(props.name, 0);
            }
        }
        if (props.name === "globulina") {
            if (proteinas_totales != "" && !isNaN(proteinas_totales) && albumina != "" && !isNaN(albumina)) {
                setFieldValue(props.name, calcularGlobulina(proteinas_totales, albumina));
            } else {
                setFieldValue(props.name, 0);
            }
        }

        if (props.name === "relacion_ag") {
            if (albumina != "" && !isNaN(albumina) && globulina != "" && !isNaN(globulina)) {
                setFieldValue(props.name, calcularRelacionAG(albumina, globulina));
            } else {
                setFieldValue(props.name, 0);
            }
        }

        if (props.name === "bilirrubina_indirecta") {
            if (bilirrubina_directa != "" && !isNaN(bilirrubina_directa) && bilirrubina_total != "" && !isNaN(bilirrubina_total)) {
                setFieldValue(props.name, calcularBilirrubinaIndirecta(bilirrubina_total, bilirrubina_directa));
            } else {
                setFieldValue(props.name, 0);
            }
        }

    }, [colesterol_total, trigliceridos,
        albumina, proteinas_totales,
        bilirrubina_total, bilirrubina_directa,
        globulina,
        touched.colesterol_total, touched.trigliceridos,
        touched.albumina, touched.proteinas_totales,
        touched.bilirrubina_total, touched.bilirrubina_directa,
        touched.globulina
    ])

    return (
        <>
            <input {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
}

export const BioquimicaForm = () => {
    var initialForm = {
        id_doc: "",
        glucosa: "",
        urea: "",
        creatinina: "",
        acido_urico: "",
        colesterol_total: "",
        colesterol_hdl: "",
        trigliceridos: "",
        colesterol_ldl: "",
        proteinas_totales: "",
        albumina: "",
        globulina: "",
        relacion_ag: "",
        bilirrubina_directa: "",
        bilirrubina_total: "",
        bilirrubina_indirecta: "",
        gamma_gt: "",
        calcio: "",
        vdrl: "",
        proteinas_c_react: "",
        ra_test_latex: "",
        asto: "",
        salmonella_o: "",
        salmonella_h: "",
        paratifica_a: "",
        paratifica_b: "",
        proteus_0x19: "",
        proteus_0x2: "",
        proteus_0xk: "",
        transaminasa_ox: "",
        transaminasa_pir: "",
        fosfatasa_alcalina_adultos: "",
        fosfatasa_alcalina_ninos: "",
        amilasa: "",
        lipasa: "",
        observaciones: ""
    };
    //const { form, loading, errors, response, handleChange, handleSubmit } = useForm(initialForm, validationForm);
    const { dataModal,closeModal,
        actualizarPendientesYExamen,dataPaciente} = useContext(LaboratorioContext);

    const [doctores, setDoctores] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(initialForm);

    


    useEffect(() => {
        const setInitialValuesIfIsEdit = async () => {
            if (dataModal.isEdit) {
                var response = await axios.get(END_POINT + `examenPorTipo?id_tipo=${dataModal.id_tipo}&id=${dataModal.id}`);
                console.log(response.data.data);
                setDataToEdit(response.data.data);
                console.log(dataToEdit);
            }

        }

        const getDoctores = async () => {
            const response = await axios.get(END_POINT + "doctores");
            console.log(response);
            setDoctores(response.data.data);
        };
        
        getDoctores();
        setInitialValuesIfIsEdit();
    }, []);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={
                    dataToEdit
                }

                validationSchema={
                    Yup.object({
                        id_doc: Yup.string().required('Debe seleccionar un doctor'),
                        glucosa: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        urea: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        creatinina: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        acido_urico: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        colesterol_total: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        trigliceridos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        proteinas_totales: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        albumina: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        bilirrubina_directa: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        bilirrubina_total: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        gamma_gt: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        calcio: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        vdrl: Yup.string().required('El campo es requerido'),
                        proteinas_c_react: Yup.string().required('El campo es requerido'),
                        ra_test_latex: Yup.string().required('El campo es requerido'),
                        asto: Yup.string().required('El campo es requerido'),
                        salmonella_o: Yup.string().required('El campo es requerido'),
                        salmonella_h: Yup.string().required('El campo es requerido'),
                        paratifica_a: Yup.string().required('El campo es requerido'),
                        paratifica_b: Yup.string().required('El campo es requerido'),
                        proteus_0x19: Yup.string().required('El campo es requerido'),
                        proteus_0x2: Yup.string().required('El campo es requerido'),
                        proteus_0xk: Yup.string().required('El campo es requerido'),
                        transaminasa_ox: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        transaminasa_pir: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        fosfatasa_alcalina_adultos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        fosfatasa_alcalina_ninos: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        amilasa: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        lipasa: Yup.number().typeError('Debe ser numerico').required('El campo es requerido'),
                        observaciones: Yup.string().required('El campo es requerido'),
                    })
                }

                onSubmit={async (valores) => {
                    console.log("formulario enviado");
                    let form = { ...valores, atendido: 1 };
                    console.log(form);
                    
                    /*showToast({
                        show:true,
                        title:"Informacioon",
                        message:"Se ha guardado correctamente"
                    });*/
                    let response=await axios.put(END_POINT+`bioquimicas/${dataModal.id}`,form);
                    actualizarPendientesYExamen(dataPaciente.cedula,"bioquimica")
                    closeModal();
                }}
            >
                {
                    ({ errors, touched }) => (
                        <Form id='form-bioquimica'>
                            <h3 className='text-start '>Bioquimica</h3>
                            <Row>
                                <FormReact.Group>
                                    <FormReact.Label>
                                        Doctor:
                                    </FormReact.Label>
                                    <Col>
                                        <Field name="id_doc" as="select" className={`form-select ${touched.id_doc && errors.id_doc && 'error'}`}>
                                            <option value="">Selecciona un doctor</option>
                                            {

                                                doctores ? doctores.map((doctor) => {
                                                    return (<option key={doctor.id} value={doctor.id}>{doctor.nombres}</option>)
                                                })
                                                    :
                                                    ''
                                            }
                                        </Field>
                                        <ErrorMessage name='id_doc' component={() => (<FormReact.Text className="text-danger">{errors.id_doc}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="glucosa">
                                    <FormReact.Label>
                                        Glucosa:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.glucosa && errors.glucosa && 'error'}`} type="text" name='glucosa' />
                                        <ErrorMessage name='glucosa' component={() => (<FormReact.Text className="text-danger">{errors.glucosa}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="urea">
                                    <FormReact.Label>
                                        Urea:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.urea && errors.urea && 'error'}`} type="text" name='urea' />
                                        <ErrorMessage name='urea' component={() => (<FormReact.Text className="text-danger">{errors.urea}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="creatinina">
                                    <FormReact.Label>
                                        Creatinina:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.creatinina && errors.creatinina && 'error'}`} type="text" name='creatinina' />
                                        <ErrorMessage name='creatinina' component={() => (<FormReact.Text className="text-danger">{errors.creatinina}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="acido_urico">
                                    <FormReact.Label>
                                        Ácido úrico:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.acido_urico && errors.acido_urico && 'error'}`} type="text" name='acido_urico' />
                                        <ErrorMessage name='acido_urico' component={() => (<FormReact.Text className="text-danger">{errors.acido_urico}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="colesterol_total">
                                    <FormReact.Label>
                                        Colesterol total:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.colesterol_total && errors.colesterol_total && 'error'}`} type="text" name='colesterol_total' />
                                        <ErrorMessage name='colesterol_total' component={() => (<FormReact.Text className="text-danger">{errors.colesterol_total}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="colesterol_hdl">
                                    <FormReact.Label>
                                        Colesterol hdl:
                                    </FormReact.Label>
                                    <Col>
                                        <MyField name="colesterol_hdl" className="form-control" disabled />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="trigliceridos">
                                    <FormReact.Label>
                                        Trigliceridos:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.trigliceridos && errors.trigliceridos && 'error'}`} type="text" name='trigliceridos' />
                                        <ErrorMessage name='trigliceridos' component={() => (<FormReact.Text className="text-danger">{errors.trigliceridos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="colesterol_ldl">
                                    <FormReact.Label>
                                        Colesterol ldl:
                                    </FormReact.Label>
                                    <Col>
                                        <MyField className="form-control" name='colesterol_ldl' disabled />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="proteinas_totales">
                                    <FormReact.Label>
                                        Proteínas totales:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.proteinas_totales && errors.proteinas_totales && 'error'}`} type="text" name='proteinas_totales' />
                                        <ErrorMessage name='proteinas_totales' component={() => (<FormReact.Text className="text-danger">{errors.proteinas_totales}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="albumina">
                                    <FormReact.Label>
                                        Albumina:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.albumina && errors.albumina && 'error'}`} type="text" name='albumina' />
                                        <ErrorMessage name='albumina' component={() => (<FormReact.Text className="text-danger">{errors.albumina}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="globulina">
                                    <FormReact.Label>
                                        Globulina:
                                    </FormReact.Label>
                                    <Col>
                                        <MyField className="form-control" name='globulina' disabled />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="relacion_ag">
                                    <FormReact.Label>
                                        Relación A/G:
                                    </FormReact.Label>
                                    <Col>
                                        <MyField className="form-control" name='relacion_ag' disabled />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="bilirrubina_directa">
                                    <FormReact.Label>
                                        Bilirrubina directa:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.bilirrubina_directa && errors.bilirrubina_directa && 'error'}`} type="text" name='bilirrubina_directa' />
                                        <ErrorMessage name='bilirrubina_directa' component={() => (<FormReact.Text className="text-danger">{errors.bilirrubina_directa}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="bilirrubina_total">
                                    <FormReact.Label>
                                        bilirrubina_total:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.bilirrubina_total && errors.bilirrubina_total && 'error'}`} type="text" name='bilirrubina_total' />
                                        <ErrorMessage name='bilirrubina_total' component={() => (<FormReact.Text className="text-danger">{errors.bilirrubina_total}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="bilirrubina_indirecta">
                                    <FormReact.Label>
                                        Bilirrubina indirecta:
                                    </FormReact.Label>
                                    <Col>
                                        <MyField className="form-control" name='bilirrubina_indirecta' disabled />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="gamma_gt">
                                    <FormReact.Label>
                                        Gamma glutámil:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.gamma_gt && errors.gamma_gt && 'error'}`} type="text" name='gamma_gt' />
                                        <ErrorMessage name='gamma_gt' component={() => (<FormReact.Text className="text-danger">{errors.gamma_gt}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="calcio">
                                    <FormReact.Label>
                                        Calcio:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.calcio && errors.calcio && 'error'}`} type="text" name='calcio' />
                                        <ErrorMessage name='calcio' component={() => (<FormReact.Text className="text-danger">{errors.calcio}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col></Col>
                            </Row>
                            <h3 className='border-bottom border-2 border-secondary text-start '>Inmunología</h3>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="vdrl">
                                    <FormReact.Label>
                                        VDRL:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.vdrl && errors.vdrl && 'error'}`} type="text" name='vdrl' />
                                        <ErrorMessage name='vdrl' component={() => (<FormReact.Text className="text-danger">{errors.vdrl}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="proteinas_c_react">
                                    <FormReact.Label>
                                        Proteinas C React:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.proteinas_c_react && errors.proteinas_c_react && 'error'}`} type="text" name='proteinas_c_react' />
                                        <ErrorMessage name='proteinas_c_react' component={() => (<FormReact.Text className="text-danger">{errors.proteinas_c_react}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="ra_test_latex">
                                    <FormReact.Label>
                                        R.A test (latex):
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.ra_test_latex && errors.ra_test_latex && 'error'}`} type="text" name='ra_test_latex' />
                                        <ErrorMessage name='ra_test_latex' component={() => (<FormReact.Text className="text-danger">{errors.ra_test_latex}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="asto">
                                    <FormReact.Label>
                                        A.S.T.O:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.asto && errors.asto && 'error'}`} type="text" name='asto' />
                                        <ErrorMessage name='asto' component={() => (<FormReact.Text className="text-danger">{errors.asto}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="salmonella_o">
                                    <FormReact.Label>
                                        Salmonella O:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.salmonella_o && errors.salmonella_o && 'error'}`} type="text" name='salmonella_o' />
                                        <ErrorMessage name='salmonella_o' component={() => (<FormReact.Text className="text-danger">{errors.salmonella_o}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="salmonella_h">
                                    <FormReact.Label>
                                        Salmonella H:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.salmonella_h && errors.salmonella_h && 'error'}`} type="text" name='salmonella_h' />
                                        <ErrorMessage name='salmonella_h' component={() => (<FormReact.Text className="text-danger">{errors.salmonella_h}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="paratifica_a">
                                    <FormReact.Label>
                                        Paratifica A:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.paratifica_a && errors.paratifica_a && 'error'}`} type="text" name='paratifica_a' />
                                        <ErrorMessage name='paratifica_a' component={() => (<FormReact.Text className="text-danger">{errors.paratifica_a}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="paratifica_b">
                                    <FormReact.Label>
                                        Paratifica B:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.paratifica_b && errors.paratifica_b && 'error'}`} type="text" name='paratifica_b' />
                                        <ErrorMessage name='paratifica_b' component={() => (<FormReact.Text className="text-danger">{errors.paratifica_b}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="proteus_0x19">
                                    <FormReact.Label>
                                        Proteus 0x19:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.proteus_0x19 && errors.proteus_0x19 && 'error'}`} type="text" name='proteus_0x19' />
                                        <ErrorMessage name='proteus_0x19' component={() => (<FormReact.Text className="text-danger">{errors.proteus_0x19}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="proteus_0x2">
                                    <FormReact.Label>
                                        Proteus 0x2:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.proteus_0x2 && errors.proteus_0x2 && 'error'}`} type="text" name='proteus_0x2' />
                                        <ErrorMessage name='proteus_0x2' component={() => (<FormReact.Text className="text-danger">{errors.proteus_0x2}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="proteus_0xk">
                                    <FormReact.Label>
                                        Proteus 0xk:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.proteus_0xk && errors.proteus_0xk && 'error'}`} type="text" name='proteus_0xk' />
                                        <ErrorMessage name='proteus_0xk' component={() => (<FormReact.Text className="text-danger">{errors.proteus_0xk}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <Col />
                            </Row>
                            <h3 className='border-bottom border-2 border-secondary text-start '>Enzimas</h3>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="transaminasa_ox">
                                    <FormReact.Label>
                                        Transaminasa OX:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.transaminasa_ox && errors.transaminasa_ox && 'error'}`} type="text" name='transaminasa_ox' />
                                        <ErrorMessage name='transaminasa_ox' component={() => (<FormReact.Text className="text-danger">{errors.transaminasa_ox}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="transaminasa_pir">
                                    <FormReact.Label>
                                        Transaminasa PIR:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.transaminasa_pir && errors.transaminasa_pir && 'error'}`} type="text" name='transaminasa_pir' />
                                        <ErrorMessage name='transaminasa_pir' component={() => (<FormReact.Text className="text-danger">{errors.transaminasa_pir}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="fosfatasa_alcalina_adultos">
                                    <FormReact.Label>
                                        Fosfatasa alcalina adulto:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.fosfatasa_alcalina_adultos && errors.fosfatasa_alcalina_adultos && 'error'}`} type="text" name='fosfatasa_alcalina_adultos' />
                                        <ErrorMessage name='fosfatasa_alcalina_adultos' component={() => (<FormReact.Text className="text-danger">{errors.fosfatasa_alcalina_adultos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <Row>
                                <FormReact.Group as={Col} className="mb-3" controlId="fosfatasa_alcalina_ninos">
                                    <FormReact.Label>
                                        Fosfata alcalina niños:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.fosfatasa_alcalina_ninos && errors.fosfatasa_alcalina_ninos && 'error'}`} type="text" name='fosfatasa_alcalina_ninos' />
                                        <ErrorMessage name='fosfatasa_alcalina_ninos' component={() => (<FormReact.Text className="text-danger">{errors.fosfatasa_alcalina_ninos}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="amilasa">
                                    <FormReact.Label>
                                        Amilasa:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.amilasa && errors.amilasa && 'error'}`} type="text" name='amilasa' />
                                        <ErrorMessage name='amilasa' component={() => (<FormReact.Text className="text-danger">{errors.amilasa}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                                <FormReact.Group as={Col} className="mb-3" controlId="lipasa">
                                    <FormReact.Label>
                                        Lipasa:
                                    </FormReact.Label>
                                    <Col>
                                        <Field className={`form-control ${touched.lipasa && errors.lipasa && 'error'}`} type="text" name='lipasa' />
                                        <ErrorMessage name='lipasa' component={() => (<FormReact.Text className="text-danger">{errors.lipasa}</FormReact.Text>)} />
                                    </Col>
                                </FormReact.Group>
                            </Row>
                            <h3 className='border-bottom border-2 border-secondary text-start '>Observaciones</h3>
                            <FormReact.Group className="mb-3" controlId="observaciones">
                                <Field as="textarea" rows={3} name='observaciones' className={`form-control ${touched.observaciones && errors.observaciones && 'error'}`} />
                                <ErrorMessage name='observaciones' component={() => (<FormReact.Text className="text-danger">{errors.observaciones}</FormReact.Text>)} />
                            </FormReact.Group>
                        </Form>
                    )
                }
            </Formik>

        </>
    )
}
