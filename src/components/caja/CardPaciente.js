import { Card, Col, Descriptions } from 'antd'
import React from 'react'
import QRCode from 'react-qr-code'
import { END_POINT } from 'utils/conf'

const CardPaciente = ({ patient }) => {
  //const navigate = useNavigate()
  console.log(patient);
  return (
    <Col span={12}>
      <Card
        title="Datos del paciente"
        bordered
      >
        <Descriptions title="" column={1}>
          <Descriptions.Item label="Cédula" >{patient.identification_number}</Descriptions.Item>
          <Descriptions.Item label="Nombres" >{patient.name}</Descriptions.Item>
          <Descriptions.Item label="Apellidos" >{patient.lastname}</Descriptions.Item>
          <Descriptions.Item label="Teléfono" >{patient.cellphone_number}</Descriptions.Item>
          <Descriptions.Item label="Domicilio" >{patient.address}</Descriptions.Item>
          <Descriptions.Item label="Código QR" >
            {
              patient.identification_number &&
              <a href={END_POINT+`pacientes/${patient.patient_id}/qr`} target="_blank" rel='noreferrer'>
                <QRCode
                  value={patient.identification_number}
                  size={48}
                  style={{ cursor: "pointer" }}

                />
              </a>

            }
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Col>

  )
}
export default React.memo(CardPaciente)
