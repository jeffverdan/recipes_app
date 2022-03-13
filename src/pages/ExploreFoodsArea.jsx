import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FilterArea from '../components/FilterArea';
import MainCard from '../components/MainCard';
import AppContext from '../context/AppContext';

export default function ExploreFoodsArea() {
  const { filterAll/* , filterCountry */ } = useContext(AppContext);
  const NUM_LIM = 12;
  console.log(filterAll);
  return (
    <div>
      <Header title="Explore Nationalities" loadingSearch />
      <FilterArea />
      { filterAll.slice(0, NUM_LIM)
        .map((item, index) => (
          <Link to={ `/foods/${item.idMeal}` } key={ item.idMeal }>
            <div className="containerMainCard">
              <MainCard
                data-testid={ `${index}-recipe-card` }
                idMeal={ item.idMeal }
                strMeal={ item.strMeal }
                strMealThumb={ item.strMealThumb }
                index={ index }
              />
            </div>
          </Link>
        ))}
      <Footer />
    </div>
  );
}
