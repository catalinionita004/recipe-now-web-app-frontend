import {
    CLEAR_FILTER_TAGS,
    CLEAR_TAG_BY_ID,
    CLEAR_TAGS, SEARCHED_TAGS, TAG_BY_ID,
    TAGS_BY_NAME, TAGS_REQUEST,
} from "../types";

const initialState = {
    gettingTags: false,
    tagsByName: [],
};
export default function tags_reducer(state = {}, action) {
    switch (action.type) {
        // LOGIN
        case TAGS_REQUEST:
            return {...state, gettingTags: true};
        case TAGS_BY_NAME:
            return {
                ...state,
                gettingTags: false,
                tagsByName: action.payload,
            };
        case CLEAR_TAGS:
            return {
                ...state,
                gettingTags: false,
                tagsByName: [],
            };
        case SEARCHED_TAGS:
            return {
                ...state,
                searchedTags : action.payload,
            };
        case TAG_BY_ID:
            return {
                ...state,
                tagById : action.payload,
            }
        case CLEAR_TAG_BY_ID:
            return {
                ...state,
                tagById: null,
            }
        case CLEAR_FILTER_TAGS:
            return {
                ...state,
                searchedTags: []
            }

        default:
            return state;
    }
}
