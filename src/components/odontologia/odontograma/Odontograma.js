import OdontogramaContext from 'contexts/OdontogramaContext';
import domtoimage from 'dom-to-image';
import React, { createRef, forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { dataURLtoFile } from 'utils/utilidades';
import Cuadrante from './Cuadrante';
import { MovilidadRecesion } from './MovilidadRecesion';
import { Paleta } from './paleta/Paleta';


const Odontograma = forwardRef(({ tabkey }, ref) => {
  let odontogramRef = useRef()

  const {
    id,
    teeth,
    editedTeeth,
    movilitiesRecessions,
    getAcceptedTeeth,
    getAcceptedMovilitiesRecessions,
    isOdontogramEmpty
  } = useContext(OdontogramaContext)


  useImperativeHandle(ref, () => {
    return {
      id,
      getAcceptedTeeth,
      getAcceptedMovilitiesRecessions,
      movilitiesRecessions,
      odontogramElement:odontogramRef.current,
      isOdontogramEmpty
    }
  })

  return (
    <>
      <div>
        <Alert variant='primary'>
          Pintar con: azul para tratamiento realizado - rojo para patología actual
          Movilidad y recesión: Marcar "X" (1,2 ó 3), Si aplica.
        </Alert>
        <div className='grid-odontograma' ref={odontogramRef}>
          <div>Recesión</div>
          <MovilidadRecesion start={0} end={8} type={"recesion"} details={movilitiesRecessions} />
          <MovilidadRecesion start={8} end={16} type={"recesion"} details={movilitiesRecessions} />
          <div>Movilidad</div>
          <MovilidadRecesion start={16} end={24} type={"movilidad"} details={movilitiesRecessions} />
          <MovilidadRecesion start={24} end={32} type={"movilidad"} details={movilitiesRecessions} />
          <div className='align-self-center'>Vestibular</div>
          <Cuadrante
            key={1}
            quadrant={1}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 1 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={false}
            details={editedTeeth}
          />
          <Cuadrante
            key={2}
            quadrant={2}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 2 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={false}
            details={editedTeeth}
          />
          <div className='align-self-center' style={{ gridRowStart: 4, gridRowEnd: "span 2" }}>Lingual</div>
          <Cuadrante
            key={3}
            quadrant={5}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 5 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={false}
            details={editedTeeth}
          />
          <Cuadrante
            key={4}
            quadrant={6}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 6 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={false}
            details={editedTeeth}
          />

          <Cuadrante
            key={5}
            quadrant={8}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 8 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={true}
            details={editedTeeth}
          />
          <Cuadrante
            key={6}
            quadrant={7}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 7 && t.type === "Lingual") : []}
            type={"Lingual"}
            reverse={true}
            details={editedTeeth}
          />
          <div className='align-self-center'>Vestibular</div>
          <Cuadrante
            key={7}
            quadrant={4}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 4 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={true}
            details={editedTeeth}
          />
          <Cuadrante
            key={8}
            quadrant={3}
            teeth={teeth ? teeth.filter((t) => t.quadrant === 3 && t.type === "Vestibular") : []}
            type={"Vestibular"}
            reverse={true}
            details={editedTeeth}
          />
          <div>Recesión</div>
          <MovilidadRecesion start={32} end={40} type={"recesion"} details={movilitiesRecessions} />
          <MovilidadRecesion start={40} end={48} type={"recesion"} details={movilitiesRecessions} />
          <div>Movilidad</div>
          <MovilidadRecesion start={48} end={56} type={"movilidad"} details={movilitiesRecessions} />
          <MovilidadRecesion start={56} end={64} type={"movilidad"} details={movilitiesRecessions} />

        </div>
        <Col className='paleta'>
          <Paleta />
        </Col>
      </div>

    </>
  );
})
export default Odontograma

