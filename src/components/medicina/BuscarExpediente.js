import ToastContext from 'contexts/ToastContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Pagination, Row, Space, Table } from 'antd';
import { FileSearchOutlined, DeleteOutlined } from '@ant-design/icons';

import ExpedienteService from 'services/ExpedienteService';
import { CustomSearch } from 'components/CustomSearch';
import { ModalQrReader } from 'components/caja/ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';

const Acciones = ({ row }) => {
  const navigate = useNavigate();

  const verExpediente = () => {
    navigate(`${row.id}`);
  }
  return (
    <Space size={'middle'}>
      <Button type="default" onClick={verExpediente}><FileSearchOutlined style={{ fontSize: '18px' }} /></Button>
      <Button type="primary" danger><DeleteOutlined /></Button>
    </Space>
  )
}

const mapData = (rawData) => {
  return rawData?.map(exp => ({
    key: exp.id,
    id: exp.id,
    identification_number: exp.identification_number,
    fullname: exp.fullname,
    city: exp.city
  }))
}

export const BuscarExpediente = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { visible } = useContext(QRModalContext)
  //States
  const [expedientes, setExpedientes] = useState([]);

  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Cedula",
      dataIndex: "identification_number",
    },
    {
      title: "Paciente",
      dataIndex: "fullname",
    },
    {
      title: "Ciudad",
      dataIndex: "city"
    },
    {
      title: "Acciones",
      render: (_, record) => (
        <Acciones row={record} />
      ),
    }
  ]
  /**
   * Carga los pacientes paginados
   */
  const loadExpedientes = async (page) => {
    console.log("HOLA");
    try {
      setPending(true)
      let expedientes = await ExpedienteService.getExpedientes(page);
      setExpedientes(expedientes)
      console.log(expedientes);
      setPending(false)
    } catch (error) {
      console.log(error);
      openToast("Ha ocurrido un error inesperado...", false)
    }
  }

  /**
   * Carga los pacientes cuando la page del ag-grid cambia
   */
  useEffect(() => {
    console.log("PAGE");
    loadExpedientes(page)
  }, [page]);


  const onSearch = async (identification) => {
    if (!identification) return
    let expedient = await ExpedienteService.getExpedientByIdentification(identification)
    setExpedientes({
      data: expedient ? [{ ...expedient }] : [],
      total: 1
    })
  }

  return (
    <>
      <div className='w-100 p-4 h-100'>
        <h2 className='mb-4'>Expedientes</h2>
        <Row gutter={2}>
          <Col flex={5}>
            <CustomSearch
              placeholder="Buscar por número de cédula"
              allowClear
              onSearch={onSearch}
            />
          </Col>
          <Col flex={"none"}>
            <Button onClick={() => loadExpedientes(1)}>Restablecer</Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={mapData(expedientes.data)}
          pagination={false} />
        {
          expedientes?.data?.length > 0 && <Pagination
            onChange={setPage}
            total={expedientes.total}
            current={page}
            pageSize={10}
          //showSizeChanger
          //onShowSizeChange={onShowSizeChange}
          />
        }
        {
            visible && <ModalQrReader
              handleSearch={onSearch}
            />
          }
      </div>
    </>
  );
}
