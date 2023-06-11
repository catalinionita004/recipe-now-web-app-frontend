import axios from "axios";
import { APIs_URL } from "../../../constants/app_constants";

import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCEEDED,
    REGISTRATION_ERROR,
    CLEAR_REGISTRATION_DETAILS,
} from "../../types";

const URL = APIs_URL.STAGING;

export const userRegistration = (user) => async (dispatch) => {
    dispatch({ type: REGISTRATION_REQUEST });

    try {
        const response = await axios.post(`${URL}/auth/register`, user);
        if (response.data.success) {
            dispatch({
                type: REGISTRATION_SUCCEEDED,
                payload: response.data.body,
            });
            return { success: true };
        } else {
            dispatch({
                type: REGISTRATION_ERROR,
                payload: response.data.message,
            });
            return { success: false, errorMessage:response.data.message };
        }
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: REGISTRATION_ERROR,
            payload: error.response.data.message,
        });
        return { success: false, errorMessage:error.response.data.message };
    }
};


export function clearRegistrationDetails() {
    return {
        type: CLEAR_REGISTRATION_DETAILS,
        payload: null,
    };
}
