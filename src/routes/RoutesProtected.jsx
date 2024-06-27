import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente de protección de rutas.
 * 
 * Este componente se encarga de proteger rutas de la aplicación verificando si 
 * el usuario está autenticado. Si el usuario no está autenticado, redirige a la 
 * página de inicio de sesión.
 * 
 */
const RoutesProtected = ({ children }) => {
    // Obtener el usuario autenticado desde sessionStorage
    const userLoged = JSON.parse(sessionStorage.getItem('usuario')) || null;

    // Si no hay un usuario autenticado, redirigir a la página de inicio de sesión
    if (!userLoged) {
        return <Navigate to="/login" replace />;
    } else {
        // Si el usuario está autenticado, renderizar los componentes hijos
        return children;
    }
};

export default RoutesProtected;
