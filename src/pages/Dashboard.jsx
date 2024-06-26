import React from 'react';
import Sidebar from '../components/Sidebar';
import Users from '../components/Users';

const Dashboard = () => {
    return (
        <div className="d-flex flex-column flex-lg-row">
            <Sidebar />
            <div className="flex-grow-1 p-3">
                <Users></Users>
            </div>
        </div>
    );
};

export default Dashboard;