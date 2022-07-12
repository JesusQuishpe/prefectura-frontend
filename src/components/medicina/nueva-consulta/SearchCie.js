import { Input, Modal, Pagination, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { CieService } from 'services/CieService'
import { addKeyForAntDTables } from 'utils/utilidades'


export const SearchCie = ({ visible, setParentCie, closeModal }) => {
  const [cies, setCies] = useState([])
  const [page, setPage] = useState(1)
  const [cieSelected, setCieSelected] = useState(null)

  const loadCies = async (page) => {
    let response = await CieService.getCies(page)
    console.log(response);
    setCies(response)
  }

  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      width: 150,
      ellipsis: true
    },
    {
      title: "Nombre",
      dataIndex: "disease",
      ellipsis: true
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      let cie = selectedRows[0]
      setCieSelected(cie)
    },
  }

  useEffect(() => {
    loadCies(page)
  }, [])

  const onSearch = () => {

  }
  const onOk = () => {
    console.log(cieSelected);
    setParentCie(cieSelected)
    closeModal()
  }

  return (
    <Modal
      title="Seleccionar enfermedad-CIE"
      visible={visible}
      onCancel={closeModal}
      width={700}
      onOk={onOk}
    >
      <Input.Search
        onSearch={onSearch}
        placeholder='Buscar por nombre'
        style={{ marginBottom: "10px" }} />
      <Table
        rowSelection={
          {
            type: "radio",
            ...rowSelection,
          }
        }
        columns={columns}
        dataSource={addKeyForAntDTables(cies.data)}
        size='small'

        pagination={{
          pageSize: 10,
          position: ['bottomRight'],
          total: cies.total,
          onChange: (page) => loadCies(page)
        }}
      />

    </Modal>
  )
}
