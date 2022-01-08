import React from 'react'
import Sidebar from './Sidebar'
import './SidebarData'
import SidebarData from './SidebarData'
export const Menu = () => {
    return (
        <div>
            <Sidebar data={SidebarData}></Sidebar>
            
        </div>
    )
}
