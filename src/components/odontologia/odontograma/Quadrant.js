import React from 'react'
import Tooth from './Tooth'

const Quadrant = ({ quadrant, type, reverse, teeth, details, optionSelected, updateEditedTeeth }) => {
  const teethOfQuadrant = teeth ? teeth.filter((t) => t.quadrant === quadrant && t.type === type) : []

  return (
    <div id={`cuadrante-${quadrant}`} className='cuadrante'>
      {
        teethOfQuadrant.map((tooth, index) => {
          let toothFinded = details.find(toothDetail => toothDetail.tooth_id === tooth.id)
          let toothData = {
            id: toothFinded?.id || null,
            tooth_id: tooth.id,
            type: tooth.type,
            dental_piece: tooth.dental_piece,
            teeth_num: tooth.teeth_num,
            top_side: toothFinded?.top_side || "",
            right_side: toothFinded?.right_side || "",
            left_side: toothFinded?.left_side || "",
            bottom_side: toothFinded?.bottom_side || "",
            center_side: toothFinded?.center_side || "",
            symbo_path: toothFinded?.symbo_path || null,
            symb_id: toothFinded?.symb_id || null,
          }
          if ((quadrant === 5 || quadrant === 8) && index === 0) {
            return (
              <div style={{ gridColumnStart: 4 }} key={tooth.id}>
                <Tooth
                  key={tooth.id}
                  tooth={toothData}
                  reverse={reverse}
                  optionSelected={optionSelected}
                  updateEditedTeeth={updateEditedTeeth}
                />
              </div>
            )
          }
          return (
            <Tooth
              key={tooth.id}
              tooth={toothData}
              reverse={reverse}
              optionSelected={optionSelected}
              updateEditedTeeth={updateEditedTeeth}
            />
          )
        })
      }
    </div>
  )
}

export default React.memo(Quadrant)