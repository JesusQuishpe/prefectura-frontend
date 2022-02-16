import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EditModulo } from './EditModulo';
import { NewModulo } from './NewModulo';
import { ModuloDashboard } from './ModuloDashboard';

export const Modulos = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<ModuloDashboard />} />
                    <Route path="nuevo" element={<NewModulo />} />
                    <Route path="editar/:idModulo" element={<EditModulo/>} />
                </Routes>
            </div>
        </>
    );
};
