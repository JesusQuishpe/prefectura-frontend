import React, { useState, useRef } from 'react'
import MedicineService from 'services/MedicineService';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined,SearchOutlined  } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';


export const MedicinaDashboard = () => {
  const navigate = useNavigate()
  //Refs
  //States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  
  const loadMedicineRecordByIdentification = async (identification) => {
    try {

      let records = await MedicineService.getMedicineRecordsByIdentification(identification)
      console.log(records);
      setData(records.map(item => ({
        key: item.appo_id,
        medicine_id: item.medicine_id,
        fullname: item.fullname,
        date: item.date,
        hour: item.hour,
      })))

    } catch (error) {
      console.log(error);
    }
  }


  const handleSubmitSearch = (identification) => {
    loadMedicineRecordByIdentification(identification)
  }
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
      dataIndex: "medicine_id"
    },
    {
      title: "Paciente",
      dataIndex: "fullname",
      key: "fullname",
      ...getColumnSearchProps('fullname')
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
            <Button type='primary' onClick={() => navigate(`${record.medicine_id}/editar`)}><EditOutlined /></Button>
            <Button type='primary' danger onClick={() => console.log(record.medicine_id)}><DeleteOutlined /></Button>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <div className='p-4'>
        <h4 className='mb-3'>Consulta de resultados</h4>
        <Input.Search
          placeholder='Buscar por número de cedula'
          onSearch={handleSubmitSearch}
          style={{marginBottom:"20px"}}
        />
        <Table
          columns={columns}
          dataSource={data}
          pagination
        />
      </div>
    </>
  )
}
