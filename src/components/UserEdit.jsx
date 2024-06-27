import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { updateUser, getUsers, getUser, getRoles } from "../helpers/queries";

const UserEdit = ({ user, setUsers }) => {
    // Estado para controlar la visibilidad del modal
    const [show, setShow] = useState(false);

    // Estado para almacenar los roles disponibles
    const [roles, setRoles] = useState([]);

    // Estado para almacenar el rol actual del usuario
    const [currentUserRole, setCurrentUserRole] = useState("");

    // Estado para verificar si el usuario es superAdmin
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    // Estado para mostrar un loader mientras se cargan los datos
    const [loading, setLoading] = useState(true);

    // Hook de efecto para cargar roles y configuraciones iniciales
    useEffect(() => {
        getRoles()
            .then((resp) => {
                if (resp) {
                    setRoles(resp);

                    // Obtener el usuario actual desde sessionStorage
                    const currentUser = JSON.parse(sessionStorage.getItem("usuario"));

                    // Buscar la descripción del rol del usuario actual
                    const userRole = resp.find((role) => role._id === currentUser.role);
                    if (userRole) {
                        setCurrentUserRole(userRole.description);
                        setIsSuperAdmin(userRole.description === "superAdmin");
                    }
                    setLoading(false); // Indicar que los datos se han cargado
                } else {
                    Swal.fire(
                        "An error occurred while trying to load data",
                        "Try this operation later",
                        "error"
                    );
                }
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
                Swal.fire(
                    "An error occurred while trying to load data",
                    "Try this operation later",
                    "error"
                );
            });
    }, []);

    // Función para cerrar el modal
    const handleClose = () => setShow(false);

    // Función para abrir el modal de edición
    const handleShow = () => {
        if (!isSuperAdmin) {
            Swal.fire(
                "Permission Denied",
                "You do not have permission to perform this action",
                "warning"
            );
            return;
        }
        setShow(true);
    };

    // Configuración del useForm para manejar el formulario
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    // Función para enviar el formulario de edición
    const onSubmit = (userUpdated) => {
        if (!isSuperAdmin) {
            Swal.fire(
                "Permission Denied",
                "You do not have permission to perform this action",
                "warning"
            );
            return;
        }

        updateUser(userUpdated, user._id)
            .then((resp) => {
                if (resp && resp.status === 200) {
                    Swal.fire(
                        "Update user",
                        `User: ${userUpdated.username} was updated correctly`,
                        "success"
                    );
                    handleClose();
                    getUsers().then((resp) => {
                        setUsers(resp);
                    });
                } else {
                    Swal.fire(
                        "An error occurred",
                        `User: ${userUpdated.username} was NOT updated. Try this operation later`,
                        "error"
                    );
                }
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                Swal.fire(
                    "An error occurred",
                    `User: ${userUpdated.username} was NOT updated. Try this operation later`,
                    "error"
                );
            });
    };

    // Hook de efecto para cargar los datos del usuario al abrir el modal
    useEffect(() => {
        getUser(user._id)
            .then((resp) => {
                setValue("username", resp.username);
                setValue("email", resp.email);
                setValue("name", resp.name);
                setValue("phone", resp.phone);
                setValue("role", resp.role);
                setValue("status", resp.status);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                Swal.fire(
                    "An error occurred while trying to load data",
                    "Try this operation later",
                    "error"
                );
            });
    }, []);

    // Si los datos aún se están cargando, mostrar un mensaje de carga
    if (loading) {
        return <p>Loading...</p>;
    }

    // Renderizado del componente
    return (
        <>
            {/* Botón para abrir el modal de edición */}
            <button className="btn btn-warning btn-sm m-1" onClick={handleShow}>
                <AiTwotoneEdit />
            </button>
            {/* Modal de edición */}
            <Modal show={show} onHide={handleClose}>
                <form className="p-5 row" onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="text-center mb-5">Edit User</h4>
                    {/* Campo para editar el nombre de usuario */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="username" className="form-label ms-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className={`form-control rounded-5 ${errors.username ? "is-invalid" : ""
                                }`}
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "The username is required",
                                maxLength: {
                                    value: 250,
                                    message:
                                        "The username must contain a maximum of 250 characters",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.username?.message}</p>
                    </div>
                    {/* Campo para editar el correo electrónico */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label ms-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control rounded-5 ${errors.email ? "is-invalid" : ""
                                }`}
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "The email is required",
                                maxLength: {
                                    value: 250,
                                    message:
                                        "The email must contain a maximum of 250 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message:
                                        "The email must contain @ and end with .com, .es, .com.ar, or another ending",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>
                    {/* Campo para editar el nombre */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label ms-1">
                            Name
                        </label>
                        <input
                            type="name"
                            className={`form-control rounded-5 ${errors.name ? "is-invalid" : ""
                                }`}
                            placeholder="Enter your name"
                            {...register("name", {
                                maxLength: {
                                    value: 250,
                                    message: "The name must contain a maximum of 250 characters",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                    </div>
                    {/* Campo para editar el teléfono */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="phone" className="form-label ms-1">
                            Phone
                        </label>
                        <input
                            type="phone"
                            className={`form-control rounded-5 ${errors.phone ? "is-invalid" : ""
                                }`}
                            placeholder="Enter your phone"
                            {...register("phone", {
                                maxLength: {
                                    value: 20,
                                    message: "The phone must contain a maximum of 20 characters",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.phone?.message}</p>
                    </div>
                    {/* Campo para seleccionar el rol */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="role" className="form-label ms-1">
                            Role
                        </label>
                        <select
                            className={`form-control rounded-5 ${errors.role ? "is-invalid" : ""
                                }`}
                            name="role"
                            {...register("role", { required: "You must choose a role" })}
                        >
                            <option value="">Select your role</option>
                            {/* Opciones de roles */}
                            {roles.map((role) => (
                                <option key={role._id} value={role._id}>
                                    {role.description}
                                </option>
                            ))}
                        </select>
                        <p className="text-danger">{errors.role?.message}</p>
                    </div>
                    {/* Campo para seleccionar el estado */}
                    <div className="mb-3 col-md-6">
                        <label htmlFor="status" className="form-label ms-1">
                            Status
                        </label>
                        <select
                            className={`form-control rounded-5 ${errors.status ? "is-invalid" : ""
                                }`}
                            name="status"
                            {...register("status", { required: "You must choose a status" })}
                        >
                            <option value="">Select your status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                        <p className="text-danger">{errors.role?.message}</p>
                    </div>

                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary rounded-5 w-100 mx-1">
                            Edit
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            type="reset"
                            className="btn btn-outline-danger rounded-5 w-100"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default UserEdit;
