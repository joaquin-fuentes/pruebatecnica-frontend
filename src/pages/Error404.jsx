import React from 'react';
import { Link } from 'react-router-dom';

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