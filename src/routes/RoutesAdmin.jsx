import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateUser from "../pages/CreateUser";
import Error404 from "../pages/Error404";

/**
 * Componente de rutas para la sección de administración.
 * 
 * Este componente define las rutas específicas de la sección de administración de la aplicación.
 * 
 */
const RoutesAdmin = () => {
    return (
        <>
            <Routes>
                {/* Ruta para el panel de administración */}
                <Route path='/dashboard' element={<Dashboard />} />
                
                {/* Ruta para la creación de un nuevo usuario */}
                <Route path='/create' element={<CreateUser />} />
                
                {/* Ruta para manejar cualquier ruta no definida en la sección de administración */}
                <Route path='/*' element={<Error404 />} />
            </Routes>
        </>
    );
};

export default RoutesAdmin;
