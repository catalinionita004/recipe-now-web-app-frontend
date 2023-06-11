import axios from "axios";
import {APIs_URL} from "../../../constants/app_constants";
import {
    RECIPES_REQUEST,
    RECIPES_BY_ID,
    RECOMMENDED_RECIPES,
    CLEAR_RECIPES_DETAILS,
    RECIPES_BY_USER,
    ADD_NEW_RECIPE,
    DELETE_RECIPE,
    NOT_FOUND_RECIPE,
    RECIPES_SEARCHED,
    RECIPE_FILTER,
    TOTAL_ELEMENTS,
    SEARCHED_LOADING,
    TOTAL_SEARCHED_ELEMENTS,
    TOTAL_SEARCHED_PAGES,
    SEARCHED_CURRENT_PAGE, SEARCHED_NUMBER_OF_ELEMENTS_ON_CURRENT_PAGE
} from "../../types";
import {INITIAL_EMPTY_CARDS} from "../../../constants/app_constants";

const URL = APIs_URL.STAGING + "/recipe";


export const getRecipeById = (recipeId) => (dispatch) => {
    dispatch({type: RECIPES_REQUEST});

    axios.get(`${URL}/${recipeId}`).then((res) => {
        if (res.data.success)
            dispatch({type: RECIPES_BY_ID, payload: res.data.body});

    }).catch((error) => {
        console.error("A apărut o eroare în timpul preluării rețetei", error);
        dispatch({type: NOT_FOUND_RECIPE})
    });
};
export const getRecipesSearched = (filter) => {
    console.log(`${URL}/search?${filter}`);
    return (dispatch) => {
        dispatch({type: RECIPE_FILTER, payload: filter})
        return axios.get(`${URL}/search?${filter}&size=40`).then((res) => {
            if (res.data.success) {
                dispatch({type: RECIPES_SEARCHED, payload: res.data.body.content})
                dispatch({type: TOTAL_SEARCHED_ELEMENTS, payload: res.data.body.totalElements})
                dispatch({type: TOTAL_SEARCHED_PAGES, payload : res.data.body.totalPages})
                dispatch({type: SEARCHED_NUMBER_OF_ELEMENTS_ON_CURRENT_PAGE, payload: res.data.body.numberOfElements})
                dispatch({type: SEARCHED_CURRENT_PAGE, payload : res.data.body.number})
                dispatch({type: SEARCHED_LOADING, payload: false});
            }
        })
            .catch((error) => {
                console.error("A apărut o eroare în timpul cautarii rețetei", error);
            });
    };
};

export const getRecommendedRecipes = (page) => {
    return (dispatch) => {
        return axios.get(`${URL}/find-all-recommended?page=${page}&size=${INITIAL_EMPTY_CARDS}`).then((res) => {
            if (res.data.success) {
                dispatch({type: RECOMMENDED_RECIPES, payload: res.data.body.content})
            }
        })
            .catch((error) => {
                console.error("A apărut o eroare în timpul adăugării rețetei", error);
            });
    };
}


export const getRecipesByUser = (id) => (dispatch) => {
    axios.get(`${URL}/user`, {params: {id}}).then((res) => {
        if (res.data.success) {
            dispatch({type: RECIPES_BY_USER, payload: res.data.body});
        }
    });
};


export const addNewRecipe = (recipe) => {
    return (dispatch) => {
        return axios.post(`${URL}`, recipe)
            .then((response) => {
                dispatch({type: ADD_NEW_RECIPE, payload: response.data});
            })
            .catch((error) => {
                // Gestionează erorile aici
                console.error("A apărut o eroare în timpul adăugării rețetei", error);
            });
    };
};

export const deleteRecipeById = (recipeId) => (dispatch) => {
    return axios.delete(`${URL}/${recipeId}`)
        .then((res) => {
            if (res.data.success) {
                dispatch({type: DELETE_RECIPE, payload: res.data.body});
            }
            return res;
        })
        .catch((error) => {
            console.error("A apărut o eroare în timpul stergerei rețetei", error);
            throw error;
        });
};


export function clearRecipesDetails() {
    return {
        type: CLEAR_RECIPES_DETAILS,
        payload: null,
    };
}
