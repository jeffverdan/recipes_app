import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  // STATES do useState
  const [apiData, setApiData] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([
    {
      id: 0,
      type: '',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: [''],
    }]);
  const [allMeals, setAllMeals] = useState([]);

  const urlData = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlAllDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlAllMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  // PARA CADA STATE, PRECISA PASSAR O CONTEXT PARA O CHILDREN NO RETURN
  const contextValue = {
    // FILIPE
    apiData,
    setApiData,
    // JEFERSSON
    allDrinks,
    setAllDrinks,
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
    allMeals,
    setAllMeals,
    // ABNER
    // DANIEL
    // JOHNATHAN
  };

  useEffect(() => {
    async function storageDoneRecipes() {
      if (localStorage.doneRecipes) {
        const doneDate = JSON.parse(localStorage.getItem('doneRecipes'));
        setDoneRecipes(doneDate);
      }
    }
    storageDoneRecipes();
  }, []);

  // USEEFFECT PARA PEGAR OS DADOS DA API
  useEffect(() => {
    async function fetchData() {
      const results = await fetch(urlData).then((response) => response.json());
      setApiData(results);
    }
    fetchData();
  }, []);

  // PEGA TODAS AS RECEITAS DE DRINKS
  useEffect(() => {
    async function fetchData() {
      const results = await fetch(urlAllDrinks).then((response) => response.json());
      setAllDrinks(results.drinks);
    }
    fetchData();
  }, []);

  // PEGA TODAS AS RECEITAS DE MEALS
  useEffect(() => {
    async function fetchData() {
      const results = await fetch(urlAllMeals).then((response) => response.json());
      setAllMeals(results.meals);
    }
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default Provider;
