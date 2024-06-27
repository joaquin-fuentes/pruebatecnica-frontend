import React from 'react';
import "./App.css"
import AppRouter from './routes/AppRouter';

/**
 * Componente principal de la aplicación.
 * 
 * Este componente se encarga de renderizar el enrutador principal de la aplicación,
 * que maneja las rutas y los componentes correspondientes para cada ruta.
 * 
 */
const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;