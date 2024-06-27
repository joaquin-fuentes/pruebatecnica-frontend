import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"
import { login } from '../helpers/queries';

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (usuarioLogueado) => {
        login(usuarioLogueado).then((respuesta) => {
            if (respuesta) {
                if (respuesta !== "") {
                    const usuarioFromDB = { ...respuesta };
                    if (usuarioFromDB.status === true) {
                        sessionStorage.setItem("usuario", JSON.stringify(usuarioFromDB));
                        //    setUsuarioLogueado(usuarioFromDB);
                        console.log(usuarioFromDB)
                        Swal.fire("Welcome", "You have entered correctly", "success");
                        navigate("/admin/dashboard");
                    } else {
                        if (respuesta.status === 400) {
                            Swal.fire("Error", "Incorrect email or password", "error");
                        } else {
                            Swal.fire("Error", "Suspended user, please contact the administrator to solve the problem. Thank you.", "error");
                        }
                    }
                } else {
                    Swal.fire("Error", "Incorrect email or password", "error");
                }
            } else {
                Swal.fire("Error", "Incorrect email or password", "error");
            }
        });
    };

    return (
        <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card p-5 rounded-4">
                <h4 className="card-title text-center">Login</h4>
                <form className='my-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
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
                                    message:
                                        "The username must contain a maximum of 250 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.username?.message}
                        </p>
                    </div>
                    <div className='mb-3'>
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
                                    message:
                                        "The ppassword must contain a maximum of 100 characters",
                                },
                            })
                            }
                        />
                        <p className='text-danger'>
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className='mb-3'>
                        <a href="" className='text-decoration-none text-center w-100'>Did you forget your password?</a>
                    </div>
                    <button type='submit' className='btn btn-primary rounded-5 w-100' >Sign In</button>
                </form>
                <p className='text-center'>
                    <span>New user</span> <a href="">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
