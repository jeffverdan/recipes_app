import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchMeals, {
  fetchDrinks,
  fetchCategoryMeals,
  fetchCategoryDrinks,
  fetchFilterByCategory,
} from '../services/dataAPI';

function Provider({ children }) {
  // STATES do useState
  const [apiData, setApiData] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataCategoryMeals, setDataCategoryMeals] = useState([]);
  const [dataCategoryDrinks, setDataCategoryDrinks] = useState([]);
  // const [isDisplay, setIsDisplay] = useState(false);
  // const [displayMeals, setDisplayMeals] = useState([]);

  // const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  // PARA CADA STATE, PRECISA PASSAR O CONTEXT PARA O CHILDREN NO RETURN

  // USE EFFECT PARA PEGAR OS DADOS DA API
  useEffect(() => {
    async function fetchData() {
      const meals = await fetchMeals();
      const drinks = await fetchDrinks();
      const categoryMeals = await fetchCategoryMeals();
      const categoryDrinks = await fetchCategoryDrinks();
      setDataMeals(meals);
      setDataDrinks(drinks);
      setDataCategoryMeals(categoryMeals);
      setDataCategoryDrinks(categoryDrinks);
    }
    fetchData();
  }, []);

  const handleClick = async (group, { target }) => {
    const [type, data] = await fetchFilterByCategory(group, target.name);
    if (type === 'meals') setDataMeals(data);
    if (type === 'drinks') setDataDrinks(data);
  };

  const contextValue = {
    // FILIPE
    apiData,
    setApiData,
    dataMeals,
    dataDrinks,
    dataCategoryMeals,
    dataCategoryDrinks,
    handleClick,
    // JEFERSSON
    // ABNER
    // DANIEL
    // JOHNATHAN
  };

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
