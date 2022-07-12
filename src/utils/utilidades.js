
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function ordenarArrayEstudios(a, b) {

  if (a.id > b.id) {
    return 1
  }
  if (a.id < b.id) {
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

function formatNumber(number) {
  return new Intl.NumberFormat("ES-EC", {
    style: "currency",
    currency: "USD"
  }).format(number)
}

function dataURLtoFile(dataurl, filename) {
  return new Promise((resolve, reject) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    resolve(new File([u8arr], filename, { type: mime }))
  })

}
//Finds "Y" value of given element
function findPos(element) {
  var curtop = 0;
  if (element.offsetParent) {
    do {
      curtop += element.offsetTop;
    } while (element = element.offsetParent);
    return [curtop];
  }
}

const getOperandosDeFormula = (formula) => {
  if (!formula || formula === "") return ""
  const exp = /[A-Z]\w+/g
  const matches = formula.match(exp)
  const operandos = matches.join(",")
  return operandos
}

const addKeyForAntDTables = (data) => {
  if (!data) return []
  return data.map(item => ({ key: item.id, ...item }))
}
export {
  roundToTwo,
  ordenarArrayEstudios,
  transformDataToMap,
  formatNumber,
  dataURLtoFile,
  findPos,
  getOperandosDeFormula,
  addKeyForAntDTables
};