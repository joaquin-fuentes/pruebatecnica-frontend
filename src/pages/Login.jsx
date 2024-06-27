import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    const validate = () => {
        const errors = {};
        if (!username) {
            errors.username = 'Username is required';
        } else if (username.length > 250) {
            errors.username = 'Username cannot exceed 250 characters';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length > 100) {
            errors.password = 'Password cannot exceed 100 characters';
        }

        return errors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            // Aquí podrías agregar la lógica para manejar el envío del formulario
            console.log('Form submitted successfully');
            navigate("/dashboard")
        }
    };

    return (
        <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card p-5 rounded-4">
                <h4 className="card-title text-center">Login</h4>
                <form className='my-2' onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label ms-1'>Username</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.username ? 'is-invalid' : ''}`}
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label ms-1'>Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-5 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
