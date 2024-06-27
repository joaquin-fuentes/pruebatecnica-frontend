import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div>
            error 404
            <Link to="/admin/dashboard" className='btn btn-primary ms-2'>Inicio</Link>
        </div>
    );
};

export default Error404;