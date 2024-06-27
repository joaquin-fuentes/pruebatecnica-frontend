import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import Error404 from '../pages/Error404';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
                <Route path='/create' element={<CreateUser></CreateUser>}></Route>
                <Route path='/' element={<Login></Login>}></Route>
                <Route path='/*' element={<Error404></Error404>}> </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;