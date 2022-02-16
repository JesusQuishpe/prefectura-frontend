import { useContext } from "react"
import LaboratorioContext from "../contexts/LaboratorioContext"
import ModalContext, { ModalContextProvider } from "../contexts/ModalContext"
import { ModalBioquimica } from "./laboratorio/bioquimica/ModalBioquimica"
import { ModalCoprologia } from "./laboratorio/coprologia/ModalCoprologia"
import { ModalCoproparasitario } from "./laboratorio/coproparasitario/ModalCoproparasitario"
import { ModalEmbarazo } from "./laboratorio/embarazo/ModalEmbarazo"
import { ModalHelycobacter } from "./laboratorio/helycobacter/ModalHelycobacter"
import { ModalHelycobacterHeces } from "./laboratorio/helycobacterHeces/ModalHelycobacterHeces"
import { ModalHematologia } from "./laboratorio/hematologia/ModalHematologia"
import { ModalHemoglobina } from "./laboratorio/hemoglobina/ModalHemoglobina"
import { ModalOrina } from "./laboratorio/orina/ModalOrina"
import { ModalTiroideas } from "./laboratorio/tiroideas/ModalTiroideas"

const ModalManager = () => {
    const {closeModal,dataModal}=useContext(ModalContext);
    console.log("Manager");
    return (

        <>
            <ModalBioquimica
                show={dataModal.id_tipo === 1}
                closeModal={closeModal}
            />
            
            <ModalCoprologia
                show={dataModal.id_tipo === 2}
                closeModal={closeModal}
            />
            <ModalCoproparasitario
                show={dataModal.id_tipo === 3}
                closeModal={closeModal}
            />
            <ModalOrina
                show={dataModal.id_tipo === 4}
                closeModal={closeModal}
            />
            <ModalHelycobacterHeces
                show={dataModal.id_tipo === 5}
                closeModal={closeModal}
            />

            <ModalHelycobacter
                show={dataModal.id_tipo === 6}
                closeModal={closeModal}
            />
            <ModalHematologia
                show={dataModal.id_tipo === 7}
                closeModal={closeModal}
            />
            <ModalHemoglobina
                show={dataModal.id_tipo === 8}
                closeModal={closeModal}
            />

            <ModalEmbarazo
                show={dataModal.id_tipo === 9}
                closeModal={closeModal}
            />

            <ModalTiroideas
                show={dataModal.id_tipo === 10}
                closeModal={closeModal}
            />
        </>
    )
}

export default ModalManager