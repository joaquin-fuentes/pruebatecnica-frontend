import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 py-3 bg-dark text-light" style={{ width: '250px', height: '100vh' }}>
            <h4 className="mb-3 text-center">Dashboard</h4>
            <h5 className='text-center'>Menú</h5>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item ">
                    <div className="dropdown w-100">
                        <button className="btn btn-secondary rounded-0 dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Seguridad
                        </button>
                        <ul className="dropdown-menu w-100 p-0 bg-secondary">
                            <li><Link className="btn btn-secondary rounded-0 w-100 h-100 " to="#">Usuarios</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;