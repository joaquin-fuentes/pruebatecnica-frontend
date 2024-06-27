const URL_USER = import.meta.env.VITE_API_USER;
const URL_ROLE = import.meta.env.VITE_API_ROLE;

// FUNCION PARA REALIZAR LOGIN
export const login = async (user) => {
  try {
    const respuesta = await fetch(URL_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const datos = await respuesta.json();
    return {
      statusResp: respuesta.status,
      status: datos.status,
      username: datos.username,
      name: datos.name,
      role: datos.role,
      id: datos.uid,
      token: datos.token,
    };
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

// FUNCION PARA OBTENER USUARIOS
export const getUsers = async () => {
  try {
    const resp = await fetch(URL_USER);
    const listUsers = await resp.json();
    return listUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// FUNCION PARA OBTENER UN SOCIO
export const getUser = async (id) => {
  try {
    const resp = await fetch(`${URL_USER}/${id}`);
    const userEdit = await resp.json();
    return userEdit;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// FUNCION PARA CREAR USUARIOS
export const createUser = async (user) => {
  try {
    const resp = await fetch(`${URL_USER}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return resp;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// FUNCION PARA EDITAR UN USUARIO
export const updateUser = async (user, id) => {
  try {
    const resp = await fetch(`${URL_USER}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return resp;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// FUNCION PARA ELIMINAR UN USUARIO
export const deleteUser = async (id) => {
  try {
    const resp = await fetch(`${URL_USER}/${id}`, {
      method: "DELETE",
    });
    return resp;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// FUNCION PARA OBTENER ROLES
export const getRoles = async () => {
  try {
    const resp = await fetch(URL_ROLE);
    const listRoles = await resp.json();
    return listRoles;
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};
// FUNCION PARA VERIFICAR SI UN USUARIO ES SUPERADMIN
export const isUserSuperAdmin = async () => {
  try {
    // Obtener el usuario actual desde sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem("usuario"));
    if (!currentUser) {
      return false;
    }
    // Obtener el usuario completo (incluyendo detalles del rol) desde el backend
    const user = await getUser(currentUser.id);

    // Obtener todos los roles desde el backend
    const roles = await getRoles();

    // Encontrar el rol de superAdmin
    const superAdminRole = roles.find(role => role.description === 'superAdmin');
    
    if (!superAdminRole) {
      console.error('superAdmin role not found');
      return false;
    }

    // Verificar si el usuario tiene el rol de superAdmin
    return user.role === superAdminRole._id;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false; // En caso de error, retornar false por seguridad
  }
};
