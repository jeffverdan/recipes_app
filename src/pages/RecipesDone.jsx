import React, { useContext } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';
import AppContext from '../context/AppContext';

export default function RecipesDone() {
  const { doneRecepie } = useContext(AppContext);

  return (
    <div>
      <div>
        <Header title="Done Recipes" />
        <button
          data-testid="filter-by-all-btn"
          value="all"
          type="button"
        // onClick={ handleClick }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          value="food"
          type="button"
        // onClick={ handleClick }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          value="drink"
          type="button"
        // onClick={ handleClick }
        >
          Drinks
        </button>
      </div>
      { doneRecepie !== undefined
      && doneRecepie !== null
      && doneRecepie.map((item, index) => (
        // <div key={ item.idMeal }>
        //   <h1>{item.strMeal}</h1>
        //   <img src={ item.strMealThumb } alt={ item.strMeal } />
        // </div>
        <div className="containerMainCard" key={ item.idMeal }>
          <DoneCard
            /* key={ item.idMeal } */
            idMeal={ item.idMeal }
            strMeal={ item.strMeal }
            strMealThumb={ item.strMealThumb }
            index={ index }
            strTags={ item.strTags }
            strCategory={ item.strCategory }
          />
        </div>
      ))}
    </div>
  );
}
