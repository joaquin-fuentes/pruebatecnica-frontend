import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { getUsers, getRoles } from '../helpers/queries';
import UserItem from './UserItem';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles().then((resp) => {
            if (resp) {
                setRoles(resp);
            }
            else {
                Swal.fire(
                    'An error occurred while trying to load data',
                    'Try this operation later',
                    'error'
                );
            }
        });
        getUsers().then((resp) => {
            if (resp) {
                setUsers(resp);
            }
            else {
                Swal.fire(
                    'An error occurred while trying to load data',
                    'Try this operation later',
                    'error'
                );
            }
        });
    }, []);

    return (
        <div className="container" style={{ marginLeft: '250px' }}>
            <h2>Usuarios</h2>
            <Link className="btn btn-primary mb-3" to={"/admin/create"}>Crear Usuario</Link>
            <div className="table-responsive" style={{ maxHeight: '80vh', maxWidth: '90%', overflowY: 'auto' }}>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Creation date</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {users.map(user => (
                            <UserItem key={user._id} user={user} roles={roles}></UserItem>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
