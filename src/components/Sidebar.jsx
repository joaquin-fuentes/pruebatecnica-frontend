import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate();

    // Función para manejar el logout
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Realizar logout
                // Supongamos que aquí borras el usuario de la sessionStorage
                sessionStorage.removeItem('usuario');

                // Redirigir al usuario a la página de login
                navigate('/login');
            }
        });
    };

    return (
        // Sidebar contenedor principal
        <div className="d-flex flex-column flex-shrink-0 py-3 bg-dark text-light fixed-top" style={{ width: '250px', height: '100vh' }}>
            <h4 className="mb-3 text-center">Dashboard</h4>
            <h5 className='text-center'>Menú</h5>
            {/* Lista de navegación */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    {/* Dropdown para la sección de seguridad */}
                    <div className="dropdown w-100">
                        <button className="btn btn-secondary rounded-0 dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Seguridad
                        </button>
                        <ul className="dropdown-menu w-100 p-0 bg-secondary">
                            {/* Enlace a la página de usuarios */}
                            <li><Link className="btn btn-secondary rounded-0 w-100 h-100" to="#">Usuarios</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
            {/* Botón de logout */}
            <button className='btn text-light btn-outline-secondary rounded-0 border-0' onClick={handleLogout}>
                Logout <CiLogout />
            </button>
        </div>
    );
};

export default Sidebar;
