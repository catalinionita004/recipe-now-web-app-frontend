import axios from "axios";
import {SAVE_INTERACTION, DELETE_INTERACTION, EDIT_INTERACTION} from "./interactions-types";
import {APIs_URL} from "../../../constants/app_constants";
const URL = APIs_URL.STAGING + "/interaction";
export const saveInteraction = (interaction) => {
    return (dispatch) => {
        return axios.post(`${URL}`, interaction)
            .then((response) => {
                dispatch({ type: SAVE_INTERACTION, payload: response.data.body });
            })
            .catch((error) => {
                console.error("SAVE error interaction", error);
            });
    };
};

export const deleteInteractionById = (interactionId) => (dispatch) => {
    return axios.delete(`${URL}/${interactionId}`)
        .then((res) => {
            if (res.data.success) {
                dispatch({type: DELETE_INTERACTION, payload: res.data.body});
                console.log(res.data.body)
            }

            return res;
        })
        .catch((error) => {
            console.error("DELETE error interaction", error);
            throw error;
        });
};

export const editInteraction = (flag)=> (dispatch) => {
    dispatch({type: EDIT_INTERACTION, payload: flag});
};