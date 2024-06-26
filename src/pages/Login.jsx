import React from 'react';
import FormLogin from '../components/FormLogin';

const Login = () => {
    return (
        <div className='container'>
            <h2 className='text-center mt-2'>Login</h2>
            <hr />

            <section className=' border rounded  p-4 mx-auto w-75'>
                <h3>Sign In</h3>
                <FormLogin></FormLogin>
                <h3>New User</h3>
                <button className='btn btn-outline-primary mt-2'>Sign Up</button>
            </section>
        </div>
    );
};

export default Login;