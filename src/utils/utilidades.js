
function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

function ordenarArrayEstudios(a,b) {
  
  if(a.id>b.id){
    return 1
  }
  if(a.id<b.id){
    return -1
  }
  return 0
}

/**
 * Convierte la data en un mapa que contiene el id y el valor false por defecto
 * @param {Array} data normalmente un array de objetos con id 
 * @returns {Map}
 */
const transformDataToMap = (data) => {
  let map = new Map();
  data?.forEach(element => {
    map.set(element.id, false);
  });
  return map;
}

export {
  roundToTwo,
  ordenarArrayEstudios,
  transformDataToMap
};