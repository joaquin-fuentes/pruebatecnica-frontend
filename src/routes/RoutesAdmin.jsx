import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateUser from "../pages/CreateUser";
import Error404 from "../pages/Error404";

const RoutesAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
                <Route path='/create' element={<CreateUser></CreateUser>}></Route>
                <Route path='/*' element={<Error404></Error404>}> </Route>

            </Routes>
        </>
    );
};

export default RoutesAdmin;