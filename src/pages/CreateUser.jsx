import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createUser, getRoles } from '../helpers/queries';

const CreateUser = () => {
    const [roles, setRoles] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getRoles().then((resp) => {
            if (resp) {
                setRoles(resp);

                // Obtener el usuario actual desde sessionStorage
                const currentUser = JSON.parse(sessionStorage.getItem('usuario'));

                // Buscar la descripción del rol del usuario actual
                const userRole = resp.find(role => role._id === currentUser.role);
                if (userRole) {
                    setCurrentUserRole(userRole.description);
                }
            } else {
                Swal.fire(
                    'An error occurred while trying to load data',
                    'Try this operation later',
                    'error'
                );
            }
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (formData) => {
        if (currentUserRole !== 'superAdmin') {
            Swal.fire(
                'Permission Denied',
                'You do not have permission to create users.',
                'error'
            );
            return;
        }

        const newUser = { ...formData };
        createUser(newUser).then((resp) => {
            if (resp.status === 201) {
                Swal.fire(
                    'Created user',
                    `The user ${newUser.username} was created`,
                    'success'
                );
                navigate('/admin/dashboard');
                reset();
            } else {
                Swal.fire(
                    'Error',
                    'User could not be created, try again later',
                    'error'
                );
            }
        });
    };

    return (
        <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card p-4 px-5 rounded-4">
                <h4 className="card-title text-center mb-3">Create User</h4>
                <form className='my-2 row' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="username" className='form-label ms-1'>Username</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.username ? 'is-invalid' : ''}`}
                            placeholder='Enter your username'
                            {
                            ...register('username', {
                                required: 'The username is required',
                                maxLength: {
                                    value: 250,
                                    message: "The username must contain a maximum of 250 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.username?.message}
                        </p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="email" className='form-label ms-1'>Email</label>
                        <input
                            type="email"
                            className={`form-control rounded-5 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder='Enter your email'
                            {
                            ...register('email', {
                                required: 'The email is required',
                                maxLength: {
                                    value: 250,
                                    message: "The email must contain a maximum of 250 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'El email debe contener @ y terminar en .com, .es, .com.ar u otra terminación'
                                }
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="password" className='form-label ms-1'>Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-5 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder='Enter your password'
                            {
                            ...register('password', {
                                required: 'The password is required',
                                maxLength: {
                                    value: 100,
                                    message: "The password must contain a maximum of 100 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="name" className='form-label ms-1'>Name</label>
                        <input
                            type="name"
                            className={`form-control rounded-5 ${errors.name ? 'is-invalid' : ''}`}
                            placeholder='Enter your name'
                            {
                            ...register('name', {
                                maxLength: {
                                    value: 250,
                                    message: "The name must contain a maximum of 250 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.name?.message}
                        </p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="phone" className='form-label ms-1'>Phone</label>
                        <input
                            type="phone"
                            className={`form-control rounded-5 ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder='Enter your phone'
                            {
                            ...register('phone', {
                                maxLength: {
                                    value: 20,
                                    message: "The phone must contain a maximum of 20 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.phone?.message}
                        </p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="role" className='form-label ms-1'>Role</label>
                        <select
                            className={`form-control rounded-5 ${errors.role ? 'is-invalid' : ''}`}
                            name="role"
                            {...register("role", { required: "You must choose a role" })}
                        >
                            <option value="">Select your role</option>
                            {roles.map((role) => (
                                <option key={role._id} value={role._id}>
                                    {role.description}
                                </option>
                            ))}
                        </select>
                        <p className='text-danger'>
                            {errors.role?.message}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <button type='submit' className='btn btn-primary rounded-5 w-100 mx-1'>Create</button>
                    </div>
                    <div className="col-md-6">
                        <button type='reset' className='btn btn-outline-danger rounded-5 w-100' onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
