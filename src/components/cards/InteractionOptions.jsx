import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import "./RecipeOptions.css";
import { useDispatch } from "react-redux";
import { deleteInteractionById, editInteraction } from "../../store/actions/interactions/interactions-action";
import { Modal, Button } from 'react-bootstrap';
const InteractionOptions = (props) => {
    const interactionID = props.interactionID;
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (event) => {
        event.stopPropagation();
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(editInteraction(true));
    };

    const handleDeleteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleShow();
    };

    const handleConfirm = () => {
        dispatch(deleteInteractionById(interactionID));
        handleClose();
    };


    return (
        <>
            <Dropdown onClick={handleClick} className="position-absolute top-0 end-0 m-2 recipe-options">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0 p-0">
                    <FontAwesomeIcon icon={faEllipsisV} className="dropdown-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleEditClick} >Edit</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteClick} className="text-danger">Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure that you want to continue with this action?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default InteractionOptions;
