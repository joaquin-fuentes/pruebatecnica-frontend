const URL_USER = import.meta.env.VITE_API_USER
const URL_ROLE = import.meta.env.VITE_API_ROLE


//  FUNCION PARA REALIZAR LOGIN
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
      token: datos.token
    };
  } catch (error) {
  }
}

// FUNCION PARA OBTENER USUARIOS
export const getUsers = async () => {
  try {
    const resp = await fetch(URL_USER)
    const listUsers = await resp.json();
    return listUsers;
  } catch (error) {
  }
}
// FUNCION PARA OBTENER UN SOCIO
export const getUser = async (id)=>{
  try {
      const resp = await fetch(`${URL_USER}/${id}`)
      const userEdit = await resp.json()
      return userEdit

  } catch (error) {
      console.log(error)
      return null
  }
}

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
  }
};
// FUNCION PARA EDITAR UN USUARIO
export const updateUser = async (user, id) => {
  try {
    const resp = await fetch(`${URL_USER}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return resp

  } catch (error) {
    console.log(error)
    return null
  }
}
// FUNCION PARA ELIMINAR UN USUARIO
export const deleteUser = async (id) => {
  try {
    const resp = await fetch(`${URL_USER}/${id}`, {
      method: "DELETE"
    });
    return resp
  } catch (error) {
  }
}
// FUNCION PARA OBTENER ROLES
export const getRoles = async () => {
  try {
    const resp = await fetch(URL_ROLE)
    const listRoles = await resp.json();
    return listRoles;
  } catch (error) {
  }
}