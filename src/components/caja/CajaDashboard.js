import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CajaService from 'services/CajaService';
import 'css/ReactDataTableStyles.css'

import ToastContext from 'contexts/ToastContext';
import {
  Button, Card, Col, DatePicker,
  Divider, Form, Popconfirm, Row, Select,
  Table, Tag
} from 'antd';
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons'
import { CustomSearch } from 'components/CustomSearch';
import { ModalQrReader } from './ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';

const { Option } = Select


const mapData = (citasDB) => {
  return {
    data: citasDB.data.map(cita => {
      const { id, fullname, date, hour, attended, area } = cita
      return {
        key: `cita-${cita.id}`,
        id,
        fullname,
        date,
        hour,
        area,
        attended
      }
    }),
    total: citasDB.total
  }
}

export const CajaDashboard = () => {
  const { visible } = useContext(QRModalContext)
  const [citas, setCitas] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { openToast } = useContext(ToastContext)
  const [form] = Form.useForm()
  const identificationInputRef = useRef(null)
  const [loading, setLoading] = useState(false);


  const handleDelete = useCallback(
    async (citaId) => {
      try {
        setConfirmLoading(true);
        await CajaService.deleteCita(citaId)
        setConfirmLoading(false);
        loadCitas({
          ...form.getFieldsValue(),
          identification: identificationInputRef.current?.value,
          page
        })
      } catch (error) {
        setConfirmLoading(false);
        openToast("Ha ocurrido un error", false)
        console.log(error);
      }

    },
    [form, page],
  )


  const columns = useMemo(
    () => [
      {
        title: "N° cita",
        dataIndex: "id",

      },
      {
        title: "Paciente",
        dataIndex: "fullname"
      },
      {
        title: "Fecha",
        dataIndex: "date"
      },
      {
        title: "Hora",
        dataIndex: "hour"
      },
      {
        title: "Area",
        dataIndex: "area"
      },
      {
        title: "Estado",
        render: (_, record) => {
          return <Tag color={record.attended === 1 ? "green" : "red"}>{record.attended === 1 ? "Atendido" : "Pendiente"}</Tag>
        }
      },
      {
        title: 'Acciones',
        dataIndex: 'operation',
        render: (_, record) =>
          <Popconfirm
            title="Está seguro de eliminar?"
            //visible={visible}
            onConfirm={() => handleDelete(record.id)}
            okButtonProps={{
              loading: confirmLoading,
            }}
          //onCancel={() => setVisible(false)}
          >
            <Button type='primary' danger ><DeleteOutlined /></Button>
          </Popconfirm>
      }
    ], [handleDelete, confirmLoading])


  const loadCitas = async (values) => {
    let citas = await CajaService.getCitas(values)
    setCitas(mapData(citas))
  }


  const searchByIdentification = async (identification) => {
    try {
      if (!identification) return
      setLoading(true)
      let { stateFilter, startDate, endDate } = form.getFieldsValue()
      startDate = moment(startDate).format("YYYY-MM-DD")
      endDate = moment(endDate).format("YYYY-MM-DD")

      console.log(stateFilter, startDate, endDate);
      let citasDB = await CajaService.getCitas({ identification, page, startDate, endDate, stateFilter })
      setCitas(mapData(citasDB))
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  const loadFirstTime = async () => {
    setLoading(true)
    let citas = await CajaService.getCitas({
      identification: "", startDate: "", endDate: "",
      stateFilter: "pendientes", page
    })
    console.log(citas);
    setCitas(mapData(citas))
    setLoading(false)
  }

  useEffect(() => {
    loadFirstTime()
  }, [])

  return (
    <>
      {
        <div className='w-100 h-100 p-4'>
          <h2 className='mb-3'>Citas</h2>
          <div className=' d-flex justify-content-between mb-3'>
            <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
          </div>
          <Row gutter={10}>
            <Col span={6}>
              <Card title="Filtros">
                <Form
                  form={form}
                  initialValues={
                    {
                      stateFilter: "pendientes",
                      startDate: null,
                      endDate: null
                    }
                  }
                  layout='vertical'

                >
                  <Form.Item label="Fecha inicial" name="startDate">
                    <DatePicker placeholder='Seleccione fecha' style={{ width: "100%" }} format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item label="Fecha final" name="endDate">
                    <DatePicker placeholder='Seleccione fecha' style={{ width: "100%" }} format="YYYY-MM-DD" />
                  </Form.Item>
                  <Divider />
                  <Form.Item label="Filtrar por estado" name="stateFilter" >
                    <Select
                      placeholder="Seleccione un estado de la cita"
                    >
                      <Option value="pendientes">Pendientes</Option>
                      <Option value="atendidas">Atendidas</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={18}>
              <Row gutter={2}>
                <Col flex={5}>
                  <CustomSearch
                    placeholder="Buscar por número de cédula"
                    allowClear
                    onSearch={searchByIdentification}
                  />
                </Col>
                <Col flex={"none"}>
                  <Button onClick={loadFirstTime}>Recargar</Button>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={citas.data}
                pagination={
                  {
                    total: citas.total,
                    current: page,
                    pageSize: 10,
                    onChange: setPage
                  }
                }
                loading={loading}
              />
            </Col>
          </Row>
          {
            visible && <ModalQrReader
              handleSearch={searchByIdentification}
            />
          }
        </div>

      }
    </>
  );
};
