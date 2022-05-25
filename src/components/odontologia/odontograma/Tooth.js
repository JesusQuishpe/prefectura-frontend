import React from 'react'

const Tooth = ({ tooth, reverse, optionSelected, updateEditedTeeth }) => {

  const handleClick = (e) => {
    if (!optionSelected) return
    const { type, data } = optionSelected
    if (type !== "color") return
    let sideColor = tooth[e.target.getAttribute("side")]
    let newTooth = { ...tooth }
    if (sideColor === data.colorClassName) {
      newTooth[e.target.getAttribute("side")] = ""
    } else {
      newTooth[e.target.getAttribute("side")] = data.colorClassName
    }
    updateEditedTeeth(newTooth)//Actualizamos en el contexto
  }

  const onSimboContainerClick = () => {
    if (!optionSelected) return
    let { type, data } = optionSelected
    if (type === "color") return
    let newTooth = {
      ...tooth,
      symbo_path: data.path,
      symb_id: data.id ? data.id : ""
    }
    updateEditedTeeth(newTooth)//Actualizamos en el contexto
  }

  if (tooth.type === "Vestibular") {
    return (
      <div className={`d-flex flex-column align-items-center ${reverse && 'flex-column-reverse'}`}>
        <p className='m-0'>{tooth.dental_piece}</p>
        <div className='diente' type="vestibular">
          <div className='diente-simbo-container hover'
            style={{ display: tooth.symbo_path || (optionSelected?.type === "simbolo" || optionSelected?.type === "limpiar") ? "block" : "none" }}
            onClick={onSimboContainerClick}
          >
            {
              tooth.symbo_path ?
                <div className='d-flex align-items-center justify-content-center_side w-100 h-100'>
                  <img src={require("assets/svg/" + tooth.symbo_path)} width={"30px"} height={"30px"} alt="Diente vestibular" />
                </div>
                : ""
            }
          </div>
          <svg width='100%' height='100%' viewBox='0 0 102.41 102.41'
            xmlns='http://www.w3.org/2000/svg' fill='red'>
            <g id='Capa_2' data-name='Capa 2'>
              <g id='Capa_1-2' data-name='Capa 1'>
                <polygon side='top_side' className={`btn-diente ${tooth.top_side}`} onClick={handleClick}
                  points='1.21 1.21 26.21 26.21 76.21 26.21 101.21 1.21 1.21 1.21' />
                <polygon side='right_side' className={`btn-diente ${tooth.right_side}`} onClick={handleClick}
                  points='101.21 1.21 76.21 26.21 76.21 76.21 101.21 101.21 101.21 1.21' />
                <polygon side='left_side' className={`btn-diente ${tooth.left_side}`} onClick={handleClick}
                  points='1.21 1.21 26.21 26.21 26.21 76.21 1.21 101.21 1.21 1.21' />
                <polygon side='bottom_side' className={`btn-diente ${tooth.bottom_side}`} onClick={handleClick}
                  points='1.21 101.21 26.21 76.21 76.21 76.21 101.21 101.21 1.21 101.21' />
                <rect side='center_side' className={`btn-diente ${tooth.center_side}`} x='26.21' y='26.21' width='50'
                  height='50' onClick={handleClick} />
              </g>
            </g>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={`d-flex flex-column align-items-center ${reverse && 'flex-column-reverse'} `}>
      <p className='text-center_side m-0'>{tooth.dental_piece}</p>
      <div className='diente' type="vestibular">
        <div className='diente-simbo-container hover'
          style={{ display: tooth.symbo_path || (optionSelected?.type === "simbolo" || optionSelected?.type === "limpiar") ? "block" : "none" }}
          onClick={onSimboContainerClick}
        >
          {
            tooth.symbo_path ?
              <div className='d-flex align-items-center justify-content-center_side w-100 h-100'>
                <img src={require("assets/svg/" + tooth.symbo_path)} width={"30px"} height={"30px"} alt="Diente lingual" />
              </div>
              : ""
          }
        </div>
        <svg width='100%' height='100%' viewBox='-0.5 -0.5 105 105' xmlns='http://www.w3.org/2000/svg'>
          <g xmlns='http://www.w3.org/2000/svg' id='Capa_2' data-name='Capa 2'>
            <g id='Capa_1-2' data-name='Capa 1'>
              <circle side='center_side' className={`btn-diente ${tooth.center_side}`} cx='50.5' cy='50.5' r='25' onClick={handleClick} />
              <line x1='68.18' y1='32.82' x2='85.86' y2='15.14' />
              <line x1='32.82' y1='32.82' x2='15.14' y2='15.14' />
              <path side='top_side' className={`btn-diente ${tooth.top_side}`} onClick={handleClick}
                d='M32.82,32.82,15.14,15.14A49.21,49.21,0,0,1,50.5.5,49.21,49.21,0,0,1,85.86,15.14L68.18,32.82A23.85,23.85,0,0,0,50.5,25.5,23.85,23.85,0,0,0,32.82,32.82Z' />
              <path side='right_side' className={`btn-diente ${tooth.right_side}`} onClick={handleClick}
                d='M68.18,32.82,85.86,15.14A49.21,49.21,0,0,1,100.5,50.5,49.21,49.21,0,0,1,85.86,85.86L68.18,68.18A23.85,23.85,0,0,0,75.5,50.5,23.85,23.85,0,0,0,68.18,32.82Z' />
              <path side='left_side' className={`btn-diente ${tooth.left_side}`} onClick={handleClick}
                d='M32.82,68.18,15.14,85.86A49.21,49.21,0,0,1,.5,50.5,49.21,49.21,0,0,1,15.14,15.14L32.82,32.82A23.85,23.85,0,0,0,25.5,50.5,23.85,23.85,0,0,0,32.82,68.18Z' />
              <path side='bottom_side' className={`btn-diente ${tooth.bottom_side}`} onClick={handleClick}
                d='M68.18,68.18,85.86,85.86A49.21,49.21,0,0,1,50.5,100.5,49.21,49.21,0,0,1,15.14,85.86L32.82,68.18A23.85,23.85,0,0,0,50.5,75.5,23.85,23.85,0,0,0,68.18,68.18Z' />
              <line x1='68.31' y1='68.31' x2='85.98' y2='85.98' />
              <line x1='32.69' y1='68.31' x2='15.02' y2='85.98' />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default React.memo(Tooth, (prev, next) => {
  if (prev.tooth.left_side !== next.tooth.left_side ||
    prev.tooth.right_side !== next.tooth.right_side ||
    prev.tooth.bottom_side !== next.tooth.bottom_side ||
    prev.tooth.center_side !== next.tooth.center_side ||
    prev.tooth.top_side !== next.tooth.top_side ||
    prev.tooth.symbo_path !== next.tooth.symbo_path ||
    prev.optionSelected !== next.optionSelected ||
    prev.updateEditedTeeth !== next.updateEditedTeeth
  ) {
    return false
  }
  return true
})
