
import { Checkbox, Col, Form, Input, Row } from 'antd';
import OdontologyContext from 'contexts/OdontologyContext';
import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';

const { TextArea } = Input

export const Antecedentes = forwardRef((props, ref) => {
  console.log("ANTECEDENTES");
  const {
    data,
  } = useContext(OdontologyContext)

  const [form] = Form.useForm()
  const formWatched = Form.useWatch([], form)
  const initialForm = {
    selectedFamilyHistory: [],
    familyHistoryDescription: "",
    selectedPathologies: [],
    pathologiesDescription: ""
  }

  console.log(formWatched);

  useImperativeHandle(
    ref,
    () => ({
      data: {
        ...formWatched,
        fam_id: data?.familyHistory?.id || null,
        sto_test_id: data?.stomatognathicTest?.id || null,
      }
    }),
    [formWatched,data],
  )

  useEffect(() => {
    console.log(data);
    form.setFieldsValue({
      selectedFamilyHistory: loadFamilyCheckDetails(data?.familyHistory?.details),
      familyHistoryDescription: data?.familyHistory?.description || "",
      selectedPathologies: loadPathologiesCheckDetails(data?.stomatognathicTest?.details),
      pathologiesDescription: data?.stomatognathicTest?.description || "",

    })
  }, [data])

  /**
  * 
  * @param {{id:number,disease_id:number,fam_id:number}} detail 
  */
  const loadFamilyCheckDetails = (details) => {
    if (!details) return []
    return details.map(detail => detail.disease_id)
  }

  const loadFamilyHistoryCheckBoxes = (diseaseList) => {
    let checkboxes = []
    if (!diseaseList) return "No se pudo cargar los antecedentes"
    checkboxes = diseaseList.map((disease) => {
      return (
        <Row key={disease.id}>
          <Checkbox
            value={disease.id}
          >
            {disease.name}
          </Checkbox>
        </Row>
      )
    })
    return checkboxes
  }

  /**
  * 
  * @param {{id:number,pat_id:number,fam_id:number}} detail 
  */
  const loadPathologiesCheckDetails = (details) => {
    if (!details) return []
    return details.map(detail => detail.pat_id)
  }

  const loadPathologiesCheckBoxes = (pathologies) => {
    let checkboxes = []
    if (!pathologies) return "No se pudo cargar las patologias"
    checkboxes = pathologies.map((pat) => {
      return (
        <Row key={pat.id}>
          <Checkbox value={pat.id}>{pat.name}</Checkbox>
        </Row>
      )
    })
    return checkboxes
  }

  return (
    <>
      <div>
        <div className='w-100'>
          <h5 className='mb-4'>Antecedentes personales y familiares </h5>
          <Form
            form={form}
            layout='vertical'
            initialValues={initialForm}
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Describir los antecedentes" name="familyHistoryDescription">
                  <TextArea rows={4} maxLength={300} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Seleccione los antecedentes" name="selectedFamilyHistory" >
                  <Checkbox.Group>
                    {
                      loadFamilyHistoryCheckBoxes(data?.diseaseList)
                    }
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Describir las patologías" name="pathologiesDescription">
                  <TextArea rows={4} maxLength={300} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="selectedPathologies" label="Selecciones las patologias">
                  <Checkbox.Group>
                    {
                      loadPathologiesCheckBoxes(data?.pathologies)
                    }
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  )
})
