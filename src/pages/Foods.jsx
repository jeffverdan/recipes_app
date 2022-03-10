import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';
import '../styles/Foods.css';

const LIM_MAP = 12;
const LIM_BUTTON = 5;

export default function Foods() {
  const {
    apiData,
    dataMeals,
    dataCategoryMeals,
    handleClick,
    handleAllClick,
  } = useContext(AppContext);
  const { meals } = apiData;
  return (
    <div>
      <Header title="Foods" loadingSearch />
      <section className="container-foods">
        {meals !== undefined && meals.slice(0, LIM_MAP).map((item, index) => (
          // <div key={ item.idMeal }>
          //   <h1>{item.strMeal}</h1>
          //   <img src={ item.strMealThumb } alt={ item.strMeal } />
          // </div>
          <div className="containerMainCard" key={ item.idMeal }>
            <MainCard
              /* key={ item.idMeal } */
              idMeal={ item.idMeal }
              strMeal={ item.strMeal }
              strMealThumb={ item.strMealThumb }
              index={ index }
            />
          </div>
        ))}
      </section>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleAllClick('allMeals') }
        >
          All
        </button>
        {dataCategoryMeals.slice(0, LIM_BUTTON).map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ index }
            name={ strCategory }
            onClick={ (e) => handleClick('meals', e) }
            type="button"
          >
            {strCategory}
          </button>
        ))}
      </section>
      <section>
        {dataMeals.slice(0, LIM_MAP).map((meal, index) => (
          <div className="containerMainCard" key={ meal.idMeal }>
            <MainCard
              idMeal={ meal.idMeal }
              strMeal={ meal.strMeal }
              strMealThumb={ meal.strMealThumb }
              index={ index }
            />
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
