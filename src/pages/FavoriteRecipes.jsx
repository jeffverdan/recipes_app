import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';
import AppContext from '../context/AppContext';

export default function RecipesDone() {
  const { favRecipe } = useContext(AppContext);
  const [favRecipeState, setFavRecipeState] = useState([]);
  // const test = favRecipe[0].meals;
  // console.log(favRecipe[0].meals);
  console.log(favRecipe);

  useEffect(() => {
    setFavRecipeState(favRecipe);
  }, []);

  const handleClickAll = () => {
    // Using reduce to filter Name
    setFavRecipeState(favRecipe);
  };

  const handleClickFood = () => {
    // Using reduce to filter Name
    const favRecipeReduce = favRecipe.reduce((filtered, recipe) => {
      if (recipe.idMeal !== undefined) {
        filtered.push(recipe);
      }
      return filtered;
    }, []);
    console.log(favRecipeReduce);
    setFavRecipeState(favRecipeReduce);
  };

  const handleClickDrink = () => {
    // Using reduce to filter Name
    const favRecipeReduce = favRecipe.reduce((filtered, recipe) => {
      if (recipe.idDrink !== undefined) {
        filtered.push(recipe);
      }
      return filtered;
    }, []);
    console.log(favRecipeReduce);
    setFavRecipeState(favRecipeReduce);
  };

  return (
    <div>
      <div>
        <Header title="Favorite Recipes" />
        <button
          data-testid="filter-by-all-btn"
          value="all"
          type="button"
          onClick={ handleClickAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          value="food"
          type="button"
          onClick={ handleClickFood }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          value="drink"
          type="button"
          onClick={ handleClickDrink }
        >
          Drinks
        </button>
      </div>
      {/* {favRecipe.map((item, index) => (console.log(item.meals[index].strTags.split(',')))) } */}
      {/* {const test = favRecipe[0].meals)} */}
      { favRecipe !== undefined
      && favRecipe !== null
      && favRecipeState.map((item, index) => (
        // <div key={ item.idMeal }>
        //   <h1>{item.strMeal}</h1>
        //   <img src={ item.strMealThumb } alt={ item.strMeal } />
        // </div>
        <div className="containerMainCard" key={ item.idMeal }>
          <DoneCard
            /* key={ item.idMeal } */
            idMeal={ item.idMeal ? item.idMeal : item.idDrink }
            strMeal={ item.strMeal ? item.strMeal : item.strDrink }
            strMealThumb={ item.strMealThumb ? item.strMealThumb : item.strDrinkThumb }
            index={ index }
            strTags={ item.strTags ? item.strTags.split(',') : null }
            strCategory={ `${item.strArea ? item.strArea : 'Alcoholic'
            } - ${item.strCategory}` }
            type={ item.idMeal ? 'foods' : 'drinks' }
          />
        </div>
      ))}
    </div>
  );
}
