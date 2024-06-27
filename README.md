#  Prueba Tecnica para Trece Software
En este repositorio se encuentra la prueba tecnica para la empresa trece software, es para un proceso de seleccion de desarrollador frontend con react vite

**Página web:** 
https://pruebatecnica-trecesoftware.netlify.app/login

## Tabla de contenidos
- Login
- Dashboard
- Formularios para realizar CRUD de usuarios


### Características
- **Login**: Seccion para realizar login, donde se pide "username" y "password" 
- **Dashboard**: Contiene un Sidebar al lado izquierdo, con botones y enlaces.  y Una seccion para gestionar los usuarios.
- **Crear usuario**: DEs la pagina donde se encuentra el formulario para crear un usuario nuevo
- **Error404**: cuando una ruta no existe se redirecciona la error404 para una mejor navegacion


### Tecnologias utilizadas

- **Frontend**: React vite.
- **Routing**: React Router.
- **Estado**: useState, useEffect.
- **Estilos**: CSS, Bootstrap.

### Instalación
Para ejecutar el proyecto localmente sigue estos pasos:

**1- Clonar el repositorio**
git clone https://github.com/joaquin-fuentes/pruebatecnica-frontend

**2- Navegar al directorio del proyecto**
cd pruebatecnica-frontend

**3- Instalar dependencias**
npm install

**4- Configurar archivo .env**
crear un archivo .env en la carpeta principal del proyecto y agregar las siguientes variables de entorno

VITE_API_USER = https://pruebatecnica-backend.vercel.app/api/users
VITE_API_ROLE = https://pruebatecnica-backend.vercel.app/api/roles

**5- Iniciar la aplicación**
npm run dev

La aplicación se ejecutará en **http://localhost:5173**

### Uso

##### Navegación

LAl iniciar sesion se redirecciona al dashboard, luego hay botones para navegar por la pagina, y en cada seccion hay botones para volver o salir

#### Login

Para realizar el login:
1- Ingresar las credenciales de superadmin:
username: superadmin
password: 123456

2- Ingresar las credenciales de admin:
username: admin
password: 123456


#### Contacto

Para más informacion o consultas puede contarcarse:

- **Correo electrónico:** joaquin.fuentes1327@gmail.com
- **Teléfono:** 3816097754
