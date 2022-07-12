import { MyCustomLoader } from 'components/MyCustomLoader';
import ToastContext from 'contexts/ToastContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import PatientService from 'services/PatientService';
import { Button, Col, Form, Input, Pagination, Popconfirm, Row, Space, Table, Tag } from 'antd';
import { QrcodeOutlined, DeleteOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { END_POINT } from 'utils/conf'
import { CustomSearch } from 'components/CustomSearch';
import QRModalContext from 'contexts/QrModalContext';
import { ModalQrReader } from './ModalQrReader';

const Acciones = ({ record, handleDelete, confirmLoading }) => {
  const navigate = useNavigate();

  const editarClick = () => {
    navigate(`editar/${record.key}`);
  }
  return (
    <Space size={'middle'}>
      <Button type="default" href={END_POINT + `pacientes/${record.id}/qr`} target="_blank"><QrcodeOutlined style={{ fontSize: '18px' }} /></Button>
      <Button type='primary' onClick={editarClick}><AiFillEdit /></Button>
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
    </Space>
  )
}

const mapData = (patients) => {
  console.log(patients);
  return patients?.map(pat => ({
    id: pat.id,
    key: pat.id,
    identification_number: pat.identification_number,
    fullname: pat.fullname,
    city: pat.city
  }))
}

export const PacienteDashboard = () => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { visible } = useContext(QRModalContext)
  //States
  const [patients, setPatients] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);


  const handleDeletePatient = () => {
    console.log("PAciente eliminado");
  }
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
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
        <Acciones record={record} handleDelete={handleDeletePatient} confirmLoading={confirmLoading} />
      ),
    }
  ]
  /**
   * Carga los pacientes paginados
   */
  const loadPatients = async (page) => {
    console.log("HOLA");
    try {
      setPending(true)
      let patientFromService = await PatientService.getPatients(page);
      setPatients(patientFromService)
      console.log(patientFromService);
      setPending(false)
    } catch (error) {
      console.log(error);
      openToast("Ha ocurrido un error inesperado...", false)
      setPending(false)
    }
  }

  /**
   * Carga los pacientes cuando la page del ag-grid cambia
   */
  useEffect(() => {
    console.log("PAGE");
    loadPatients(page)
  }, [page]);

  /**
   * Handler para buscar un paciente por numero de cedula
   */
  const handleSubmit = async (identification) => {
    try {

      if (!identification) return
      let patientFromService = await PatientService.searchByIdentification(identification)
      console.log(patientFromService);
      let patients = []
      patients.push(patientFromService)
      setPatients(patients)
      setIsSearching(true)
    } catch (error) {
      console.log(error);
      openToast("Ha ocurrido un error inesperado...", false)
    }
  }
  /**
   * Handler para cargar todos los pacientes y establecer la page en  1
   */
  const handleShowAllClick = (e) => {
    if (page === 1) {
      loadPatients(1)
    } else {
      setPage(1)
    }
    setIsSearching(false)
  }

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  }

  return (
    <>
      <div className='w-100 p-4 h-100'>
        <h2 className='mb-4'>Pacientes</h2>
        <div className='mb-4'>
          <Link className='btn btn-success' to={"nuevo"}><AiFillFileAdd /> Nuevo</Link>
        </div>
        <Row gutter={2} wrap={false}>
          <Col flex={5}>
            <CustomSearch
              onSearch={handleSubmit}
              placeholder="Buscar por número de cedula"
              allowClear
            />
          </Col>
          <Col flex={"none"}>
            <Button onClick={handleShowAllClick}>Restablecer</Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={isSearching ? mapData(patients) : mapData(patients.data)}
          loading={pending}
          pagination={
            {
              onChange: setPage,
              total: patients?.total,
              current: page,
              pageSize: 10,
            }
          }
        />
        
        {
          visible && <ModalQrReader
            handleSearch={handleSubmit}
          />
        }
      </div>

    </>
  );
}
