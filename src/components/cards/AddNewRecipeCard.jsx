import React from "react";
import { useHistory } from "react-router-dom";
import "./RecipeCard.css";

const AddNewRecipeCard = () => {
    const history = useHistory();

    const redirectToNewRecipe = () => {
        history.push("/new-recipe");
    };

    return (
        <div className="col col-list d-flex justify-content-start align-items-center text-white">
            <div
                className="d-flex justify-content-between align-items-center flex-column w-100 h-75 overflow-hidden position-relative relative overflow-hidden rounded-xl gold-card"

            >
                <div className="h-75 d-flex justify-content-center align-items-center rounded-5 overflow-hidden position-relative image-container"  onClick={redirectToNewRecipe}>
                    <img
                        src="https://media.istockphoto.com/id/969655298/vector/recipe-card-template-cookbook-template-page-for-restaurant-cafe-bakery-and-fast-food.jpg?s=612x612&w=0&k=20&c=swhg_NMyUh7fvk9JNwqeKtplx3UPNAWBetLG5G0-Nu0="
                        alt="Add new recipe"
                        className="h-100 rounded-5"
                    />
                    <p className="fs-1 position-absolute center add-recipe-icon">[+]</p>
                </div>
            </div>
        </div>
    );
};

export default AddNewRecipeCard;
