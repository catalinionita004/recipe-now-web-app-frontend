import {
    CLEAR_FILTER_INGREDIENTS,
    CLEAR_INGREDIENT_BY_ID,
    CLEAR_INGREDIENTS, INGREDIENT_BY_ID,
    INGREDIENTS_BY_NAME, INGREDIENTS_REQUEST, SEARCHED_INGREDIENTS,
} from "../types";

const initialState = {
    gettingIngredients: false,
    ingredientsByName: [],
};
export default function ingredients_reducer(state = {}, action) {
    switch (action.type) {
        // LOGIN
        case INGREDIENTS_REQUEST:
            return {...state, gettingIngredients: true};
        case INGREDIENTS_BY_NAME:
            return {
                ...state,
                gettingIngredients: false,
                ingredientsByName: action.payload,
            };
        case CLEAR_INGREDIENTS:
            return {
                ...state,
                gettingIngredients: false,
                ingredientsByName: [],
            };
        case SEARCHED_INGREDIENTS:
            return {
                ...state,
                searchedIngredients : action.payload,
            };
        case INGREDIENT_BY_ID:
            return {
                ...state,
                ingredientById : action.payload,
            }
        case CLEAR_INGREDIENT_BY_ID:
            return{
                ...state,
                ingredientById: null,
            }

        case CLEAR_FILTER_INGREDIENTS:
            return {
                ...state,
                searchedIngredients: []
            }



        default:
            return state;
    }
}
