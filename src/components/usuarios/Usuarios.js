import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

import { Link, Route, Routes } from 'react-router-dom';
import { END_POINT } from '../../utils/conf';
import { DashboardUsers } from './DashboardUsers';
import { EditUser } from './EditUser';
import { NewUser } from './NewUser';

export const Usuarios = () => {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<DashboardUsers/>}/>
                    <Route path="nuevo" element={<NewUser />} />
                    <Route path="editar/:idUsuario" element={<EditUser />} />
                </Routes>
            </div>
        </>
    );
};
