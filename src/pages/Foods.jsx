import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainCard from '../components/MainCard';

export default function Foods() {
  const { apiData } = useContext(AppContext);
  const { meals } = apiData;
  console.log(meals);
  return (
    <div>
      <Header title="Foods" loadingSearch />
      { meals !== undefined && meals.map((item) => (
        // <div key={ item.idMeal }>
        //   <h1>{item.strMeal}</h1>
        //   <img src={ item.strMealThumb } alt={ item.strMeal } />
        // </div>
        <MainCard
          key={ item.idMeal }
          idMeal={ item.idMeal }
          strMeal={ item.strMeal }
          strMealThumb={ item.strMealThumb }
        />
      ))}
      <Footer />
    </div>
  );
}
