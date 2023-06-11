import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";
import {
    CLEAR_INGREDIENTS, INGREDIENT_BY_ID,
    INGREDIENTS_BY_NAME,
} from "../../types";


const URL = APIs_URL.STAGING + "/ingredient";

export const getIngredientsByName = (name) => (dispatch) => {
    console.log(name)
    axios.get(`${URL}/name`, { params: { name } }).then((res) => {
        if (res.data.success) {
            console.log("mesaj trimis din actions"+res.data.body)
            dispatch({ type: INGREDIENTS_BY_NAME, payload: res.data.body});
        }
    }).catch(error => {
        console.error("A apărut o eroare la extragerea ingredients: ", error);
    });
};

export const getIngredientById = (id) => (dispatch) => {
    axios.get(`${URL}/${id}`).then((res) => {
        if (res.data.success) {
            dispatch({ type: INGREDIENT_BY_ID, payload: res.data.body});
        }
    }).catch(error => {
        console.error("A apărut o eroare la extragerea ingredientului: ", error);
    });
};



export function clearIngredients() {
    return {
        type: CLEAR_INGREDIENTS,
        payload: null,
    };
}
