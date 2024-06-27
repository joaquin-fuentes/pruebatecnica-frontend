import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Error404 from '../pages/Error404';
import RoutesAdmin from './RoutesAdmin';
import RoutesProtected from './RoutesProtected';

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/admin/*" element={
                    <RoutesProtected>
                        <RoutesAdmin></RoutesAdmin>
                    </RoutesProtected>
                }></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/' element={<Login></Login>}></Route>
                <Route path='/*' element={<Error404></Error404>}> </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;