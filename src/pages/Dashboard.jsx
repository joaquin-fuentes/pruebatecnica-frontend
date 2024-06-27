import React from 'react';
import Sidebar from '../components/Sidebar';
import Users from '../components/Users';

/**
 * Componente para el dashboard principal.
 * 
 * Este componente renderiza el sidebar y la lista de usuarios en el dashboard.
 **/
const Dashboard = () => {
    return (
        <div className="d-flex flex-column flex-lg-row">
            <Sidebar />
            <div className="flex-grow-1 p-3">
                <Users />
            </div>
        </div>
    );
};

export default Dashboard;
