import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';
import '../styles/Foods.css';

const LIM_MAP = 12;
const LIM_BUTTON = 5;

export default function Foods() {
  const {
    dataMeals,
    dataCategoryMeals,
    handleClick,
    handleAllClick,
  } = useContext(AppContext);

  return (
    <div>

      <Header title="Foods" loadingSearch />
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
        {dataMeals !== undefined
        && dataMeals !== null
        && dataMeals.slice(0, LIM_MAP).map((meal, index) => (
          <Link key={ meal.idMeal } to={ `/foods/${meal.idMeal}` }>
            <div className="containerMainCard" key={ meal.idMeal }>
              <MainCard
                idMeal={ meal.idMeal }
                strMeal={ meal.strMeal }
                strMealThumb={ meal.strMealThumb }
                index={ index }
              />
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
}
