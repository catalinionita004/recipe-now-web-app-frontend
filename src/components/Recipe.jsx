import React from 'react';

const Recipe = ({ props }) => {
    const recipe = props.recipe;

    return (
        <div>
            <h1>{recipe.name}</h1>
            <h2>Submitted by: {recipe.user.username}</h2>
            <h3>Nutrition:</h3>
            <ul>
                <li>Calories: {recipe.nutrition.calories}</li>
                <li>Fat: {recipe.nutrition.fat}</li>
                <li>Saturated Fat: {recipe.nutrition.saturatedFat}</li>
                <li>Carbohydrates: {recipe.nutrition.carbohydrates}</li>
                <li>Fiber: {recipe.nutrition.fiber}</li>
                <li>Protein: {recipe.nutrition.protein}</li>
                <li>Sodium: {recipe.nutrition.sodium}</li>
            </ul>

            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                ))}
            </ul>

            <h3>Steps:</h3>
            <ol>
                {recipe.recipeStepList
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step) => (
                        <li key={step.id}>{step.stepDescription}</li>
                    ))}
            </ol>

            <h3>Tags:</h3>
            <ul>
                {recipe.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                ))}
            </ul>

            <h3>Reviews:</h3>
            {recipe.interactions.map((interaction) => (
                <div key={interaction.id}>
                    <p>
                        Rating: {interaction.rating} | Review: {interaction.review}
                    </p>
                    <p>Date: {new Date(interaction.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Recipe;
