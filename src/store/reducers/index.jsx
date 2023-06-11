import { combineReducers } from "redux";
import user from "./user-reducer";
import auth from "./auth-reducer";
import recipes from "./recipes-reducer";
import ingredients from "./ingredient-reducer"
import tags from "./tag-reducer"
import interactions from "./interaction-reducer"
const reducers = combineReducers({
    auth,
    user,
    recipes,
    ingredients,
    tags,
    interactions,
});

export default reducers;
