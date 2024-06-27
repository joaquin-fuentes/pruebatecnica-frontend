import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createUser, getRoles, isUserSuperAdmin } from '../helpers/queries';

/**
 * Componente para crear nuevos usuarios.
 * 
 * Este componente permite a los usuarios con permisos de super administrador crear nuevos usuarios,
 * especificando nombre de usuario, email, contraseña, nombre, teléfono y rol.
 * 
 */
const CreateUser = () => {
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles disponibles
    const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Estado para verificar si el usuario es super administrador
    const navigate = useNavigate(); // Hook de navegación de React Router

    useEffect(() => {
        // Función asíncrona para obtener roles y verificar permisos de super administrador
        const fetchRolesAndPermissions = async () => {
            try {
                // Obtener roles disponibles desde la API
                const rolesResp = await getRoles();
                // Verificar si el usuario actual tiene permisos de super administrador
                const superAdminStatus = await isUserSuperAdmin();
                setRoles(rolesResp); // Actualizar estado con los roles obtenidos
                setIsSuperAdmin(superAdminStatus); // Actualizar estado con el estado de super administrador
            } catch (error) {
                console.error('Error fetching roles or checking permissions:', error);
                // Mostrar alerta en caso de error al cargar datos
                Swal.fire(
                    'An error occurred while trying to load data',
                    'Try this operation later',
                    'error'
                );
            }
        };

        fetchRolesAndPermissions(); // Llamar a la función para cargar roles y permisos al montar el componente
    }, []);

    const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Hook useForm para gestionar el formulario

    /**
     * Función para manejar el envío del formulario de creación de usuarios.
     */
    const onSubmit = async (formData) => {
        // Verificar si el usuario tiene permisos de super administrador
        if (!isSuperAdmin) {
            // Mostrar alerta si el usuario no tiene permisos de super administrador
            Swal.fire(
                'Permission Denied',
                'You do not have permission to create users.',
                'error'
            );
            return;
        }

        try {
            // Llamar a la función para crear usuario en la API
            const resp = await createUser(formData);
            // Verificar la respuesta de la API
            if (resp.status === 201) {
                // Mostrar alerta de éxito si el usuario se crea correctamente
                Swal.fire(
                    'Created user',
                    `The user ${formData.username} was created`,
                    'success'
                );
                navigate('/admin/dashboard'); // Navegar de vuelta al dashboard después de crear el usuario
                reset(); // Reiniciar el formulario después de la creación exitosa
            } else {
                throw new Error('User could not be created'); // Lanzar error si no se puede crear el usuario
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Mostrar alerta si ocurre un error al crear el usuario
            Swal.fire(
                'Error',
                'User could not be created, try again later',
                'error'
            );
        }
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
                            {...register('username', {
                                required: 'The username is required',
                                maxLength: {
                                    value: 250,
                                    message: "The username must contain a maximum of 250 characters",
                                },
                            })}
                        />
                        <p className='text-danger'>{errors.username?.message}</p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="email" className='form-label ms-1'>Email</label>
                        <input
                            type="email"
                            className={`form-control rounded-5 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder='Enter your email'
                            {...register('email', {
                                required: 'The email is required',
                                maxLength: {
                                    value: 250,
                                    message: "The email must contain a maximum of 250 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'The email must contain @ and end in .com, .es, .com.ar, or another domain'
                                }
                            })}
                        />
                        <p className='text-danger'>{errors.email?.message}</p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="password" className='form-label ms-1'>Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-5 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder='Enter your password'
                            {...register('password', {
                                required: 'The password is required',
                                maxLength: {
                                    value: 100,
                                    message: "The password must contain a maximum of 100 characters",
                                },
                            })}
                        />
                        <p className='text-danger'>{errors.password?.message}</p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="name" className='form-label ms-1'>Name</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.name ? 'is-invalid' : ''}`}
                            placeholder='Enter your name'
                            {...register('name', {
                                maxLength: {
                                    value: 250,
                                    message: "The name must contain a maximum of 250 characters",
                                },
                            })}
                        />
                        <p className='text-danger'>{errors.name?.message}</p>
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="phone" className='form-label ms-1'>Phone</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder='Enter your phone'
                            {...register('phone', {
                                maxLength: {
                                    value: 20,
                                    message: "The phone must contain a maximum of 20 characters",
                                },
                            })}
                        />
                        <p className='text-danger'>{errors.phone?.message}</p>
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
                        <p className='text-danger'>{errors.role?.message}</p>
                    </div>
                    <div className="col-md-6">
                        <button type='submit' className='btn btn-primary rounded-5 w-100 mx-1'>Create</button>
                    </div>
                    <div className="col-md-6">
                        <button type='reset' className='btn btn-outline-danger rounded-5 w-100' onClick={() => reset()}>Cancel</button>
                    </div>
                    <Link to={"/admin/dashboard"} className='text-center mt-4'>Return to dashboard</Link>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
