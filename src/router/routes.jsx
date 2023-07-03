import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../views/Home";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import RecipeDetails from "../views/RecipeProfile";
import RecipeRecommendations from "../views/RecipesRecommendations";
import RecipesByUser from "../views/RecipesByUser";
import SaveRecipeForm from "../views/SaveRecipeForm";
import RecipesSearched from "../views/RecipesSearched";
import RecipesReviewedByUser from "../views/RecipesReviewedByUser";

export default function routes() {
     return (
          <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/home" redirect>
                    <Redirect to="/" />
               </Route>
               <Route path="/search" component={RecipesSearched} />
               <Route
                    exact
                    path="/recipes-recommendations"
                    component={RecipeRecommendations}
               />
               <Route exact path="/recipe-profile" component={RecipeDetails} />
               <Route exact path="/recipe-profile/edit" component={SaveRecipeForm} />
               <Route exact path="/my-recipes" component={RecipesByUser}/>
               <Route exact path="/my-reviewed-recipes" component={RecipesReviewedByUser}/>
               <Route exact path="/new-recipe" component={SaveRecipeForm}/>
               <Route path="/sign-up" component={SignUp} />
               <Route path="/sign-in" component={SignIn} />
          </Switch>
     );
}
