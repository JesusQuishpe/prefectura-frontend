import React from 'react'

export const RolesArea = ({ roles, rolSelected, onRolClick }) => {
  return (
    <div className='h-100'>
      <div className='fw-bold mb-3 fst-italic'>Roles</div>
      <ul className='rol-area'>
        {roles?.map((rol) => {
          return (
            <li
              key={rol.id}
              className={`${rolSelected?.rolId === rol.id ? 'rol-selected' : ''}`}
              onClick={(e) => onRolClick({ rolId: rol.id})}>
              {rol.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
