import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Error404 from '../pages/Error404';
import RoutesAdmin from './RoutesAdmin';
import RoutesProtected from './RoutesProtected';

/**
 * Componente de enrutamiento principal de la aplicación.
 * 
 * Este componente define las rutas principales de la aplicación, incluyendo las rutas protegidas
 * que requieren autenticación.
 * 
 */
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta protegida para la sección de administración */}
                <Route exact path="/admin/*" element={
                    <RoutesProtected>
                        <RoutesAdmin />
                    </RoutesProtected>
                } />

                {/* Ruta para la página de inicio de sesión */}
                <Route path='/login' element={<Login />} />

                {/* Ruta predeterminada redirigida a la página de inicio de sesión */}
                <Route path='/' element={<Login />} />

                {/* Ruta para manejar cualquier ruta no definida */}
                <Route path='/*' element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
