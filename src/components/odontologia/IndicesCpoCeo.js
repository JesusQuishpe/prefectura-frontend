import React, { useState } from 'react';
import { Col, Form, FormGroup, Row } from 'react-bootstrap';

export const IndicesCpoCeo = () => {
    const initialForm={
      cpo_c:"",
      ceo_c:"",
      cpo_p:"",
      ceo_e:"",
      cpo_o:"",
      ceo_o:"",
      cpo_total:"",
      ceo_total:""
    }

    const [form,setForm]=useState(initialForm)

    const sumarIndices=(n1,n2,n3)=>{
      let num1=parseFloat(n1)
      let num2=parseFloat(n2)
      let num3=parseFloat(n3)
      if(isNaN(num1) || isNaN(num2) || isNaN(num3))return 0
      return num1+num2+num3;
    }

    const handleFormChange=(e)=>{
      const copyForm={...form,[e.target.name]:e.target.value}

      copyForm.cpo_total=sumarIndices(copyForm.cpo_c,copyForm.cpo_p,copyForm.cpo_o)
      copyForm.ceo_total=sumarIndices(copyForm.ceo_c,copyForm.ceo_e,copyForm.ceo_o)

      setForm(copyForm)
      
    }

    return (
        <>
            <div className='w-50 mx-auto'>
                <Row className='mb-2'>
                    <Col>
                        <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>C:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='cpo_c' 
                                value={form.cpo_c} 
                                onChange={handleFormChange}/>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>c:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='ceo_c'
                                value={form.ceo_c} 
                                onChange={handleFormChange}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>P:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='cpo_p'
                                value={form.cpo_p} 
                                onChange={handleFormChange}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>e:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='ceo_e'
                                value={form.ceo_e} 
                                onChange={handleFormChange}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>O:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='cpo_o'
                                value={form.cpo_o} 
                                onChange={handleFormChange}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>o:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='ceo_o'
                                value={form.ceo_o} 
                                onChange={handleFormChange}
                                
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col>
                        <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>Total:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='cpo_total'
                                value={form.cpo_total} 
                                onChange={handleFormChange}
                                disabled
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup as={Row}>
                            <Form.Label as={Col} sm={4}>Total:</Form.Label>
                            <Col>
                                <Form.Control 
                                type='number'
                                name='ceo_total'
                                value={form.ceo_total} 
                                onChange={handleFormChange}
                                disabled
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        </>
    );
};