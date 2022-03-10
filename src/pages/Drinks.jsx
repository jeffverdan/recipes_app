import React, { useContext } from 'react';
import MainCard from '../components/MainCard';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCardDrinks from '../components/MainCard';

const LIM_MAP = 12;
<<<<<<< HEAD
=======
const LIM_BUTTON = 5;
>>>>>>> ba4382dd76c009b5f869e424b8fb0b27622e8ce5

export default function Drinks() {
  const { 
    apiData,
    dataDrinks,
    dataCategoryDrinks,
    handleClick,
    handleAllClick,
  } = useContext(AppContext);
  const { drinks } = apiData;

  return (
    <div>
      <Header title="Drinks" loadingSearch />
<<<<<<< HEAD
      { drinks !== undefined
      && drinks !== null
      && drinks.slice(0, LIM_MAP).map((item, index) => (
        // <div key={ item.idMeal }>
        //   <h1>{item.strMeal}</h1>
        //   <img src={ item.strMealThumb } alt={ item.strMeal } />
        // </div>
        <MainCardDrinks
          key={ item.idDrink }
          index={ index }
          idMeal={ item.idDrink }
          strMeal={ item.strDrink }
          strMealThumb={ item.strDrinkThumb }
        />
=======
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleAllClick('allDrinks') }
        >
          All
        </button>
        {dataCategoryDrinks.slice(0, LIM_BUTTON).map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ index }
            name={ strCategory }
            onClick={ (e) => handleClick('drinks', e) }
            type="button"
          >
            {strCategory}
          </button>
        ))}
      </section>
      {dataDrinks.slice(0, LIM_MAP).map((drink, index) => (
        <div className="containerMainCard" key={ drink.idDrink }>
          <MainCard
            idMeal={ drink.idDrink }
            strMeal={ drink.strDrink }
            strMealThumb={ drink.strDrinkThumb }
            index={ index }
          />
        </div>
>>>>>>> ba4382dd76c009b5f869e424b8fb0b27622e8ce5
      ))}
      <Footer />
    </div>
  );
}
