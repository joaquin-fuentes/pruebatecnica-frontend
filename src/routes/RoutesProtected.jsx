import React from 'react';
import { Navigate } from 'react-router-dom';

const RoutesProtected = ({ children }) => {
    const userLoged = JSON.parse(sessionStorage.getItem('usuario')) || null;

    if (!userLoged) {
        return <Navigate to="/login" replace />;
    } else {
        return children;
    }
};

export default RoutesProtected;
