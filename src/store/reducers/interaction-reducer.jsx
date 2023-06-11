import {
    SAVE_INTERACTION,
    DELETE_INTERACTION,
    EDIT_INTERACTION,
    CLEAR_INTERACTION
} from "../actions/interactions/interactions-types";


export default function recipes_reducer(state = {}, action) {
    switch (action.type) {
        // LOGIN
        case SAVE_INTERACTION:
            return {...state, savedInteraction: action.payload,deletedInteraction: null,editInteraction:false};
        case DELETE_INTERACTION:
            return {...state, deletedInteraction: action.payload,savedInteraction: null,editInteraction:false};
        case EDIT_INTERACTION:
            return {...state,editInteraction:action.payload};
        case CLEAR_INTERACTION:
            return {...state,editInteraction:false,deletedInteraction: null,savedInteraction: null};
        default:
            return state;
    }
}
