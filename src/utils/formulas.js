import {roundToTwo} from "./utilidades.js";


function calcularColesterolHdl(colesterol_total) {
    return roundToTwo(colesterol_total/5);
}

function calcularColesterolLdl(trigliceridos,colesterol_total,colesterol_hdl) {
    console.log(trigliceridos,colesterol_total,colesterol_hdl);
    return roundToTwo(colesterol_total - colesterol_hdl - (trigliceridos/5));
}

function calcularGlobulina(proteinas,albumina) {
    return roundToTwo(proteinas - albumina);
}

function calcularRelacionAG(albumina,globulina) {
    if(globulina==0) return 0;
    return roundToTwo(albumina/globulina);
}

function calcularBilirrubinaIndirecta(bilirrubina_total,bilirrubina_directa) {
    return roundToTwo(bilirrubina_total - bilirrubina_directa);
}

function calcularHemoglobina(hematocrito) {
    return roundToTwo(hematocrito/3.05);
}
function calcularHematies(hematocrito) {
    return roundToTwo(hematocrito*110);
}

export {
    calcularColesterolHdl,
    calcularColesterolLdl,calcularGlobulina,
    calcularRelacionAG,
    calcularBilirrubinaIndirecta,
    calcularHemoglobina,
    calcularHematies
};