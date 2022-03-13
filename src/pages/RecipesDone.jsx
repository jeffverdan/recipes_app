import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneCard from '../components/DoneCard';
import AppContext from '../context/AppContext';

export default function RecipesDone() {
  const { doneRecepie } = useContext(AppContext);
  const [doneRecepieState, setDoneRecepieState] = useState([]);
  // const test = doneRecepie[0].meals;
  // console.log(doneRecepie[0].meals);
  console.log(doneRecepie);

  useEffect(() => {
    setDoneRecepieState(doneRecepie);
  }, []);

  const handleClickAll = () => {
    // Using reduce to filter Name
    setDoneRecepieState(doneRecepie);
  };

  const handleClickFood = () => {
    // Using reduce to filter Name
    const doneRecepieReduce = doneRecepie.reduce((filtered, recepie) => {
      if (recepie.idMeal !== undefined) {
        filtered.push(recepie);
      }
      return filtered;
    }, []);
    console.log(doneRecepieReduce);
    setDoneRecepieState(doneRecepieReduce);
  };

  const handleClickDrink = () => {
    // Using reduce to filter Name
    const doneRecepieReduce = doneRecepie.reduce((filtered, recepie) => {
      if (recepie.idDrink !== undefined) {
        filtered.push(recepie);
      }
      return filtered;
    }, []);
    console.log(doneRecepieReduce);
    setDoneRecepieState(doneRecepieReduce);
  };

  return (
    <div>
      <div>
        <Header title="Done Recipes" />
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
      {/* {doneRecepie.map((item, index) => (console.log(item.meals[index].strTags.split(',')))) } */}
      {/* {const test = doneRecepie[0].meals)} */}
      { doneRecepie !== undefined
      && doneRecepie !== null
      && doneRecepieState.map((item, index) => (
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
