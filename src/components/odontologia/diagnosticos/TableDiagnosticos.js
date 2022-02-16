import React from 'react'



export const TableDiagnosticos = ({columns,data}) => {
  
  //Definicion de columnas
  const columns = React.useMemo(
    () => [
      {
        Header: 'Diagnostico',
        accessor: 'colDiag', // accessor is the "key" in the data
      },
      {
        Header: 'Cie',
        accessor: 'colCie',
      },
      {
        Header: 'Tipo',
        accessor: 'colTipo',
      },
    ],
    []
  )





  return (
    <div>TableDiagnosticos</div>
  )
}
