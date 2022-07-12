import ToastContext from 'contexts/ToastContext';
import { useUser } from 'hooks/useUser';
import React, { useState, useRef, useContext, useEffect, useMemo, useCallback } from 'react'

import QRCode from 'react-qr-code';
import PatientService from 'services/PatientService';
import { AiFillDelete } from 'react-icons/ai';
//import { MyDocumentQR } from './MyDocumentQR';
import LoaderContext from 'contexts/LoaderContext';
import CajaService from 'services/CajaService';
import { Link } from 'react-router-dom';
import {
  Button, Alert, Form, 
  Row, 
  Space,
} from 'antd';

import { FolderOutlined} from '@ant-design/icons'
import AreaService from 'services/AreaService';
import CardPaciente from './CardPaciente';
import CardNuevaCita from './CardNuevaCita';
import TestTable from './TestTable';
import { TestTree } from './TestTree';
import { ModalQrReader } from './ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';
import { CustomSearch } from 'components/CustomSearch';


const AREA_PRICES = {
  "Medicina": 20,
  "Odontologia": 2,
  "Laboratorio": 0,
  "Pediatria": 0,
  "Ginecologia": 0,
  "Reumatologia": 0,
  "Dermatologia": 0,
  "Terapia Energetica": 0,
  "Terapia Fisica": 0,
  "Terapia Respiratoria": 0,
  "Cardiologia": 0,
  "Alergologia": 0,
  "Psicologia": 0,
  "Inyeccion": 0,
  "Curacion": 0,
  "Presion Arterial": 0,
  "Ecografia": 0,
}

const MyActions = ({ deleteRecord, data }) => {
  const handleDeleteClick = () => {
    deleteRecord(data.id)
  }
  return (
    <div className='d-flex flex-nowrap'>
      <Button variant='danger' type='button' onClick={handleDeleteClick}><AiFillDelete /></Button>
    </div>
  )
}

function NuevaCita() {
  //Custom hook
  const { user } = useUser()
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { openLoader, closeLoader } = useContext(LoaderContext)
  const { visible } = useContext(QRModalContext)
  //States
  const [form] = Form.useForm()
  const [showLaboratorioInfo, setShowLaboratorioInfo] = useState(false)
  const [hiddenAlert, setHiddenAlert] = useState(true);
  const [defaultTreeData, setDefaultTreeData] = useState([])
  //const [showPdfQr, setShowPdfQr] = useState(false)
  const [showPatientNotFoundAlert, setShowPatientNotFoundAlert] = useState(false)
  const [patient, setPatient] = useState({})
  const [testsOfPatient, setTestsOfPatient] = useState([])
  const [searchValue, setSearchValue] = useState('');


  const loadAreas = async () => {
    let areas = await AreaService.getAreas()
    console.log(areas)
    let areasMapped = areas.map(area => {
      return {
        title: area.name,
        key: `area-${area.id}`,
        icon: <FolderOutlined />,
        children: area.groups.map(group => {
          return {
            title: group.name,
            key: `group-${group.id}`,
            icon: <FolderOutlined />,
            children: group.tests.map(test => {
              return {
                id: test.id,
                code: test.code,
                price: test.price,
                title: test.name,
                key: `test-${test.id}`
              }
            })
          }
        })
      }
    })
    setDefaultTreeData(areasMapped)
  }

  const treeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const title = searchValue && item.title.toLowerCase().includes(searchValue.toLowerCase()) ? (
          <span className="bg-warning">{item.title}</span>
        ) : (<span>{item.title}</span>)

        if (item.children) {
          return {
            id: item.id,
            icon: <FolderOutlined />,
            title,
            key: item.key,
            children: loop(item.children),
            code: item.code,
            price: item.price
          };
        }

        return {
          id: item.id,
          title,
          key: item.key,
          code: item.code,
          price: item.price
        };
      });

    return loop(defaultTreeData);
  }, [searchValue, defaultTreeData])

  /**
   * Handler para buscar el paciente por cedula
   * @param {Event} e 
   */
  const handleSearch = async (identification) => {
    try {
      if (!identification) return
      openLoader("Buscando...")
      let patient = await PatientService.getPatientByIdentification(identification)
      setPatient({
        patient_id: patient.id,
        identification_number: patient.identification_number,
        name: patient.name,
        lastname: patient.lastname,
        birth_date: patient.birth_date,
        gender: patient.gender,
        cellphone_number: patient.cellphone_number,
        address: patient.address,
      })
      closeLoader()
    } catch (error) {
      closeLoader()
      console.log(error.response);
      if (error.response.status === 404) {
        setHiddenAlert(false);
      } else {
        openToast("Ha ocurrido un error", false)
      }
    }
  }

  /**
   * Guarda la cita y las pruebas seleccionadas en caso del area Laboratorio
   * @param {Event} e
   * @returns 
   */
  const save = useCallback(
    async (values) => {
      try {
        console.log(values);
        if (!patient.patient_id) {
          setShowPatientNotFoundAlert(true)
          return
        }
        openLoader("Guardando cita...")
        //console.log(user);
        await CajaService.saveCita({
          ...values,
          identification_number: patient.identification_number,
          patient_id: patient.patient_id,
          user_id: user.id,
          tests: testsOfPatient
        })
        form.resetFields()
        setTestsOfPatient([])
        closeLoader()
        openToast("Cita creada correctamente", true)
      } catch (error) {
        console.log(error);
        closeLoader()
        let message = error.response.data.message ? error.response.data.message :
          error.response.data.exception_message
        openToast(message, false)
      }
    },
    [patient, testsOfPatient],
  )

  useEffect(() => {
    loadAreas()
  }, [])

  const addTest = useCallback(
    (testParam) => {
      let index = testsOfPatient.findIndex(test => test.key === testParam.key)
      let newTests = [...testsOfPatient, testParam]
      console.log(newTests);
      if (index < 0) {
        let total = newTests.reduce((acc, current) => {
          return acc + current.price
        }, 0)
        console.log(total);
        let values = form.getFieldsValue()
        form.setFieldsValue({ ...values, value: total })
        setTestsOfPatient(newTests)
      }
    },
    [form, testsOfPatient],
  )

  const deleteTest = useCallback(
    (testKey) => {
      let newTests = testsOfPatient.filter(test => test.key !== testKey)
      let total = newTests.reduce((acc, current) => {
        return acc + current.price
      }, 0)
      let values = form.getFieldsValue()
      form.setFieldsValue({ ...values, value: total })
      setTestsOfPatient(newTests)
    },
    [form, testsOfPatient],
  )

  const onNodeClick = useCallback(
    (e, node) => {
      console.log(e, node);
      const { id, key, code, title, price, children } = node
      if (typeof children === "undefined" && showLaboratorioInfo)
        addTest({ id, key, code, name: title.props.children, price })
    },
    [addTest, showLaboratorioInfo],
  )


  /**
   * 
   * @param {string} code es el numero de cedula del paciente
   */
  const searchByQR = async (code) => {
    try {
      if (!code) return
      openLoader("Buscando...")
      let patient = await PatientService.getPatientByIdentification(code)
      setPatient({
        patient_id: patient.id,
        identification_number: patient.identification_number,
        name: patient.name,
        lastname: patient.lastname,
        birth_date: patient.birth_date,
        gender: patient.gender,
        cellphone_number: patient.cellphone_number,
        address: patient.address,
      })
      closeLoader()
    } catch (error) {
      closeLoader()
      console.log(error.response);
      if (error.response.status === 404) {
        setHiddenAlert(false);
      } else {
        setHiddenAlert(false);
      }
    }
  }
  return (
    <>
      {
        <div className='p-4'>
          <div>
            <h3 className='fw-bold'>NUEVA CITA</h3>
            <Row justify='end' style={{ marginBottom: 20 }}>
              <Space>
                <Link
                  to={"/pacientes/nuevo"}
                >
                  <Button type='primary'>Nuevo paciente</Button>
                </Link>
                <Button
                  type='default'
                  htmlType='submit'
                  form="form-citas"
                >Crear cita</Button>
              </Space>
            </Row>

            <CustomSearch
              onSearch={handleSearch}
              allowClear
              placeholder={"Buscar paciente"}
            />
            {!hiddenAlert && <Alert
              type='error'
              message="No existe el paciente"
              showIcon
              closable
              onClose={() => setHiddenAlert(true)}
            />}
            {showPatientNotFoundAlert && <Alert
              type='error'
              message="Debe buscar un paciente para poder crear la cita"
              showIcon
              closable
              onClose={() => setShowPatientNotFoundAlert(false)}
            />}
          </div>

          <Row style={{ marginTop: "20px", marginBottom: "20px" }} gutter={20}>
            <CardPaciente patient={patient} />
            <CardNuevaCita
              enableTest={setShowLaboratorioInfo}
              form={form}
              onSubmit={save} />
          </Row>
          <Row gutter={20}>
            <TestTree
              defaultTreeData={defaultTreeData}
              treeData={treeData}
              showLaboratorioInfo={showLaboratorioInfo}
              onNodeClick={onNodeClick}
              setSearchValue={setSearchValue}
            />
            <TestTable
              testsOfPatient={testsOfPatient}
              deleteTest={deleteTest} />
          </Row>
          {
            visible && <ModalQrReader
              handleSearch={searchByQR}
            />
          }
        </div>
      }
    </>
  )
}

export default NuevaCita
