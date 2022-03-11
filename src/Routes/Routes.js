import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoodsArea from '../pages/ExploreFoodsArea';
import RecipesDone from '../pages/RecipesDone';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesDetailsDrinks from '../components/RecipesDetailsDrinks';
import RecipesDetailsMeals from '../components/RecipesDetailsMeals';

// Existe dois router pro profile por causa do teste 10 e 11
function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsArea }
      />
      <Route exact path="/done-recipes" component={ RecipesDone } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/drinks/:id?" component={ RecipesDetailsDrinks } />
      <Route exact path="/foods/:id?" component={ RecipesDetailsMeals } />
    </Switch>
  );
}

export default Routes;
