import React, { useContext, useEffect, useMemo, useState } from 'react';
import EstudioService from 'services/EstudioService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Col, Form as FormReact, Row } from 'react-bootstrap';
import ToastContext from 'contexts/ToastContext';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { FcInfo } from 'react-icons/fc'

import MedidaService from 'services/MedidaService';
import DataTable from 'react-data-table-component';
import { FilterComponent } from 'components/FilterComponent';


const paginationConfig = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos"
}

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
    width: "100px"
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true
  },
];



export const EstudioForm = () => {
  const { idEstudio } = useParams();
  const isEdit = idEstudio ? true : false;
  const { openToast } = useContext(ToastContext);



  const initialForm = {
    clave: "",
    nombre: "",
    tipo: false,
    indicaciones: "",
    id_unidad: "-1"
  }

  const [form, setForm] = useState(initialForm);
  const [medidas, setMedidas] = useState([]);
  const [estudios, setEstudios] = useState([])
  const [estudiosSeleccionados, setEstudiosSeleccionados] = useState([]);

  const getEstudios = async () => {
    let estudiosFromService = await EstudioService.getEstudiosIndividuales()
    setEstudios(estudiosFromService)
  }

  const crearEstudio = async (estudio) => {
    try {
      await EstudioService.crearEstudio(estudio)
      openToast("Registro creado", true);
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.sql_code === 1062) {
        openToast("La clave ya existe", false);
        return;
      }
      openToast("No se pudo crear el registro", false);
    }
  }

  const actualizarEstudio = async (valores) => {
    try {
      await EstudioService.actualizarEstudio({ id: idEstudio, ...valores })
      openToast("Registro actualizado", true);
    } catch (error) {
      openToast("No se pudo actualizar el registro", false);
      console.log(error);
    }

  }

  const getEstudioById = async (id) => {
    let estudio = await EstudioService.getEstudio(id)
    console.log(estudio);
    let { nombre, clave, indicaciones, id_unidad } = estudio;
    console.log(nombre);
    setForm({ nombre, clave, indicaciones, id_unidad: id_unidad ?? "-1" });
  }

  const getMedidas = async () => {
    let medidas = await MedidaService.getMedidas()
    setMedidas(medidas)
  }

  const handleUpperCase = (e, setFieldValue) => {
    let value = e.target.value || ""
    setFieldValue(e.target.name, value.toUpperCase())
  }

  const handleRowSelected = React.useCallback((state) => {
    setEstudiosSeleccionados(state.selectedRows.slice().reverse())
  }, []);

  useEffect(() => {
    if (isEdit) {
      getEstudioById(idEstudio);
    }
    getEstudios()
    getMedidas()
  }, []);
  //Configuracion para filtrar en DataTable
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = estudios.filter(
    item => item.nombre && item.nombre.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        placeholder="Buscar estudio por nombre"
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <div className='w-75 mx-auto mt-4'>
        <h2 className='mb-4'>{isEdit ? "Editar estudio" : "Nuevo estudio"}</h2>
        <Formik
          enableReinitialize
          initialValues={
            form
          }
          /*validate={
            (values) => {
              const errors = {};
              if (!values.nombre) errors.nombre = "El campo es requerido";
              if (!values.indicaciones) errors.indicaciones = "El campo es requerido";

              if (values.valor_referencia === "Cualitativo") {
                if (!values.cualitativo_valor) errors.cualitativo_valor = "El campo es requerido";

              }

              if (values.valor_referencia === "Rango") {
                if (errors.cualitativo_valor) console.log("SI HAY");
                if (!values.de) errors.de = "El campo es requerido";
                if (!values.hasta) errors.hasta = "El campo es requerido";
                if(!values.interpretacion) errors.interpretacion="El campo es requerido";
              }

              return errors;
            }
          }*/
          validationSchema={
            Yup.object({
              clave: Yup.string().required('El campo es requerido'),
              nombre: Yup.string().required('El campo es requerido'),
            })
          }

          onSubmit={async (valores, { resetForm }) => {
            let json = { ...valores, estudios: estudiosSeleccionados.slice() }
            console.log(json);
            if (!isEdit) {
              await crearEstudio(json);
              //resetForm({ values: initialForm });
            } else {
              await actualizarEstudio(json);
            }
          }}
        >
          {
            ({ errors, touched, values, setFieldValue, handleChange }) => (
              <Form id='form-estudio'>
                <FormReact.Group className='mb-4 w-25'>
                  <FormReact.Label>Clave:</FormReact.Label>
                  <Field
                    name="clave"
                    className={`form-control ${touched.clave && errors.clave && 'error'}`}
                    type="text" maxLength={10}
                    onChange={(e) => handleUpperCase(e, setFieldValue)}
                  />
                  <ErrorMessage name='clave' component={() => (<FormReact.Text className="text-danger">{errors.clave}</FormReact.Text>)} />
                </FormReact.Group>
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Nombre del estudio:</FormReact.Label>
                  <Field
                    name="nombre"
                    className={`form-control ${touched.nombre && errors.nombre && 'error'}`}
                    type="text"
                    onChange={(e) => handleUpperCase(e, setFieldValue)}
                  />
                  <ErrorMessage name='nombre' component={() => (<FormReact.Text className="text-danger">{errors.nombre}</FormReact.Text>)} />
                </FormReact.Group>
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Tipo:</FormReact.Label>
                  <FormReact.Check
                    name="tipo"
                    type='checkbox'
                    label='Individual'
                    id='tipo'
                    checked={values.tipo}
                    onChange={(e)=>{
                      if(!e.target.checked) setFieldValue('id_unidad',"-1")
                      handleChange(e)
                    }}
                  />
                </FormReact.Group>
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>Indicaciones:</FormReact.Label>
                  <Field
                    name="indicaciones"
                    className={`form-control ${touched.indicaciones && errors.indicaciones && 'error'}`}
                    as="textarea"
                    maxLength={300}
                  />
                </FormReact.Group>
                {
                  !values.tipo &&
                  (
                    <>
                      <FormReact.Label>Agregar estudios</FormReact.Label>
                      <Row>
                        <Col >
                          <DataTable
                            columns={columns}
                            data={estudiosSeleccionados}
                            title={'Estudios seleccionados'}
                            pagination
                            paginationComponentOptions={paginationConfig}
                            dense
                          />
                        </Col>
                        <Col >
                          <DataTable
                            columns={columns}
                            data={filteredItems}
                            title={'Estudios disponibles'}
                            pagination
                            paginationComponentOptions={paginationConfig}
                            selectableRows
                            onSelectedRowsChange={handleRowSelected}
                            dense
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                            
                          />
                        </Col>
                      </Row>
                    </>
                  )
                }

                {/*<div className='d-flex align-items-center mb-2'>
                  <span className='me-4'>Valor de referencia</span>
                  <FcInfo size={18} />
                </div>
                <div className='border px-4 py-2 mb-4'>
                  <div className='d-flex mb-2'>
                    <div className='d-flex align-items-center me-4 mt-1'>
                      <Field
                        type="radio"
                        name="valor_referencia"
                        value="Cualitativo"
                        id="Cualitativo"
                        className="me-1"

                      />
                      <label htmlFor='Cualitativo'>Cualitativo</label>
                    </div>
                    <div className='d-flex align-items-center me-4 mt-1'>
                      <Field
                        type="radio"
                        name="valor_referencia"
                        value="Rango"
                        id="Rango"
                        className="me-1"
                      />
                      <label htmlFor='Rango'>Rango</label>
                    </div>
                  </div>
                  {
                    values.valor_referencia === "Cualitativo" ?
                      (<FormReact.Group className='mb-4'>
                        <FormReact.Label>Nombre:</FormReact.Label>
                        <Field name="cualitativo_valor" className={`form-control ${touched.cualitativo_valor && errors.cualitativo_valor && 'error'}`} type="text" />
                        <ErrorMessage name='cualitativo_valor' component={() => (<FormReact.Text className="text-danger">{errors.cualitativo_valor}</FormReact.Text>)} />
                      </FormReact.Group>)
                      :
                      (
                        <>
                          <Row>
                            <Col>
                              <FormReact.Group className='mb-4'>
                                <FormReact.Label>De:</FormReact.Label>
                                <Field name="de" className={`form-control ${touched.de && errors.de && 'error'}`} type="text" />
                                <ErrorMessage name='de' component={() => (<FormReact.Text className="text-danger">{errors.de}</FormReact.Text>)} />
                              </FormReact.Group>
                            </Col>
                            <Col>
                              <FormReact.Group className='mb-4'>
                                <FormReact.Label>Hasta:</FormReact.Label>
                                <Field name="hasta" className={`form-control ${touched.hasta && errors.hasta && 'error'}`} type="text" />
                                <ErrorMessage name='hasta' component={() => (<FormReact.Text className="text-danger">{errors.hasta}</FormReact.Text>)} />
                              </FormReact.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormReact.Group className='mb-4'>
                                <FormReact.Label>Interpretacion:</FormReact.Label>
                                <Field name="interpretacion" className={`form-control ${touched.interpretacion && errors.interpretacion && 'error'}`} type="text" />
                                <ErrorMessage name='interpretacion' component={() => (<FormReact.Text className="text-danger">{errors.interpretacion}</FormReact.Text>)} />
                              </FormReact.Group>
                            </Col>
                          </Row>
                        </>
                      )
                  }
                </div>*/}
                <FormReact.Group className='mb-4'>
                  <FormReact.Label>
                    Unidades de medida:
                  </FormReact.Label>
                  <Col>
                    <Field
                      name="id_unidad"
                      as="select"
                      className={`form-select ${touched.id_unidad && errors.id_unidad && 'error'}`}
                      disabled={!values.tipo}
                    >
                      <option value="-1">Sin definir</option>
                      {
                        medidas ? medidas.map((medida) => {
                          return (
                            <option key={medida.id} value={medida.id}>{medida.abreviatura}</option>
                          )
                        }) : ""
                      }
                    </Field>
                    <ErrorMessage name='id_unidad' component={() => (<FormReact.Text className="text-danger">{errors.id_unidad}</FormReact.Text>)} />
                  </Col>
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
