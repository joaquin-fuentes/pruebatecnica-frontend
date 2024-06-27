import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { getUsers, getRoles, isUserSuperAdmin } from '../helpers/queries';
import UserItem from './UserItem';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRolesAndUsers = async () => {
            try {
                const rolesResp = await getRoles();
                if (rolesResp) {
                    setRoles(rolesResp);
                } else {
                    Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
                }

                const usersResp = await getUsers();
                if (usersResp) {
                    setUsers(usersResp);
                } else {
                    Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
                }
            } catch (error) {
                Swal.fire('An error occurred while trying to load data', 'Try this operation later', 'error');
            }
        };

        fetchRolesAndUsers();
    }, []);

    useEffect(() => {
        const checkSuperAdminStatus = async () => {
            const superAdminStatus = await isUserSuperAdmin();
            setIsSuperAdmin(superAdminStatus);
        };

        checkSuperAdminStatus();
    }, []);

    const handleCreateUserClick = () => {
        if (isSuperAdmin) {
            navigate("/admin/create");
        } else {
            Swal.fire(
                "Permission Denied",
                "You do not have permission to perform this action",
                "warning"
            );
        }
    };

    return (
        <div className="container" style={{ marginLeft: '250px' }}>
            <h2>Users</h2>
            <button className="btn btn-primary mb-3" onClick={handleCreateUserClick}>
                Create User
            </button>
            <div className="table-responsive" style={{ maxHeight: '80vh', maxWidth: '85%', overflowY: 'auto' }}>
                <table className="table table-dark table-hover">
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
