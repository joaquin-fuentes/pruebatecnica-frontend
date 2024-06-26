import { MdDeleteOutline } from "react-icons/md";
import { deleteUser, getUsers, isUserSuperAdmin } from "../helpers/queries";
import Swal from "sweetalert2";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";

const UserItem = ({ user, setUsers, roles }) => {
    // Función para eliminar un usuario
    const eliminarUsuario = async () => {
        try {
            // Verificar si el usuario actual es super administrador
            const isSuperAdmin = await isUserSuperAdmin();

            if (!isSuperAdmin) {
                // Mostrar alerta si el usuario no tiene permisos de super administrador
                Swal.fire(
                    "Permission Denied",
                    "You do not have permission to perform this action",
                    "warning"
                );
                return;
            }

            // Mostrar una alerta de confirmación antes de eliminar el usuario
            Swal.fire({
                title: "Are you sure you want to delete this user?",
                text: "Once deleted, it cannot be recovered",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Llamar a la función para eliminar el usuario
                    const respuesta = await deleteUser(user._id);
                    if (respuesta.status === 200) {
                        Swal.fire(
                            "User Deleted",
                            `User ${user.username} has been deleted`,
                            "success"
                        );
                        // Actualizar la lista de usuarios después de la eliminación
                        const usersResp = await getUsers();
                        if (usersResp) {
                            setUsers(usersResp);
                        } else {
                            Swal.fire(
                                'An error occurred while trying to load data',
                                'Try this operation later',
                                'error'
                            );
                        }
                    } else {
                        Swal.fire("Error", "Try again later", "error");
                    }
                }
            });
        } catch (error) {
            console.error("Error checking super admin status or deleting user:", error);
            Swal.fire(
                "Error",
                "Try again later",
                "error"
            );
        }
    };

    // Función para obtener la descripción del rol basado en su ID
    const roleDescription = (id) => {
        const role = roles.find((role) => role._id === id);
        return role ? role.description : "Unknown role";
    };

    // Renderizado de la fila de la tabla para cada usuario
    return (
        <tr>
            <td className="table-cell">{user.username}</td>
            <td className="table-cell">{user.email}</td>
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.phone}</td>
            <td className="table-cell">{roleDescription(user.role)}</td>
            <td className="table-cell">{user.status ? "Active" : "Inactive"}</td>
            <td className="table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
            <td className="">
                {/* Componente para ver la información del usuario */}
                <UserInfo user={user} roleDescription={roleDescription}></UserInfo>
                {/* Componente para editar el usuario */}
                <UserEdit user={user} setUsers={setUsers}></UserEdit>
                {/* Botón para eliminar el usuario */}
                <button className="btn btn-danger btn-sm m-1" onClick={eliminarUsuario}>
                    <MdDeleteOutline />
                </button>
            </td>
        </tr>
    );
};

export default UserItem;
