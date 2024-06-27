import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateUser from "../pages/CreateUser";


const RoutesAdmin = () => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
                <Route path='/create' element={<CreateUser></CreateUser>}></Route>
            </Routes>
        </>
    );
};

export default RoutesAdmin;