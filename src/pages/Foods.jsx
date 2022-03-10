import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';
import '../styles/Foods.css';

const LIM_MAP = 12;

export default function Foods() {
  const { apiData } = useContext(AppContext);
  const { meals } = apiData;

  return (
    <div>

      <Header title="Foods" loadingSearch />
      { meals !== undefined
      && meals !== null
      && meals.slice(0, LIM_MAP).map((item, index) => (
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
      <Footer />
    </div>
  );
}
