import {
     LOGIN_REQUEST,
     LOGIN_FAILURE,
     LOGIN_SUCCEEDED,
     CLEAR_LOGIN_DETAILS,
     GET_CURRENT_USER,
} from "../types";

export default function auth_reducer(state = {}, action) {
     switch (action.type) {
          // LOGIN
          case LOGIN_REQUEST:
               return { ...state, loginRequest: true };
          case LOGIN_SUCCEEDED:
               return {
                    ...state,
                    authenticatedUser: action.payload,
                    isUserAuthenticated: true,
                    loginRequest: false,
               };
          case LOGIN_FAILURE:
               return {
                    ...state,
                    loginError: action.payload,
                    isUserAuthenticated: false,
                    loginErrorOccurred: true,
                    loginRequest: false,
               };
          case GET_CURRENT_USER:
               return {
                    ...state,
                    currentUser: action.payload,
               };
          case CLEAR_LOGIN_DETAILS:
               return {
                    ...state,
                    currentUser: null,
                    loginError: action.payload,
                    isUserAuthenticated: null,
                    loginErrorOccurred: null,
                    loginRequest: null,
               };

          default:
               return state;
     }
}
