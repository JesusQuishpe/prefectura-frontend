import { createContext, forwardRef, useState, useImperativeHandle, useContext } from 'react'
import OdontologyContext from './OdontologyContext'

const IndicadoresContext = createContext()

const FILAS_PIEZAS = 6

const PIEZAS_DENTALES = [
  [16, 17, 55],
  [11, 21, 51],
  [26, 27, 65],
  [36, 37, 75],
  [31, 41, 71],
  [46, 47, 85]
]

const createDataToIndicators = (details, indicator) => {
  var data = []
  for (let index = 0; index < FILAS_PIEZAS; index++) {
    data.push(
      {
        id:details && details.length>0 && details[index].id || null,
        pos: index,
        piece1: details && details.length>0 && details[index].piece1 === 1 ? true : false,
        piece2: details && details.length>0 && details[index].piece2 === 1 ? true : false,
        piece3: details && details.length>0 && details[index].piece3 === 1 ? true : false,
        plaque: details && details.length>0 && details[index].plaque ? details[index].plaque : null,
        calc: details && details.length>0 && details[index].calc ? details[index].calc : null,
        gin: details && details.length>0 && details[index].gin ? details[index].gin : null,
        pieces: PIEZAS_DENTALES[index]
      }
    )
  }
  data.push({
    pos: data.length,
    is_total: true,
    calc_total: indicator?.calc_total || 0,
    plaque_total: indicator?.plaque_total || 0,
    gin_total: indicator?.gin_total || 0
  })
  return data
}

const IndicadoresProvider = forwardRef(
  ({ children }, ref) => {
    const { data } = useContext(OdontologyContext)
    let arr = []
    //console.log(arr ? true : false);
    const [form, setForm] = useState({
      per_disease: data?.indicator?.per_disease || "",
      bad_occlu: data?.indicator?.bad_occlu || "",
      fluorosis: data?.indicator?.fluorosis || "",
      indicator_details: createDataToIndicators(data?.indicator?.details, data?.indicator),
      plaque_total: data?.indicator?.plaque_total || 0,
      calc_total: data?.indicator?.calc_total || 0,
      gin_total: data?.indicator?.gin_total || 0,
      id:data?.indicator?.id || null
    })

    useImperativeHandle(ref, () => {
      return {
        data: { ...form, indicator_details: getIndicatorDetailsWithoutTotalRow() }
      }
    })

    const handleForm = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const getIndicatorDetailsWithoutTotalRow = () => {
      let newIndicators = []
      form.indicator_details.forEach(indicator => {
        if (!indicator.is_total) {
          newIndicators.push(indicator)
        }
      })
      return newIndicators
    }

    const updateTotales = (colId, value) => {
      setForm({
        ...form,
        [`${colId}_total`]: value
      })
    }

    let dataForProvider = {
      form,
      handleForm,
      updateTotales
    }

    return (
      <IndicadoresContext.Provider value={dataForProvider}>
        {children}
      </IndicadoresContext.Provider>
    )
  }
)

export { IndicadoresProvider }
export default IndicadoresContext