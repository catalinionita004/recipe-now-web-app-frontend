import {
    RECIPES_REQUEST,
    TOTAL_ELEMENTS,
    RECIPES_BY_ID,
    RECOMMENDED_RECIPES,
    CLEAR_RECIPES_DETAILS,
    RECIPES_BY_USER,
    DELETE_RECIPE,
    NOT_FOUND_RECIPE,
    RECIPES_SEARCHED,
    RECIPE_FILTER,
    SEARCHED_LOADING,
    TOTAL_SEARCHED_ELEMENTS,
    TOTAL_SEARCHED_PAGES,
    SEARCHED_CURRENT_PAGE,
    SEARCHED_NUMBER_OF_ELEMENTS_ON_CURRENT_PAGE
} from "../types";

export default function recipes_reducer(state = {}, action) {
    switch (action.type) {
        // LOGIN
        case RECIPES_REQUEST:
            return {...state, gettingRecipes: true};
        case RECIPE_FILTER:
            return {...state, recipeFilter: action.payload}
        case RECIPES_SEARCHED:
            return {
                ...state,
                recipesSearchedPage: action.payload,
            };
        case TOTAL_SEARCHED_ELEMENTS:
            return {
                ...state,
                totalSearchedElements: action.payload,
            };
        case SEARCHED_CURRENT_PAGE:
            return {
                ...state,
                searchedCurrentPage : action.payload,
            }

        case TOTAL_SEARCHED_PAGES:
            return {
                ...state,
                totalSearchedPages: action.payload,
            };
        case SEARCHED_NUMBER_OF_ELEMENTS_ON_CURRENT_PAGE:
            return {
                ...state,
                searched_number_of_elements_on_current_page : action.payload,
            }

        case RECIPES_BY_ID:
            return {
                ...state,
                gettingRecipes: false,
                currentRecipe: action.payload,
                notFoundRecipe: false,
            };

        case RECOMMENDED_RECIPES:
            return {
                ...state,
                gettingRecipes: false,
                recommendedRecipes: action.payload,

            };
        case RECIPES_BY_USER:
            return {
                ...state,
                gettingRecipes: false,
                recipesByUser: action.payload,
            };
        case DELETE_RECIPE:
            const deletedRecipeId = action.payload.id;
            return {
                ...state,
                gettingRecipes: false,
                recipesByUser: state.recipesByUser ? state.recipesByUser.filter(recipe => recipe.id !== deletedRecipeId) : null,
                currentRecipe: state.currentRecipe && state.currentRecipe.id === deletedRecipeId ? null : state.currentRecipe,
                deletedRecipe: action.payload,
            }

        case NOT_FOUND_RECIPE:
            return {
                ...state,
                notFoundRecipe: true,
            }

        case CLEAR_RECIPES_DETAILS:
            return {
                ...state,
                gettingRecipes: action.payload,
                recipesList: action.payload,
                currentRecipe: action.payload,
                recommendedRecipes: action.payload,
                recipesCategories: action.payload,
                recipesByUser: action.payload,
                recipesSearchedPage: action.payload,
                recipeFilter: action.payload,
                totalSearchedElements: action.payload,
                totalSearchedPages: action.payload,
                searchedCurrentPage:action.payload,
                searchedLoading: false,
                searched_number_of_elements_on_current_page:action.payload,
            };
        case SEARCHED_LOADING:
            return {
                ...state,
                searchedLoading : action.payload,
            }



        default:
            return state;
    }
}
