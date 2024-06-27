const UserItem = ({ user, roles }) => {

    const roleDescription = (id) => {
        const role = roles.find(role => role._id === id);
        return role ? role.description : "Unknown role";
    }

    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{roleDescription(user.role)}</td>
            <td>{user.status ? "activo" : "inactivo"}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user.id)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default UserItem;
