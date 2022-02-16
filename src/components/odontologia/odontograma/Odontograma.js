import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { END_POINT } from 'utils/conf';
import { Cuadrante } from './Cuadrante';
import { MovilidadRecesion } from './MovilidadRecesion';
import { Paleta } from './paleta/Paleta';
import { SeccionDientes } from './SeccionDientes';

const Odontograma = () => {
  console.log("ODONTROGRAMA");
  const [dientes, setDientes] = useState();

  const cargarDientes = async () => {
    let response = await axios.get(END_POINT + "odontologia/dientes");
    setDientes(response.data.data);
  }

  useEffect(() => {
    cargarDientes();
  }, []);

  return (
    <>
      <div className=''>
        <Alert variant='primary'>
          Pintar con: azul para tratamiento realizado - rojo para patología actual
          Movilidad y recesión: Marcar "X" (1,2 ó 3), Si aplica.
        </Alert>
        <div className='grid-odontograma'>
          <div>Recesión</div>
          <MovilidadRecesion start={0} end={8} />
          <MovilidadRecesion start={8} end={16} />
          <div>Movilidad</div>
          <MovilidadRecesion start={16} end={24} />
          <MovilidadRecesion start={24} end={32} />
          <div className='align-self-center'>Vestibular</div>
          <Cuadrante
            key={1}
            cuadrante={1}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 1 && diente.tipo === "Vestibular") : []}
            tipo={"Vestibular"}
            reverse={false}
          />
          <Cuadrante
            key={2}
            cuadrante={2}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 2 && diente.tipo === "Vestibular") : []}
            tipo={"Vestibular"}
            reverse={false}
          />
          <div className='align-self-center' style={{gridRowStart:4,gridRowEnd:"span 2"}}>Lingual</div>
          <Cuadrante
            key={3}
            cuadrante={5}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 5 && diente.tipo === "Lingual") : []}
            tipo={"Lingual"}
            reverse={false}
          />
          <Cuadrante
            key={4}
            cuadrante={6}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 6 && diente.tipo === "Lingual") : []}
            tipo={"Lingual"}
            reverse={false}
          />
          
          <Cuadrante
            key={5}
            cuadrante={8}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 8 && diente.tipo === "Lingual") : []}
            tipo={"Lingual"}
            reverse={true}
          />
          <Cuadrante
            key={6}
            cuadrante={7}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 7 && diente.tipo === "Lingual") : []}
            tipo={"Lingual"}
            reverse={true}
          />
          <div  className='align-self-center'>Vestibular</div>
          <Cuadrante
            key={7}
            cuadrante={4}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 4 && diente.tipo === "Vestibular") : []}
            tipo={"Vestibular"}
            reverse={true}
          />
          <Cuadrante
            key={8}
            cuadrante={3}
            dientes={dientes ? dientes.filter((diente) => diente.cuadrante === 3 && diente.tipo === "Vestibular") : []}
            tipo={"Vestibular"}
            reverse={true}
          />
          <div>Recesión</div>
          <MovilidadRecesion start={32} end={40} />
          <MovilidadRecesion start={40} end={48} />
          <div>Movilidad</div>
          <MovilidadRecesion start={48} end={56} />
          <MovilidadRecesion start={56} end={64} />
          
        </div>
        <Col className='paleta'>
          <Paleta />
        </Col>
      </div>

    </>
  );
};
export default  React.memo(Odontograma)

