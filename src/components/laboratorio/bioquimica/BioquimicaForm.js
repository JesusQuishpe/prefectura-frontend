import React from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm'


const initialForm = {
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
    calcio: ""
};

const validationForm = {

};

export const BioquimicaForm = () => {
    const { form, loading, errors, response, handleChange, handleSubmit } = useForm(initialForm, validationForm);

    return (
        <>
            <Form>
                <h3 className='text-start '>Bioquimica</h3>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="glucosa">
                        <Form.Label as={Col} className='text-start'>
                            Glucosa:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='glucosa' value={form.glucosa} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="urea">
                        <Form.Label as={Col} className='text-start'>
                            Urea:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='urea' value={form.urea} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="creatinina">
                        <Form.Label as={Col} className='text-start'>
                            Creatinina:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='creatinina' value={form.creatinina} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="acido_urico">
                        <Form.Label as={Col} className='text-start'>
                            Ácido úrico:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='acido_urico' value={form.acido_urico} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="colesterol_total">
                        <Form.Label as={Col} className='text-start'>
                            Colesterol total:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='colesterol_total' value={form.colesterol_total} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="colesterol_hdl">
                        <Form.Label as={Col} className='text-start'>
                            Colesterol hdl:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='colesterol_hdl' value={form.colesterol_hdl} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="trigliceridos">
                        <Form.Label as={Col} className='text-start'>
                            Trigliceridos:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='trigliceridos' value={form.trigliceridos} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="colesterol_ldl">
                        <Form.Label as={Col} className='text-start'>
                            Colesterol ldl:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='colesterol_ldl' value={form.colesterol_ldl} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="proteinas_totales">
                        <Form.Label as={Col} className='text-start'>
                            Proteínas totales:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='proteinas_totales' value={form.proteinas_totales} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="albumina">
                        <Form.Label as={Col} className='text-start'>
                            Albumina:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='albumina' value={form.albumina} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="globulina">
                        <Form.Label as={Col} className='text-start'>
                            Globulina:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='globulina' value={form.globulina} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="relacion_ag">
                        <Form.Label as={Col} className='text-start'>
                            Relación A/G:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='relacion_ag' value={form.relacion_ag} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="bilirrubina_directa">
                        <Form.Label as={Col} className='text-start'>
                            Bilirrubina directa:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='bilirrubina_directa' value={form.bilirrubina_directa} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="bilirrubina_total">
                        <Form.Label as={Col} className='text-start'>
                            bilirrubina_total:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='bilirrubina_total' value={form.bilirrubina_total} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="bilirrubina_indirecta">
                        <Form.Label as={Col} className='text-start'>
                            Bilirrubina indirecta:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='bilirrubina_indirecta' value={form.bilirrubina_indirecta} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="gamma_gt">
                        <Form.Label as={Col} className='text-start'>
                            Gamma glutámil:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='gamma_gt' value={form.gamma_gt} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="calcio">
                        <Form.Label as={Col} className='text-start'>
                            Calcio:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='calcio' value={form.calcio} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Col></Col>
                </Row>
                <h3 className='border-bottom border-2 border-secondary text-start '>Inmunología</h3>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="vdrl">
                        <Form.Label as={Col} className='text-start'>
                            VDRL:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='vdrl' value={form.vdrl} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="proteinas_c_react">
                        <Form.Label as={Col} className='text-start'>
                            Proteinas C React:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='proteinas_c_react' value={form.proteinas_c_react} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="ra_test_latex">
                        <Form.Label as={Col} className='text-start'>
                            R.A test (latex):
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='ra_test_latex' value={form.ra_test_latex} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="asto">
                        <Form.Label as={Col} className='text-start'>
                            A.S.T.O:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='asto' value={form.asto} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="salmonella_o">
                        <Form.Label as={Col} className='text-start'>
                            Salmonella O:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='salmonella_o' value={form.salmonella_o} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="salmonella_h">
                        <Form.Label as={Col} className='text-start'>
                            Salmonella H:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='salmonella_h' value={form.salmonella_h} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="paratifica_a">
                        <Form.Label as={Col} className='text-start'>
                            Paratifica A:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='paratifica_a' value={form.paratifica_a} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="paratifica_b">
                        <Form.Label as={Col} className='text-start'>
                            Paratifica B:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='paratifica_b' value={form.paratifica_b} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="proteus_0x19">
                        <Form.Label as={Col} className='text-start'>
                            Proteus 0x19:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='proteus_0x19' value={form.proteus_0x19} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="proteus_0x2">
                        <Form.Label as={Col} className='text-start'>
                            Proteus 0x2:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='proteus_0x2' value={form.proteus_0x2} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="proteus_0xk">
                        <Form.Label as={Col} className='text-start'>
                            Proteus 0xk:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='proteus_0xk' value={form.proteus_0xk} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Col />
                </Row>
                <h3 className='border-bottom border-2 border-secondary text-start '>Enzimas</h3>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="transaminasa_ox">
                        <Form.Label as={Col} className='text-start'>
                            Transaminasa OX:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='transaminasa_ox' value={form.transaminasa_ox} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="transaminasa_pir">
                        <Form.Label as={Col} className='text-start'>
                            Transaminasa PIR:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='transaminasa_pir' value={form.transaminasa_pir} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="fosfatasa_alcalina_adultos">
                        <Form.Label as={Col} className='text-start'>
                            Fosfatasa alcalina adulto:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='fosfatasa_alcalina_adultos' value={form.fosfatasa_alcalina_adultos} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="fosfatasa_alcalina_ninos">
                        <Form.Label as={Col} className='text-start'>
                            Fosfata alcalina niños:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='fosfatasa_alcalina_ninos' value={form.fosfatasa_alcalina_ninos} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="amilasa">
                        <Form.Label as={Col} className='text-start'>
                            Amilasa:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='amilasa' value={form.amilasa} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="lipasa">
                        <Form.Label as={Col} className='text-start'>
                            Lipasa:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" name='lipasa' value={form.lipasa} onChange={handleChange} />
                        </Col>
                    </Form.Group>
                </Row>
                <h3 className='border-bottom border-2 border-secondary text-start '>Observaciones</h3>
                <Form.Group className="mb-3" controlId="observaciones">
                    <Form.Control as="textarea" rows={3} name='observaciones' value={form.observaciones} onChange={handleChange}/>
                </Form.Group>
            </Form>
        </>
    )
}
