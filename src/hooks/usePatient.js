import LoaderContext from "contexts/LoaderContext";
import QRModalContext from "contexts/QrModalContext";
import ToastContext from "contexts/ToastContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PatientService from "services/PatientService";
import moment from 'moment'

export const usePatient = ({form}) => {
  //Contexts
  const { openToast } = useContext(ToastContext)
  const {openLoader,closeLoader} = useContext(LoaderContext)
  const { visible } = useContext(QRModalContext)
  //States
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { idPatient } = useParams();
  const isEdit = idPatient ? true : false;

  const savePatient = async (values) => {
    try {
      const birth_date = moment(values.birth_date).format("YYYY-MM-DD")
      if (!isEdit) {
        openLoader("Creando paciente...")
        await PatientService.createPatient({ ...values, birth_date })
        //setForm(initialForm)
        form.resetFields()
      } else {
        openLoader("Actualizando paciente")
        await PatientService.updatePatient({ id: idPatient, ...values, birth_date })
      }
      closeLoader()
      openToast(isEdit ? "Paciente actualizado" : "Paciente creado", true)
    } catch (error) {
      console.log(error);
      closeLoader()
      openToast("Ha ocurrido un error, no se pudo crear el paciente", false)
    }
  }
  
  const deletePatient=(id)=>{

  }

  const getPatients=({page})=>{

  }
}