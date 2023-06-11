import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecommendedRecipes} from "../store/actions/recipes/recipes-action";
import Cookies from "universal-cookie";
import Spinner from "react-bootstrap/Spinner";
import RecipeCard from "../components/cards/RecipeCard";
import {Link} from "react-router-dom";
import BookmarkButton from "../components/buttons/bookmark-button";
import Header from "../components/header/Header";
import {INITIAL_EMPTY_CARDS} from "../constants/app_constants"
import {CLEAR_FILTER_TAGS} from "../store/actions/tags/tags-types";
import {CLEAR_FILTER_INGREDIENTS} from "../store/actions/ingredients/ingredients-types";

const RecipesRecommendations = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const recommendedRecipes = useSelector(
        (state) => state.recipes.recommendedRecipes
    );
    const [allRecommendedRecipes, setAllRecommendedRecipes] = useState(Array(INITIAL_EMPTY_CARDS).fill({}));


    useEffect(() => {

        if (Array.isArray(recommendedRecipes) && recommendedRecipes.length > 0) {
            if (allRecommendedRecipes.length === INITIAL_EMPTY_CARDS)
                setAllRecommendedRecipes(recommendedRecipes);
            else {
                const newRecipes = recommendedRecipes.filter(recipe => !allRecommendedRecipes.includes(recipe));
                setAllRecommendedRecipes(prevRecipes => {
                    let recipesCopy = [...prevRecipes];

                    const emptyCardIndices = recipesCopy.reduce((indices, recipe, i) => {
                        if (!recipe.id) indices.push(i);
                        return indices;
                    }, []).slice(-INITIAL_EMPTY_CARDS);

                    newRecipes.forEach((newRecipe, i) => {
                        if (i < emptyCardIndices.length) {
                            recipesCopy[emptyCardIndices[i]] = newRecipe;
                        }
                    });

                    return recipesCopy;
                });
            }
        }


    }, [recommendedRecipes]);

    const isUserAuthenticatedCookie = () => {
        return cookies.get("bn_aut");
    };

    useEffect(() => {
        dispatch({type:CLEAR_FILTER_TAGS})
        dispatch({type:CLEAR_FILTER_INGREDIENTS})
        document.title = "Recipes Recommendations | RecipeBook";
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            loadMoreRecipes();
        }
    };

    const loadMoreRecipes = () => {
        if (!loading) {
            setLoading(true);
            setAllRecommendedRecipes(prevRecipes => [...prevRecipes, ...Array(INITIAL_EMPTY_CARDS).fill({})]);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        console.log("apelez backend")
        dispatch(getRecommendedRecipes(page))
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [page]);

    return (
        <div className="recommended-recipes">
            <Header/>
            <div
                className="container py-5 h-100 d-flex justify-content-center align-items-center flex-column text-white text-center">
                <h1 className="fs-2">Your Recipes Recommendations</h1>
                {isUserAuthenticatedCookie() ? (
                    <>
                        {Array.isArray(allRecommendedRecipes) ? (
                            <div className="row">
                                {allRecommendedRecipes.map((recipe, index) => (
                                    <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                                        {recipe.id ? (
                                            <RecipeCard
                                                recipe={recipe}
                                                showOptions={false}
                                                optionsFromRecipeCard={false}
                                            />
                                        ) : (
                                            <RecipeCard
                                                emptyCard={true}/>
                                        )}
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </>
                ) : (
                    <>
                        <h1 className="fs-5 w-50 my-5">
                            Why you miss that chance! <br/> SIGN UP now to get our
                            Recommendations
                        </h1>
                        <Link className="text-decoration-none w-100" to={"/sign-up"}>
                            <BookmarkButton>Sign up</BookmarkButton>
                        </Link>

                        <p className="mt-5">Already have an account?</p>

                        <Link className="text-white link-hover" to={"/sign-in"}>
                            Sign in NOW
                        </Link>
                    </>
                )}
                <div></div>
            </div>
        </div>
    );
};

export default RecipesRecommendations;
