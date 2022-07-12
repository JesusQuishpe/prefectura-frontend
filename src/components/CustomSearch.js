import { Button, Col, Input, Row } from 'antd'
import React, { useContext } from 'react'
import { QrcodeOutlined } from '@ant-design/icons'
import QRModalContext from 'contexts/QrModalContext'

export const CustomSearch = ({ onSearch, placeholder, allowClear}) => {
  const { openModal } = useContext(QRModalContext)

  return (
    <Row style={{ marginBottom: "20px" }} gutter={2} wrap={false}>
      <Col flex={5}>
        <Input.Search
          onSearch={onSearch}
          placeholder={placeholder}
          allowClear={allowClear}
        />
      </Col>
      <Col flex="none">
        <Button
          type="default"
          onClick={openModal}>
          <QrcodeOutlined style={{ fontSize: '18px' }} />
        </Button>
      </Col>
    </Row>
  )
}
