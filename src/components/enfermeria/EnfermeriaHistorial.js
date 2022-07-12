import React, { useCallback, useContext, useMemo, useRef, useState } from 'react'
import EnfermeriaService from 'services/EnfermeriaService';
import { useDeleteModal } from 'hooks/useDeleteModal';
import { ModalEnfermeria } from './ModalEnfermeria';
import { Button, Space, Table, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { CustomSearch } from 'components/CustomSearch';
import { ModalQrReader } from 'components/caja/ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';

const mapData = (data) => {
  return data.map(item => {
    return {
      key: item.appo_id,
      ...item
    }
  })
}

export const EnfermeriaHistorial = () => {
  //Contexts
  const { visible } = useContext(QRModalContext)
  //States
  const [parametersModal, setParametersModal] = useState({});
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)


  /**
   * Elimina un registro de enfermeria
   * @param {number} appoId 
   */
  const deleteRecord = useCallback(
    async (id) => {
      try {
        setConfirmLoading(true)
        //await EnfermeriaService.delete(id)
        setConfirmLoading(false)
      } catch (error) {
        console.log(error);
        let message = error.response.data.message ?
          error.response.data.message :
          error.response.data.exception_message
        // openToast(message, false)
      } finally{
        setConfirmLoading(false)
      }
    },
    [],
  )

  /**
    * Muestra el modal  para agregar los datos de enfermeria
    * @param {object} data 
  */
  const openModal = (data) => {
    setParametersModal({
      show: true,
      data
    })
  };

  /**
    * Cierra el modal de enfermeria
    */
  const closeModal = () => {
    setParametersModal({
      show: false,
      data: null
    })
  }


  const columns = useMemo(() => [
    {
      title: "N° cita",
      dataIndex: "appo_id"

    },
    {
      title: "Doctor",
      dataIndex: "doctor"
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
        return (
          <Space>
            <Button type='primary' onClick={() => openModal(record)}><EditOutlined /></Button>
            <Popconfirm
              title="Está seguro de eliminar?"
              //visible={visible}
              onConfirm={() => deleteRecord(record.appo_id)}
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
    }
  ], [confirmLoading, deleteRecord])

  /**
   * Carga los resultados del paciente por cedula
   * @param {string} cedula 
   */
  const cargarResultados = async (cedula) => {
    try {
      setLoading(true)
      let resultados = await EnfermeriaService.getRecordsByIdentification(cedula)
      console.log(resultados);
      if (!resultados || resultados.length === 0) {
        message.error("No hay resultados para el paciente con CI: " + cedula)
      } else {
        setResultados(mapData(resultados))
      }
      setLoading(false)
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }

  /**
   * Handler para buscar los resultados del paciente por cedula
   * @param {Event} e 
   */
  const handleSubmitSearch = (identification) => {
    if (!identification) return
    cargarResultados(identification)
  }

  return (
    <div className='p-4'>
      <h2 className='mb-4'>Consultar historial</h2>
      <CustomSearch
        placeholder="Buscar por número de cédula"
        allowClear
        onSearch={handleSubmitSearch}
      />

      <Table
        columns={columns}
        dataSource={
          resultados
        }
        pagination
        loading={loading}
      />
      <ModalEnfermeria
        closeModal={closeModal}
        parameters={parametersModal}
      />
      {
        visible && <ModalQrReader
          handleSearch={handleSubmitSearch}
        />
      }
    </div>
  )
}
