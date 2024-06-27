import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";

import { Modal } from "react-bootstrap";
import { useState } from "react";

const UserInfo = ({ user, roleDescription }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <button className="btn btn-success btn-sm m-1 text-light" onClick={handleShow}>
                <IoEyeSharp />
            </button>
            <Modal show={show} onHide={handleClose}>
                <section className="p-4 bg-dark text-light d-flex flex-column justiy-content-center align-items-center">
                    <h5 className="text-center mb-4">User information</h5>
                    <p className="mb-3">
                        <strong className="me-1">Username: </strong><span>{user.username}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Email: </strong><span>{user.email}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Name: </strong><span>{user.name}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Phone: </strong><span>{user.phone}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Role: </strong><span>{roleDescription(user.role)}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Status: </strong><span>{user.status ? "activo" : "inactivo"}</span>
                    </p>
                    <p className="mb-3">
                        <strong className="me-1">Creation date: </strong><span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </p>
                    <button className="btn btn-outline-primary rounded-5 w-50 mt-3" onClick={handleClose}>Back</button>
                </section>
            </Modal>
        </>
    );
};

export default UserInfo;
