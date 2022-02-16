import React from 'react'
import { AppBar } from './AppBar'
import Sidebar from './Sidebar'
import './SidebarData'
import SidebarData from './SidebarData'
export const Menu = () => {
    return (
        <div>
            <AppBar/>
            <Sidebar data={SidebarData}></Sidebar>
        </div>
    )
}
