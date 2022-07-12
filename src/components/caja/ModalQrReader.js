import { Modal } from 'antd'
import QRModalContext from 'contexts/QrModalContext';
import React, { useContext} from 'react'
import { QrReader } from 'react-qr-reader';

export const ModalQrReader = ({ handleSearch}) => {
  const {visible,closeModal} = useContext(QRModalContext)

  return (
    <Modal
      title="Escanear QR"
      visible={visible}
      onCancel={closeModal}
      cancelText="Cancelar"
      okButtonProps={{
        disabled:true
      }}
      >
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            console.log("HOLA");
            handleSearch(result?.text)
            closeModal()
          }

          if (!!error) {
            //console.info(error);
          }

        }}
        style={{ width: '100%' }}
      />
    </Modal>
  )
}
