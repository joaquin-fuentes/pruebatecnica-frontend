const URL_USUARIO = import.meta.env.VITE_API_USUARIO


export const login = async (usuario) =>{
    try {
      const respuesta = await fetch(URL_USUARIO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
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