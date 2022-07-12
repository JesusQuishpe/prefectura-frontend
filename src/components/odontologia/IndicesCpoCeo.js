import { Col, Form, InputNumber, Row } from 'antd';
import OdontologyContext from 'contexts/OdontologyContext';
import React, { forwardRef, useState, useImperativeHandle, useContext, useEffect } from 'react';

const IndicesCpoCeo = forwardRef((props, ref) => {
  console.log("INDICES");
  const { data } = useContext(OdontologyContext)

  const [form] = Form.useForm()
  const formWatched = Form.useWatch([], form)

  const sumarIndices = (n1, n2, n3) => {
    let num1 = parseFloat(n1) || 0
    let num2 = parseFloat(n2) || 0
    let num3 = parseFloat(n3) || 0
    //if (isNaN(num1) || isNaN(num2) || isNaN(num3)) return 0
    return num1 + num2 + num3;
  }

  const handleFormChange = (value, values) => {
    const newValues = { ...values, ...value }
    newValues.cpo_total = sumarIndices(newValues.cpo_c, newValues.cpo_p, newValues.cpo_o)
    newValues.ceo_total = sumarIndices(newValues.ceo_c, newValues.ceo_e, newValues.ceo_o)
    console.log(values);
    form.setFieldsValue(newValues)
  }

  useImperativeHandle(ref, () => {
    return {
      data: {
        ...convertEmptyToZero(formWatched),
        id: data?.cpoCeoRatios?.id || null
      }
    }
  }, [formWatched, data])

  const convertEmptyToZero = (form) => {
    let newData = { ...form }
    for (const key in newData) {
      if (Object.hasOwnProperty.call(newData, key)) {
        const element = newData[key];
        if (!element && key !== "id") {
          newData[key] = 0
        }
      }
    }
    return newData
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        cpo_c: data?.cpoCeoRatios?.cd || 0,
        ceo_c: data?.cpoCeoRatios?.ce || 0,
        cpo_p: data?.cpoCeoRatios?.pd || 0,
        ceo_e: data?.cpoCeoRatios?.ee || 0,
        cpo_o: data?.cpoCeoRatios?.od || 0,
        ceo_o: data?.cpoCeoRatios?.oe || 0,
        cpo_total: data?.cpoCeoRatios?.cpo_total || 0,
        ceo_total: data?.cpoCeoRatios?.ceo_total || 0,

      })
    }
  }, [data, form])

  return (
    <>
      <h5 className='mb-3'>Indices cpo-ceo</h5>
      <div className='w-50 mx-auto'>
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onValuesChange={handleFormChange}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="C" name="cpo_c">
                <InputNumber />
              </Form.Item>
              <Form.Item label="P" name="cpo_p">
                <InputNumber />
              </Form.Item>
              <Form.Item label="O" name="cpo_o">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Total" name="cpo_total">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="C" name="ceo_c">
                <InputNumber />
              </Form.Item>
              <Form.Item label="E" name="ceo_e">
                <InputNumber />
              </Form.Item>
              <Form.Item label="O" name="ceo_o">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Total" name="ceo_total">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
})

export default IndicesCpoCeo