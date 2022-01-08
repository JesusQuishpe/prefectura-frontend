import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Laboratorio.css'
function Sidebar({data}) {
    return (
        <>
            <div className="bg-dark sidebar">
                <div className='list-group'>
                    {data.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.link} className="list-group-item list-group-item-action">
                                {item.title}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Sidebar
