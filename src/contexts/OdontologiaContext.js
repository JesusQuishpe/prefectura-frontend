import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import OdontologiaService from 'services/OdontologiaService';

const OdontologiaContext = createContext();

const crearMapaParaChecks = (initialChecks) => {
  let map = new Map();
  initialChecks?.forEach(element => {
    map.set(element.id, false);
  });
  return map;
}

const OdontologiaProvider = ({ children }) => {
  const { idCita } = useParams();
  const [loading, setLoading] = useState(false);
  const [dientes, setDientes] = useState([])
  const [infoPaciente, setInfoPaciente] = useState({})
  const [infoEnfermeria, setInfoEnfermeria] = useState({})
  const [antecedentes, setAntecedentes] = useState([])
  const [patologias, setPatologias] = useState([])
  const [planes, setPlanes] = useState([])
  const [cies,setCies]=useState([])

  //Informacion que va para la BD
  //Pestaña general
  const [antedentesSeleccionados, setAntedentesSeleccionados] = useState(null);
  const [patologiasSeleccionadas, setPatologiasSeleccionadas] = useState(null);
  const [descripcionAnt, setDescripcionAnt] = useState("");
  const [descripcionPat, setDescripcionPat] = useState("");
  //Pestaña indicadores
  var enfermedadPeriodontal=""
  var malOclusion=""
  var fluorosis=""
  
  //Piezas dentales
  const indicadorDetalles=[]

  //Pestaña diagnosticos
  let planDiag={}
  const diagnosticos=[]

  const actualizarPlanDiag=(newPlanDiag)=>{
    planDiag=newPlanDiag
    console.log(planDiag);
  }

  const setEnfermedadPeriodontal=(valor)=>{
    enfermedadPeriodontal=valor
    console.log(enfermedadPeriodontal);
  }
  const setMalOclusion=(valor)=>{
    malOclusion=valor
    console.log(malOclusion);
  }
  const setFluorosis=(valor)=>{
    fluorosis=valor
    console.log(fluorosis);
  }
  

  const getDatosParaFicha = (idCita) => {
    OdontologiaService.getFicha(idCita)
      .then(ficha => {
        console.log(ficha);
        setInfoPaciente(ficha.paciente)
        setInfoEnfermeria(ficha.enfermeria)
        //setDientes(ficha.dientes)
        console.log(ficha.antecedentes);
        setAntecedentes(ficha.antecedentes)
        setPatologias(ficha.patologias)
        setPlanes(ficha.planes)
        setCies(ficha.cies)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }

  const actualizarAntecedentes = (antecedentes) => {
    setAntedentesSeleccionados(antecedentes)
    console.log(antecedentes)
  }

  const actualizarPatologias = (patologias) => {
    setPatologiasSeleccionadas(patologias)
    console.log(patologias);
  }

  const actualizarDescripcionAnt = (descripcion) => {
    setDescripcionAnt(descripcion)
  }


  const actualizarDescripcionPat = (descripcion) => {
    setDescripcionPat(descripcion)
  }


  useEffect(() => {
    console.log("ASDASD");
    setLoading(true);
    setTimeout(()=>{
      getDatosParaFicha(idCita)
    },1000)
  }, []);


  return (
    <OdontologiaContext.Provider value={
      {
        dientes,
        infoPaciente,
        infoEnfermeria,
        antecedentes,
        patologias,
        planes,
        cies,
        indicadorDetalles,
        loading,
        actualizarAntecedentes,
        actualizarPatologias,
        actualizarDescripcionAnt,
        actualizarDescripcionPat,
        setEnfermedadPeriodontal,
        setMalOclusion,
        setFluorosis,
        actualizarPlanDiag
      }
    }>
      {children}
    </OdontologiaContext.Provider>
  )
}

export default OdontologiaContext;
export { OdontologiaProvider };