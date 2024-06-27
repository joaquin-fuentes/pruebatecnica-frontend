import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente para la página de error 404 (Página no encontrada).
 * 
 * Este componente muestra un mensaje de error 404 y un enlace para volver a la página de inicio.
 * 
 */
const Error404 = () => {
    return (
        <div className='container d-flex justify-content-center flex-column align-items-center'>
            <p className='text-center fs-1 text-light mt-5'>ERROR 404</p>
            <p className='text-center fs-3 text-light '>Page not found</p>
            <Link to="/admin/dashboard" className='btn btn-primary ms-2'>
                Go back to start
            </Link>
        </div>
    );
};

export default Error404;
