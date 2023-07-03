import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import RecipeCard from "../components/cards/RecipeCard";
import Circle from "../components/animation/circle";
import "./RecipesByUser.css"
import { useDispatch, useSelector } from "react-redux";
import { SEARCHED_CURRENT_PAGE } from "../store/actions/recipes/recipes-types";
import { getRecipesReviewedByUser, getRecipesSearched } from "../store/actions/recipes/recipes-action";
import Spinner from "react-bootstrap/Spinner";
import ReactPaginate from "react-paginate";

const RecipesReviewedByUser = (props) => {
    const reviewedRecipes = useSelector((state) => state.recipes.recipesReviewedPage);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (e) => setCurrentPage(e.selected);

    useEffect(() => {
        dispatch(getRecipesReviewedByUser(currentPage));
    }, [currentPage]);

    console.log("reviewedRecipes", reviewedRecipes);

    return (
        <div className="recipes-by-user">
            <Header />
            <Circle size="10" backgroundColor="beige" duration="25" top="15" left="-150" />
            <Circle size="15" backgroundColor="light-purple" duration="40" bottom="-100" left="-120" />

            <div className="container py-5 h-100 d-flex justify-content-center align-items-center flex-column text-white text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            { reviewedRecipes && reviewedRecipes.content && reviewedRecipes.content.length > 0 ? (
                                <div>
                                    <div>
                                        <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={reviewedRecipes.totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                        />
                                    </div>
                                    <p>No. recipes: {reviewedRecipes.totalElements}</p>
                                    <div className="row">
                                        {reviewedRecipes.content.map((recipe, index) => (
                                            <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
                                                {recipe.id ? (
                                                    <>
                                                        <RecipeCard recipe={recipe} showOptions={false} optionsFromRecipeCard={false} />
                                                    </>
                                                ) : (
                                                    <RecipeCard emptyCard={true} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={reviewedRecipes.totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                        />
                                    </div>
                                </div>
                            ) : reviewedRecipes && reviewedRecipes.numberOfElements === 0 ? (
                                <p>No recipe found with this specification</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipesReviewedByUser;
