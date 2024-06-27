import { AiTwotoneEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";

const UserItem = ({ user, roles }) => {

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
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}><MdDeleteOutline /></button>
            </td>
        </tr>
    );
};

export default UserItem;
