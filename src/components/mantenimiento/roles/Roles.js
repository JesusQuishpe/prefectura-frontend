import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditRol } from './EditRol';
import { NewRol } from './NewRol';
import { RolDashboard } from './RolDashboard';

export const Roles = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<RolDashboard />} />
                    <Route path="nuevo" element={<NewRol />} />
                    <Route path="editar/:idRol" element={<EditRol/>} />
                </Routes>
            </div>
        </>
    );
};
