import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Laboratorio.css'
function Sidebar({data}) {
    return (
        <>
            <div className="bg-light h-100" style={{width:"300px"}}>
                <div className='list-group'>
                    {data.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.link} activeClassName='link-active' className="link">
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
