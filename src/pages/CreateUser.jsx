import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        role: '',
        status: true
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length > 250) {
            newErrors.username = 'Username cannot exceed 250 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (formData.email.length > 250) {
            newErrors.email = 'Email cannot exceed 250 characters';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length > 100) {
            newErrors.password = 'Password cannot exceed 100 characters';
        }

        if (formData.name && formData.name.length > 250) {
            newErrors.name = 'Name cannot exceed 250 characters';
        }

        if (formData.phone && formData.phone.length > 20) {
            newErrors.phone = 'Phone cannot exceed 20 characters';
        }

        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        setErrors(newErrors); // Actualizar los errores aquí
        return newErrors;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(); // Validar antes de enviar el formulario
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted successfully:', formData);
            navigate("/dashboard");
        }
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
            <div className="card p-4 px-5 rounded-4">
                <h4 className="card-title text-center mb-3">Create User</h4>
                <form className='my-2 row' onSubmit={onSubmit}>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="username" className='form-label ms-1'>Username</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.username ? 'is-invalid' : ''}`}
                            placeholder='Enter your username'
                            name="username"
                            value={formData.username}
                            onChange={onChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="email" className='form-label ms-1'>Email</label>
                        <input
                            type="email"
                            className={`form-control rounded-5 ${errors.email ? 'is-invalid' : ''}`}
                            placeholder='Enter your email'
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="password" className='form-label ms-1'>Password</label>
                        <input
                            type="password"
                            className={`form-control rounded-5 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder='Enter your password'
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="name" className='form-label ms-1'>Name</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.name ? 'is-invalid' : ''}`}
                            placeholder='Enter your name'
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="phone" className='form-label ms-1'>Phone</label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.phone ? 'is-invalid' : ''}`}
                            placeholder='Enter your phone'
                            name="phone"
                            value={formData.phone}
                            onChange={onChange}
                        />
                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className='mb-3 col-md-6'>
                        <label htmlFor="role" className='form-label ms-1'>Role</label>
                        <select
                            className={`form-control rounded-5 ${errors.role ? 'is-invalid' : ''}`}
                            name="role"
                            value={formData.role}
                            onChange={onChange}
                        >
                            <option value="">Select your role</option>
                            <option value="superAdmin">Super Admin</option>
                            <option value="generico">Genérico</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>
                    <div className="col-md-6">
                        <button type='submit' className='btn btn-primary rounded-5 w-100 mx-1' >Create </button>
                    </div>
                    <div className="col-md-6">
                        <button type='reset' className='btn btn-outline-danger rounded-5 w-100'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
