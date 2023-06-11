import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    clearRecipesDetails,
    getRecipesByUser,
} from "../store/actions/recipes/recipes-action";
import Cookies from "universal-cookie";
import Header from "../components/header/Header";
import { clearLoginDetails, getCurrentUser } from "../store/actions/auth/auth-actions";
import RecipeCard from "../components/cards/RecipeCard";
import Circle from "../components/animation/circle";
import AddNewRecipeCard from "../components/cards/AddNewRecipeCard";
import addNewRecipeCard from "../components/cards/AddNewRecipeCard";
import "./RecipesByUser.css"
import Spinner from "react-bootstrap/Spinner";
import {CLEAR_FILTER_TAGS} from "../store/actions/tags/tags-types";
import {CLEAR_FILTER_INGREDIENTS} from "../store/actions/ingredients/ingredients-types";
const RecipesByUser = (props) => {
    const dispatchRecipe = useDispatch();
    const dispatchUser = useDispatch();
    const dispatch = useDispatch();
    const cookies = new Cookies();

    const [showsDispatchedRecipe, setShowsDispatchedRecipe] = useState(false);
    const [showsDispatchedUser, setShowsDispatchedUser] = useState(false);

    const isUserAuthenticatedCookie = () => {
        return cookies.get("bn_aut");
    };

    useEffect(() => {
        dispatch({type:CLEAR_FILTER_TAGS})
        dispatch({type:CLEAR_FILTER_INGREDIENTS})
        document.title = "Recipes Recommendations | RecipeNow";
    });

    useEffect(() => {
        if (isUserAuthenticatedCookie() && !showsDispatchedUser) {
            dispatchUser(getCurrentUser());
            setShowsDispatchedUser(true);
        }

        return () => {
            dispatchUser(clearLoginDetails());
        };
    }, [dispatchUser, showsDispatchedUser]);

    const user = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        if (!showsDispatchedRecipe && isUserAuthenticatedCookie() && user) {
            dispatchRecipe(getRecipesByUser(user.id));
            setShowsDispatchedRecipe(true);
        }

        return () => {
            dispatchRecipe(clearRecipesDetails());
        };
    }, [dispatchRecipe, showsDispatchedRecipe, user]);

    const recipesByUser = useSelector((state) => state.recipes.recipesByUser);
    console.log("retele utilizatorului sunt"+recipesByUser)
    let updatedRecipesByUser = [];

    if (Array.isArray(recipesByUser)) {
        updatedRecipesByUser = [addNewRecipeCard, ...recipesByUser];
    } else {
        updatedRecipesByUser = [addNewRecipeCard];
    }
    return (
        <div className="recipes-by-user">
            <Header />
            <Circle
                size="10"
                backgroundColor="beige"
                duration="25"
                top="15"
                left="-150"
            />
            <Circle
                size="15"
                backgroundColor="light-purple"
                duration="40"
                bottom="-100"
                left="-120"
            />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {Array.isArray(recipesByUser) ? (
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
                                    <AddNewRecipeCard />
                                </div>
                                {recipesByUser.map((recipe) => (
                                    <div
                                        className="col-lg-3 col-md-6 col-sm-12 mb-4"
                                        key={recipe.id}
                                    >
                                        <RecipeCard recipe={recipe} showOptions={user && recipe.user && user.id === recipe.user.id} optionsFromRecipeCard={true} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RecipesByUser;
