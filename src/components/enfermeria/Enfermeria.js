import axios from 'axios';
import React, { useState, useRef, useContext, useMemo, useEffect } from 'react'
import { END_POINT } from '../../utils/conf';
import { ModalEnfermeria } from './ModalEnfermeria';
import { useDeleteModal } from 'hooks/useDeleteModal';
import ToastContext from 'contexts/ToastContext';
import { Button, Input,  Space, Table } from 'antd';
import { FileAddOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { CustomSearch } from 'components/CustomSearch';
import { ModalQrReader } from 'components/caja/ModalQrReader';
import QRModalContext from 'contexts/QrModalContext';

function Enfermeria() {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const { visible } = useContext(QRModalContext)
  //States
  const [data, setData] = useState([])
  const [parametersModal, setParametersModal] = useState({})
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [filterText, setFilterText] = useState("")

  //Custom Hooks
  const { openModal: openDeleteModal, closeModal: closeDeleteModal } = useDeleteModal()

  /**
   * Elimina un registro de enfermeria
   * @param {number} appoId 
   */
  const deleteRecord = async (appoId) => {
    try {
      await axios.delete(END_POINT + `enfermerias/${appoId}`)
      loadPatientQueue()
      closeDeleteModal()
      //console.log(props);
    } catch (error) {
      console.log(error);
      let message = error.response.data.message ?
        error.response.data.message :
        error.response.data.exception_message
      openToast(message, false)
    }
  }

  /**
   * Carga los pacientes que están en espera
   */
  const loadPatientQueue = async () => {
    try {
      let response = await axios.get(END_POINT + "enfermeria/pacientes");
      console.log(response);
      setData(response.data.data.map(item => ({
        key: item.appo_id,
        appo_id: item.appo_id,
        patient: item.patient,
        date: item.created_at,
        area: item.area,
        identification:item.identification_number
      })));
    } catch (error) {
      //gridRef.current.api.showNoRowsOverlay()
      console.log(error);
    }
  }

  /**
   * Muestra el modal para agregar los datos de enfermeria
   * @param {object} data 
   */
  const openModal = (data) => {
    console.log(data);
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

  /**
   * Recarga los pacientes en espera
   */
  const handleReload = () => {
    setSearchText('')
    setSearchedColumn('')
    loadPatientQueue()
  }

  const handleDeleteClick = (appoId) => {
    openDeleteModal({
      show: true,
      id: appoId,
      message: `Nota: Al eliminar un registro , 
      se eliminará la cita a la que pertenece.`,
      deleteCallback: deleteRecord
    })
  }

  useEffect(() => {
    loadPatientQueue()
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Buscar paciente`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const columns = [
    {
      title: "N° cita",
      dataIndex: "appo_id"
    },
    {
      title: "Paciente",
      dataIndex: "patient",
      key: "patient",
      ...getColumnSearchProps('patient')
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
      title: "Acciones",
      render: (_, record) => {
        return (
          <Space>
            <Button type='primary' onClick={() => openModal(record)}><FileAddOutlined /></Button>
            <Button type='primary' danger onClick={() => handleDeleteClick(record.appo_id)}><DeleteOutlined /></Button>
          </Space>
        )
      }
    }
  ]

  const onSearch = (identification) => {
    setFilterText(identification)
  }

  return (
    <>
      <div className='w-100 p-4'>
        <h1 className='text-center'>Area de enfermería</h1>
        <CustomSearch
          onSearch={onSearch}
          allowClear
          placeholder={"Buscar paciente por número de cédula"}
          
        />
        <Table
          columns={columns}
          dataSource={
            data.filter(row=>row.identification.includes(filterText))
          }
          pagination
        />
      </div>

      <ModalEnfermeria
        closeModal={closeModal}
        parameters={parametersModal}
        loadPatientQueue={loadPatientQueue} />
      {
        visible && <ModalQrReader
          handleSearch={onSearch}
        />
      }
    </>

  )
}

export default Enfermeria
