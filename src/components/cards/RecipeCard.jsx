import React from "react";
import { useHistory } from "react-router-dom";
import Rating from "../Rating";
import RecipeOptions from "./RecipeOptions";
import "./RecipeCard.css";
import Timer from "./Timer";
import DateTimeDisplay from "./DateTimeDisplay";

const RecipeCard = (props) => {
    const { recipe, optionsFromRecipeCard, emptyCard = false } = props;
    const history = useHistory();

  
    if (emptyCard) {
        console.log("emptycard")
        return (
            <div className="empty-card">
                <div className="empty-image">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdycI5YfB-m900_I6HYMaUdmjt5-VI-97w6g&usqp=CAU"
                        alt="Empty Card"/>
                </div>
                <div className="empty-content">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

      // Verifica dacă există imageUrl în rețeta curentă
      
      const imageUrl = recipe.imageUrl ? recipe.imageUrl :  "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"

  
    return (
        <div className="col col-list d-flex justify-content-start align-items-center text-white">
            <div className="d-flex justify-content-between align-items-center flex-column w-100 h-75 overflow-hidden position-relative relative overflow-hidden rounded-xl">

                <Timer minutes={recipe.minutes}/>
                <div className="h-75 d-flex justify-content-center align-content-center rounded-5 overflow-hidden"
                     onClick={() =>
                         history.push("/recipe-profile", {
                             recipeId: recipe.id,
                         })
                     }>
                    <img
                        src={imageUrl}
                        alt={recipe.name}
                        className="h-100 rounded-5  cursor-pointer image-zoom"
                    />
                </div>
                {
                    props.showOptions &&
                    <RecipeOptions recipeId={recipe.id} optionsFromRecipeCard={optionsFromRecipeCard}/>
                }
                <h1
                    className=" fs-5 text-center mt-1 fw-bold cursor-pointer text-truncate"
                    style={{maxWidth: "100%", paddingBottom: "2px"}}
                    onClick={() =>
                        history.push("/recipe-profile", {
                            recipeId: recipe.id,
                        })
                    }
                    title={recipe.name}
                >
                    {recipe.name}
                </h1>

                <Rating averageRating={recipe.averageRating} ratingCount={recipe.ratingCount}/>

                {recipe.predictedValue ? (
                    <>
                        <p>{`predictedValue: ${recipe.predictedValue}`}</p>
                        {recipe.users && recipe.users.length > 0 && (
                            <p>
                                <strong>{recipe.users[0].firstName} {recipe.users[0].lastName}</strong> {recipe.users.length === 1 ? "liked this" : `and other ${recipe.users.length - 1} liked this`}
                            </p>
                        )}
                    </>
                ) : (
                    recipe.popularityScore && (
                        <>
                            <p>{`popularityScore: ${recipe.popularityScore}`}</p>
                            <p>people found this interesting</p>
                        </>
                    )
                )}
                <DateTimeDisplay date={recipe.submitted}/>
            </div>
        </div>
    );
};

export default RecipeCard;
