import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { getUsers, getRoles, isUserSuperAdmin } from '../helpers/queries';
import UserItem from './UserItem';

const Users = () => {
    // Estado para almacenar la lista de usuarios
    const [users, setUsers] = useState([]);
    // Estado para almacenar la lista de roles
    const [roles, setRoles] = useState([]);
    // Estado para indicar si el usuario actual es un super administrador
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    // Función de React Router para la navegación programática
    const navigate = useNavigate();

    // Efecto que se ejecuta al montar el componente para obtener roles y usuarios
    useEffect(() => {
        const fetchRolesAndUsers = async () => {
            try {
                // Obtener roles desde la API y actualizar el estado
                const rolesResp = await getRoles();
                if (rolesResp) {
                    setRoles(rolesResp);
                } else {
                    // Mostrar alerta si hay un error al cargar roles
                    Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
                }

                // Obtener usuarios desde la API y actualizar el estado
                const usersResp = await getUsers();
                if (usersResp) {
                    setUsers(usersResp);
                } else {
                    // Mostrar alerta si hay un error al cargar usuarios
                    Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
                }
            } catch (error) {
                // Mostrar alerta si hay un error general en la carga de datos
                Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
            }
        };

        // Llamar a la función para obtener roles y usuarios al montar el componente
        fetchRolesAndUsers();
    }, []);

    // Efecto para verificar si el usuario actual es un super administrador
    useEffect(() => {
        const checkSuperAdminStatus = async () => {
            // Obtener el estado de super administrador desde la API y actualizar el estado
            const superAdminStatus = await isUserSuperAdmin();
            setIsSuperAdmin(superAdminStatus);
        };

        // Llamar a la función para verificar el estado de super administrador al montar el componente
        checkSuperAdminStatus();
    }, []);

    // Función para manejar el clic en el botón "Create User"
    const handleCreateUserClick = () => {
        if (isSuperAdmin) {
            // Navegar a la página de creación de usuario si el usuario es super administrador
            navigate("/admin/create");
        } else {
            // Mostrar alerta si el usuario no tiene permisos de super administrador
            Swal.fire(
                "Permission Denied",
                "You do not have permission to perform this action",
                "warning"
            );
        }
    };

    // Renderizado del componente Users
    return (
        <div className="container" style={{ marginLeft: '250px', width:"96%" }}>
            {/* Título del componente */}
            <h2>Users</h2>
            {/* Botón para crear usuario, visible solo para super administradores */}
            <button className="btn btn-primary mb-3" onClick={handleCreateUserClick}>
                Create User
            </button>
            {/* Tabla responsiva para mostrar la lista de usuarios */}
            <div className="table-responsive" style={{ maxHeight: '80vh', maxWidth: '98%', overflowY: 'auto' }}>
                <table className="table table-dark table-hover">
                    {/* Encabezados de la tabla */}
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Creation Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla con los usuarios renderizados mediante el componente UserItem */}
                    <tbody className='table-group-divider'>
                        {users.map(user => (
                            <UserItem key={user._id} user={user} roles={roles} setUsers={setUsers} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
