import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });

    const navegacion = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = { username: '', password: '' };

        if (username.trim() === '') {
            newErrors.username = 'Username is required';
        }
        if (password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            // Handle successful login here
            console.log('Form submitted:', { username, password });
            navegacion("/dashboard")
        }
    };
    return (
        <form onSubmit={handleSubmit} className='rounded my-3 mb-5'>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    placeholder='Username'
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-danger">{errors.username}</p>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    placeholder='Password'
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-danger">{errors.password}</p>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    );
};

export default FormLogin;