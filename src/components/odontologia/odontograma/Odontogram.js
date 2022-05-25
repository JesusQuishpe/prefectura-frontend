import OdontogramContext from 'contexts/OdontogramContext';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react'
import { Alert, Col } from 'react-bootstrap';
import MovilidadRecesion from './MovilidadRecesion';
import { Paleta } from './paleta/Paleta';
import Quadrant from './Quadrant';

export const Odontogram = forwardRef((props, ref) => {
  const odontogramGridElement = useRef()
  const {
    id,
    isOdontogramEmpty,
    movilitiesRecessions,
    updateMovilitiesRecessions,
    teeth,
    editedTeeth,
    optionSelected,
    updateEditedTeeth,
    getAcceptedMovilitiesRecessions,
    getAcceptedTeeth } = useContext(OdontogramContext)

  useImperativeHandle(ref, () => {
    return {
      id,
      isOdontogramEmpty,
      getAcceptedMovilitiesRecessions,
      getAcceptedTeeth,
      odontogramGridElement: odontogramGridElement.current
    }
  })

  return (
    <>
      <div>
        <Alert variant='primary'>
          Pintar con: azul para tratamiento realizado - rojo para patología actual
          Movilidad y recesión: Marcar "X" (1,2 ó 3), Si aplica.
        </Alert>
        <div className='grid-odontograma' ref={odontogramGridElement}>
          <div>Recesión</div>
          <MovilidadRecesion
            start={0}
            end={8}
            type={"recesion"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <MovilidadRecesion
            start={8}
            end={16}
            type={"recesion"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <div>Movilidad</div>
          <MovilidadRecesion
            start={16}
            end={24}
            type={"movilidad"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <MovilidadRecesion
            start={24}
            end={32}
            type={"movilidad"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <div className='align-self-center'>Vestibular</div>
          <Quadrant
            key={1}
            quadrant={1}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 1 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={false}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <Quadrant
            key={2}
            quadrant={2}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 2 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={false}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <div className='align-self-center' style={{ gridRowStart: 4, gridRowEnd: "span 2" }}>Lingual</div>
          <Quadrant
            key={3}
            quadrant={5}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 5 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={false}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <Quadrant
            key={4}
            quadrant={6}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 6 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={false}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />

          <Quadrant
            key={5}
            quadrant={8}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 8 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={true}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <Quadrant
            key={6}
            quadrant={7}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 7 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={true}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <div className='align-self-center'>Vestibular</div>
          <Quadrant
            key={7}
            quadrant={4}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 4 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={true}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <Quadrant
            key={8}
            quadrant={3}
            //teeth={teeth ? teeth.filter((t) => t.quadrant === 3 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={true}
            details={editedTeeth}
            teeth={teeth}
            optionSelected={optionSelected}
            updateEditedTeeth={updateEditedTeeth}
          />
          <div>Recesión</div>
          <MovilidadRecesion
            start={32}
            end={40}
            type={"recesion"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <MovilidadRecesion
            start={40}
            end={48}
            type={"recesion"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <div>Movilidad</div>
          <MovilidadRecesion
            start={48}
            end={56}
            type={"movilidad"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />
          <MovilidadRecesion
            start={56}
            end={64}
            type={"movilidad"}
            details={movilitiesRecessions}
            updateMovilitiesRecessions={updateMovilitiesRecessions}
          />

        </div>
        <Col className='paleta'>
          <Paleta />
        </Col>
      </div>

    </>
  )
})
