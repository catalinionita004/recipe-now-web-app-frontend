import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";
import {
    CLEAR_TAGS, INGREDIENT_BY_ID, TAG_BY_ID,
    TAGS_BY_NAME,
} from "../../types";


const URL = APIs_URL.STAGING + "/tag";

export const getTagsByName = (name) => (dispatch) => {
    console.log(name)
    axios.get(`${URL}/name`, { params: { name } }).then((res) => {
        if (res.data.success) {
            console.log("mesaj trimis din actions"+res.data.body)
            dispatch({ type: TAGS_BY_NAME, payload: res.data.body});
        }
    }).catch(error => {
        console.error("A apărut o eroare la extragerea tags ", error);
    });
};

export const getTagById = (id) => (dispatch) => {
    axios.get(`${URL}/${id}`).then((res) => {
        if (res.data.success) {
            dispatch({ type: TAG_BY_ID, payload: res.data.body});
        }
    }).catch(error => {
        console.error("A apărut o eroare la extragerea tagului: ", error);
    });
};

export function clearTags() {
    return {
        type: CLEAR_TAGS,
        payload: null,
    };
}
