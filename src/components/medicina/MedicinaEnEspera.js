import React, { useContext, useEffect, useState } from 'react'
import MedicineService from 'services/MedicineService'
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';
import { CustomSearch } from 'components/CustomSearch';
import { Button, Space, Table } from 'antd';
import { FileAddOutlined, DeleteOutlined } from '@ant-design/icons'
import { ModalQrReader } from 'components/caja/ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';
import { useNavigate } from 'react-router-dom';

export const MedicinaEnEspera = () => {
  const navigate = useNavigate()
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { visible } = useContext(QRModalContext)
  //Other hooks
  const { closeModal } = useDeleteModal()
  //States
  const initialData = [];
  const [data, setData] = useState(initialData)
  const [filterText, setFilterText] = useState("")

  /**
   * Elimina un registro de medicina dado su nurId
   * @param {number} nurId 
   */
  const deleteRecord = async (nurId) => {
    try {
      await MedicineService.deletePatientOfQueue(nurId)
      loadPatientQueue()
      closeModal()
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ? error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }

  }

  /**
   * Carga los pacientes que estan en espera en el area de medicina
   */
  const loadPatientQueue = async () => {
    try {
      let data = await MedicineService.getPatientQueue()
      console.log(data)
      setData(data.map(item => {
        return {
          key: item.appo_id,
          ...item
        }
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: "N° cita",
      dataIndex: "appo_id"
    },
    {
      title: "Paciente",
      dataIndex: "fullname",
      key: "patient",

    },
    {
      title: "Area",
      dataIndex: "area"
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
      title: "Acciones",
      render: (_, record) => {
        const onClick = () => {
          navigate(`${record.nur_id}/nuevo`)
        }
        return (
          <Space>
            <Button type='primary' onClick={onClick}><FileAddOutlined /></Button>
            <Button type='primary' danger onClick={() => deleteRecord(record.appo_id)}><DeleteOutlined /></Button>
          </Space>
        )
      }
    }
  ]

  /**
   * Handler para recargar los pacientes en espera
   */
  const handleReload = () => {
    loadPatientQueue()
  }

  const onSearch = (identification) => {
    let index = data.findIndex(item => item.identification === identification)
    if (index >= 0) {
      setFilterText(identification)
    }else{
      
    }
  }

  useEffect(() => {
    loadPatientQueue()
  }, [])

  return (
    <>
      <div className='w-100 p-4'>
        <h1 className='text-center'>Area de medicina</h1>
        <CustomSearch
          onSearch={onSearch}
          allowClear
          placeholder={"Buscar paciente por número de cédula"}

        />
        <Table
          columns={columns}
          dataSource={
            data.filter(row => row.identification.includes(filterText))
          }
          pagination
        />
      </div>
      {
        visible && <ModalQrReader
          handleSearch={onSearch}
        />
      }
    </>
  )
};
