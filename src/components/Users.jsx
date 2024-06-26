import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' }
    ]);

    const handleEdit = (id) => {
        // Logica para editar usuario
        console.log('Edit user with id:', id);
    };

    const handleDelete = (id) => {
        // Logica para eliminar usuario
        console.log('Delete user with id:', id);
        setUsers(users.filter(user => user.id !== id));
    };

   
    return (
        <div className="container mt-5">
            <h2>Usuarios</h2>
            <Link className="btn btn-primary mb-3" to={"/create"}>Crear Usuario</Link>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user.id)}>Editar</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;