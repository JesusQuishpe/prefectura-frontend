import React, { useContext, useEffect, useState } from 'react';
import PruebaService from 'services/PruebaService';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ToastContext from '../../../contexts/ToastContext';
import Select from 'react-select'
import GrupoService from 'services/GrupoService';
import UnidadService from 'services/UnidadService';
import { getOperandosDeFormula } from 'utils/utilidades';
import LoaderContext from 'contexts/LoaderContext';
import CalculatorIcon from 'assets/png/calculator.png'
import { ModalFormula } from './ModalFormula';

/**
 * Convierte la data en un objeto aceptable para el select
 * @param {object} data 
 * @returns Array
 */
const optionsFun = (data) => {
  let opts = []
  opts = data.map((item) => {
    return {
      value: item.id,
      label: item.name + " 🠮 " + item.area.name,
    }
  })
  return opts
}

/**
 * Convierte la data en un objeto aceptable para el select segun el criterio pasado
 * @param {object} data 
 * @param {callback} criterio 
 * @returns Array
 */
const convertirDatosParaSelect = (data, criterio) => {
  let opts = []

  let dataConverted = data.map((item) => {
    return criterio(item)
  })
  opts = [{ value: -1, label: "Sin definir" }, ...dataConverted]
  return opts
}

export const PruebaForm = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  //Other hooks
  const { idPrueba } = useParams()
  //States
  const [options, setOptions] = useState([])
  const [unidades, setUnidades] = useState([])
  const initialForm = {
    selected_group: null,
    selected_measure: null,
    code: "",
    name: "",
    ref_value: "",
    operator_type: "Rango",
    of: "",
    until: "",
    operator_value: "",
    interpretation: "",
    male_of: "",
    male_until: "",
    male_interpretation: "",
    female_of: "",
    female_until: "",
    female_interpretation: "",
    qualitative_value: "",
    price: "",
    is_numeric: false,
    formula: "",
    notes: ""
  }
  const [form, setForm] = useState(initialForm)
  const [showModalFormula, setShowModalFormula] = useState(false)

  const isEdit = idPrueba ? true : false

  /**
   * Handler para actualizar los valores del formulario
   * @param {Event} e 
   */
  const handleForm = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name === "ref_value") {
      const newForm = { ...form }
      if (value === "S") {
        newForm.interpretation = ""
        newForm.of = ""
        newForm.until = ""
        newForm.operator_value = ""
        newForm.qualitative_value = ""
      }
      if (value === "C") {
        newForm.interpretation = ""
        newForm.of = ""
        newForm.until = ""
        newForm.operator_value = ""
        newForm.male_of = ""
        newForm.male_until = ""
        newForm.female_of = ""
        newForm.female_until = ""
        newForm.female_interpretation = ""
        newForm.male_interpretation = ""
      }
      if (value === "M") {
        newForm.male_of = ""
        newForm.male_until = ""
        newForm.female_of = ""
        newForm.female_until = ""
        newForm.female_interpretation = ""
        newForm.male_interpretation = ""
        newForm.qualitative_value = ""
        newForm.interpretation = ""
      }
      setForm({
        ...newForm,
        [name]: value,
        is_numeric: value === "M" || value === "S" ? true : false
      })
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }

  }

  /**
   * Handler para actualizar el valor del check del formulario
   * @param {Event} e 
   */
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setForm({
      ...form,
      [name]: checked
    });
  }

  /**
   * Carga los datos de la prueba por su id
   * @param {number} id idenficador unico de la prueba
   */
  const getTestById = async (id) => {
    let test = await PruebaService.getPrueba(id);
    console.log(test);
    setForm({
      selected_group: { value: test.group.id, label: test.group.name + " 🠮 " + test.group.area.name },
      selected_measure: test.measurement ?
        { value: test.measurement.id, label: test.measurement.abbreviation } :
        { value: -1, label: "Sin definir" },
      code: test.code,
      name: test.name,
      ref_value: test.ref_value,
      operator_type: test.operator_type,
      of: test.of,
      until: test.until,
      operator_value: test.operator_value,
      interpretation: test.interpretation,
      male_of: test.male_of,
      male_until: test.male_until,
      male_interpretation: test.male_interpretation,
      female_of: test.female_of,
      female_until: test.female_until,
      female_interpretation: test.female_interpretation,
      qualitative_value: test.qualitative_value,
      price: test.price,
      is_numeric: test.is_numeric === 1 ? true : false,
      formula: test.formula ?? "",
      notes: test.notes
    });
    //setAreaSeleccionada({ value: test.area.id, label: test.area.name })
  }

  /**
   * Carga todos los grupos de laboratorio en el select de grupo del formulario
   */
  const getGrupos = async () => {
    let gruposFromService = await GrupoService.getGrupos()
    setOptions(optionsFun(gruposFromService))
  }
  /**
    * Carga todas las unidades de medida de laboratorio en el select de medidas del formulario
    */
  const getUnidades = async () => {
    let unidadesFromService = await UnidadService.getUnidades()
    //console.log(unidadesFromService);
    setUnidades(convertirDatosParaSelect(unidadesFromService, item => ({ value: item.id, label: item.abbreviation })))
  }

  useEffect(() => {
    getGrupos()
    getUnidades()
    if (isEdit) {
      getTestById(idPrueba);
    }
  }, [])

  /**
   * Handler para el select grupo del formulario
   * @param {{label,value}} selected valor seleccionado del select 
   */
  const handleSelectGrupo = (selected) => {
    setForm({ ...form, selected_group: selected })
  }
  /**
    * Handler para el select unidades de medida del formulario
    * @param {{label,value}} selected valor seleccionado del select 
    */
  const handleSelectUnidad = (selected) => {
    setForm({ ...form, selected_measure: selected })
  }

  /**
   * Crea o actualiza la prueba en la BD
   * @param {Event} e 
   * @returns 
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!form.code || !form.name || !form.selected_group || !form.ref_value) {
        return alert("Debe completar los campos obligatorios")
      }

      if (form.ref_value === "M") {
        if (form.operator_type === "Rango") {
          if (!form.of || !form.until) {
            return alert("Debe completar los valores para el rango")
          }
        } else {
          if (!form.operator_value) {
            return alert("Complete el campo valor de tipo matemático")
          }
        }
      }

      if (form.ref_value === "C") {
        if (!form.operator_value) {
          return alert("Debe completar el valor cualitativo")
        }
      }

      if (form.ref_value === "S") {
        if (!form.male_of || !form.male_until || !form.female_of || !form.female_until) {
          return alert("Debe completar los valores para ambos géneros")
        }
      }
      if (!form.price) {
        return alert("Establesca un precio para la prueba")
      }
      openLoader(isEdit ? "Actualizando datos..." : "Creando prueba...")
      let operands = getOperandosDeFormula(form.formula)
      console.log(operands);
      if (!isEdit) {
        await PruebaService.crearPrueba({ ...form, operands })
        setForm(initialForm)
      } else {
        await PruebaService.actualizarPrueba({ ...form, id: idPrueba, operands })
      }
      closeLoader()
      openToast(isEdit ? "Prueba actualizada" : "Prueba creado", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  /**
   * Cierra el modal formula
   */
  const closeModalFormula = () => { setShowModalFormula(false) }
  
  /**
   * Actualiza el valor de la formula en el formulario
   * @param {string} formula 
   */
  const saveFormula = (formula) => { setForm({ ...form, formula }) }

  return (
    <div className='p-4'>
      <Container className='w-75 mx-auto'>
        <h3 className='my-3 text-center mb-4'>{isEdit ? "ACTUALIZAR PRUEBA" : "NUEVA PRUEBA"}</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="code">
            <Form.Label column sm={4} className='text-start'>
              Código <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" name='code' value={form.code} onChange={handleForm} />
              <Form.Text className="text-muted" >
                Max. 20 caracteres
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="name">
            <Form.Label column sm={4} className='text-start'>
              Nombre <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name='name' value={form.name} onChange={handleForm} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={4}>
              Grupo <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Select
                options={options}
                placeholder="Seleccione un grupo"
                value={form.selected_group}
                onChange={handleSelectGrupo}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 2,
                  }),
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={4}>
              Unidad de medida:
            </Form.Label>
            <Col sm={8}>
              <Select
                options={unidades}
                placeholder="Seleccione una unidad de medida"
                value={form.selected_measure}
                onChange={handleSelectUnidad}
                styles={{
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 2,
                  }),
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Form.Label column sm={4}>Valores de referencia <span className='text-danger'>*</span> :</Form.Label>
            <Col sm={8}>
              <Form.Select name='ref_value' value={form.ref_value} onChange={handleForm}>
                <option value={""}>--Seleccione el valor de referencia--</option>
                <option value={"M"}>Matemático</option>
                <option value={"C"}>Cualitativo</option>
                <option value={"S"}>Sexo</option>
              </Form.Select>
            </Col>
          </Form.Group>
          {
            form.ref_value === "M" ?
              <Form.Group as={Row} className='mb-3 pb-3 border-bottom'>
                <Col sm={4} />
                <Col>
                  <Row className='mb-3'>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='Menor que'
                        name='operator_type'
                        id='less_than'
                        value={'<'}
                        checked={form.operator_type === "<"}
                        onChange={handleForm}
                      />

                    </Col>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='Mayor que'
                        name='operator_type'
                        id='greater_than'
                        value={'>'}
                        checked={form.operator_type === ">"}
                        onChange={handleForm}
                      />

                    </Col>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='Igual a'
                        name='operator_type'
                        id='equals_to'
                        value={'='}
                        checked={form.operator_type === "="}
                        onChange={handleForm}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        type='radio'
                        label='Rango'
                        name='operator_type'
                        id='range'
                        value={'Rango'}
                        checked={form.operator_type === "Rango"}
                        onChange={handleForm}
                      />
                    </Col>
                  </Row>
                  {
                    form.operator_type === '<' ||
                      form.operator_type === '>' ||
                      form.operator_type === '='
                      ?
                      <div>
                        <Form.Label>Valor <span className='text-danger'>*</span> :</Form.Label>
                        <Form.Control type='number' name='operator_value' value={form.operator_value} onChange={handleForm} />
                        <Form.Label>Interpretación</Form.Label>
                        <Form.Control type='text' name='interpretation' value={form.interpretation} onChange={handleForm} />
                      </div>
                      :
                      <>
                        <Row>
                          <Col>
                            <Form.Label>De <span className='text-danger'>*</span> :</Form.Label>
                            <Form.Control type='number' name='of' value={form.of} onChange={handleForm} />
                          </Col>
                          <Col>
                            <Form.Label>Hasta <span className='text-danger'>*</span> :</Form.Label>
                            <Form.Control type='number' name='until' value={form.until} onChange={handleForm} />
                          </Col>
                        </Row>
                        <Form.Label>Interpretación</Form.Label>
                        <Form.Control type='text' name='interpretation' value={form.interpretation} onChange={handleForm} />
                      </>
                  }

                </Col>

              </Form.Group>
              :
              form.ref_value === "C" ?
                <Form.Group as={Row} className='mb-4 pb-3 border-bottom'>
                  <Col sm={4} />
                  <Col>
                    <Form.Label column sm={4}>Valor cualitativo <span className='text-danger'>*</span> :</Form.Label>
                    <Col>
                      <Form.Control type='text' name='qualitative_value' onChange={handleForm} value={form.qualitative_value} />
                    </Col>
                    <Form.Label column sm={4}>Interpretación</Form.Label>
                    <Col>
                      <Form.Control type='text' name='interpretation' onChange={handleForm} value={form.interpretation} />
                    </Col>
                  </Col>
                </Form.Group>
                :
                form.ref_value === "S" ?
                  <Form.Group className='mb-4 pb-3 border-bottom'>
                    <Row>
                      <Col sm={2}><Form.Label>Sexo</Form.Label></Col>
                      <Col><Form.Label>De <span className='text-danger'>*</span> :</Form.Label></Col>
                      <Col><Form.Label>Hasta <span className='text-danger'>*</span> :</Form.Label></Col>
                      <Col><Form.Label>Interpretación</Form.Label></Col>
                    </Row>
                    <Row>
                      <Col sm={2}><Form.Control type='text' name='male_gender' defaultValue={"M"} readOnly /></Col>
                      <Col><Form.Control type='number' name='male_of' onChange={handleForm} value={form.male_of} /></Col>
                      <Col><Form.Control type='number' name='male_until' onChange={handleForm} value={form.male_until} /></Col>
                      <Col><Form.Control type='text' name='male_interpretation' onChange={handleForm} value={form.male_interpretation} /></Col>
                    </Row>
                    <Row>
                      <Col sm={2}><Form.Label>Sexo</Form.Label></Col>
                      <Col><Form.Label>De <span className='text-danger'>*</span> :</Form.Label></Col>
                      <Col><Form.Label>Hasta <span className='text-danger'>*</span> :</Form.Label></Col>
                      <Col><Form.Label>Interpretación</Form.Label></Col>
                    </Row>
                    <Row>
                      <Col sm={2}><Form.Control type='text' name='female_gender' defaultValue={"F"} readOnly /></Col>
                      <Col><Form.Control type='number' name='female_of' onChange={handleForm} value={form.female_of} /></Col>
                      <Col><Form.Control type='number' name='female_until' onChange={handleForm} value={form.female_until} /></Col>
                      <Col><Form.Control type='text' name='female_interpretation' onChange={handleForm} value={form.female_interpretation} /></Col>
                    </Row>
                  </Form.Group>
                  : ""
          }
          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={4}>
              Tipo de valor :
            </Form.Label>
            <Col sm={8}>
              <Form.Check
                id='check-tipo'
                label="Numérico"
                checked={form.is_numeric}
                onChange={handleCheck}
                name='is_numeric'
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formula">
            <Form.Label column sm={4} className='text-start'>
              Fórmula:
            </Form.Label>
            <Col sm={8}>
              <div className='d-flex'>
                <Form.Control type="text" name='formula' value={form.formula} onChange={handleForm} className="me-2" />
                <Button onClick={() => setShowModalFormula(true)} variant="secondary"><img src={CalculatorIcon} width="24px" /></Button>
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm={4} className='text-start'>
              Precio <span className='text-danger'>*</span> :
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="number" name='price' value={form.price} onChange={handleForm} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="price">
            <Form.Label column sm={4} className='text-start'>
              Notas/Indicaciones:
            </Form.Label>
            <Col sm={8}>
              <Form.Control as={"textarea"} name='notes' maxLength={300} value={form.notes} onChange={handleForm} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="acciones">
            <Button
              variant='primary' as={Col} sm={2}
              onClick={handleSubmit}>{isEdit ? "Actualizar" : 'Guardar'}</Button>
          </Form.Group>
        </Form>
      </Container>
      <ModalFormula
        show={showModalFormula}
        saveFormula={saveFormula}
        closeModal={closeModalFormula} />
    </div>
  )
}
