import React, {useState} from 'react';
import {Button, Dropdown, Modal} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import "./RecipeOptions.css";
import {useDispatch} from "react-redux";
import {deleteRecipeById} from "../../store/actions/recipes/recipes-action";
import {deleteInteractionById} from "../../store/actions/interactions/interactions-action";

const RecipeOptions = (props) => {
    const recipeId = props.recipeId;
    const optionsFromRecipeCard = props.optionsFromRecipeCard;
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = (event) => {
        event.stopPropagation();
    }

    const handleEditClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push("/recipe-profile/edit", {
            recipeId: recipeId,
        });
    };
    const handleDeleteClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        handleShow();
    };


    const handleConfirm = () => {
        dispatch(deleteRecipeById(recipeId))
        if(!optionsFromRecipeCard === true)
            history.goBack();
        handleClose();
    };

    return (
        <>
            <Dropdown onClick={handleClick} className="position-absolute top-0 end-0 m-2 recipe-options">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0 p-0">
                    <FontAwesomeIcon icon={faEllipsisV} className="dropdown-icon"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleEditClick}>Edit</Dropdown.Item>
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
    )
}

export default RecipeOptions;
