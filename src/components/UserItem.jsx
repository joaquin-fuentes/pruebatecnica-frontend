import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { deleteUser, getUsers } from "../helpers/queries";
import Swal from "sweetalert2";


const UserItem = ({ user, setUsers, roles }) => {

    const eliminarProducto = () => {
        Swal.fire({
            title: "¿Are you sure to remove the product?",
            text: "Once deleted it cannot be recovered",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                //aqui tengo que hacer la peticion delete
                deleteUser(user._id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            "Removed Product",
                            `User ${user.username} was deleted`,
                            "success"
                        );
                        console.log(respuesta)
                        getUsers().then((resp) => {
                            if (resp) {
                                setUsers(resp);
                            }
                            else {
                                Swal.fire(
                                    'An error occurred while trying to load data',
                                    'Try this operation later',
                                    'error'
                                );
                            }
                        });
                    } else {
                        Swal.fire("There was an error", "Try again later", "error");
                    }
                });
            }
        });
    };

    const roleDescription = (id) => {
        const role = roles.find(role => role._id === id);
        return role ? role.description : "Unknown role";
    }

    return (
        <tr>
            <td className="table-cell">{user.username}</td>
            <td className="table-cell">{user.email}</td>
            <td className="table-cell">{user.name}</td>
            <td className="table-cell">{user.phone}</td>
            <td className="table-cell">{roleDescription(user.role)}</td>
            <td className="table-cell">{user.status ? "activo" : "inactivo"}</td>
            <td className="table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>
            <td className="">
                <button className="btn btn-success btn-sm me-2 text-light" onClick={() => handleDelete(user.id)}><IoEyeSharp />
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user.id)}><AiTwotoneEdit /></button>
                <button className="btn btn-danger btn-sm" onClick={eliminarProducto}><MdDeleteOutline /></button>
            </td>
        </tr>
    );
};

export default UserItem;
