import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { updateUser, getUsers, getUser, getRoles } from "../helpers/queries";

const UserEdit = ({ user, setUsers }) => {
    const [show, setShow] = useState(false);
    const [roles, setRoles] = useState([]);
    const [currentUserRole, setCurrentUserRole] = useState("");
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Para mostrar un loader mientras se cargan los datos

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

    const handleClose = () => setShow(false);
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

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

    if (loading) {
        return <p>Loading...</p>; // Muestra un loader mientras se cargan los datos
    }

    return (
        <>
            <button className="btn btn-warning btn-sm m-1" onClick={handleShow}>
                <AiTwotoneEdit />
            </button>
            <Modal show={show} onHide={handleClose}>
                <form className="p-5 row" onSubmit={handleSubmit(onSubmit)}>
                    <h4 className="text-center mb-5">Edit User</h4>
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
                                        "El email debe contener @ y terminar en .com, .es, .com.ar u otra terminación",
                                },
                            })}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>

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
                            {roles.map((role) => (
                                <option key={role._id} value={role._id}>
                                    {role.description}
                                </option>
                            ))}
                        </select>
                        <p className="text-danger">{errors.role?.message}</p>
                    </div>
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
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
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
