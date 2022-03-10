import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCardDrinks from '../components/MainCard';

const LIM_MAP = 12;

export default function Drinks() {
  const { apiData } = useContext(AppContext);
  const { drinks } = apiData;

  return (
    <div>
      <Header title="Drinks" loadingSearch />
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
      ))}
      <Footer />
    </div>
  );
}
