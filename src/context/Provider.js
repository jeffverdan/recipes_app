import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchMeals, {
  fetchDrinks,
  fetchCategoryMeals,
  fetchCategoryDrinks,
  fetchFilterByCategory,
} from '../services/dataAPI';
// Contribuições de Talison Santana
function Provider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataCategoryMeals, setDataCategoryMeals] = useState([]);

  const [dataCategoryDrinks, setDataCategoryDrinks] = useState([]);
  const [lastButton, setLastButton] = useState('');

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
    const { name } = target;
    if (lastButton !== name) {
      if (type === 'meals') setDataMeals(data);
      if (type === 'drinks') setDataDrinks(data);
      console.log('if 1');
      setLastButton(name);
    }
    if (lastButton === name) {
      const meals = await fetchMeals();
      setDataMeals(meals);
      const drinks = await fetchDrinks();
      setDataDrinks(drinks);
      console.log('if 2');
      setLastButton('');
    }

    // if (selected[target.name] === false) {
    //   setSelected({
    //     ...selected,
    //     [name]: true,
    //   });

    //   console.log('if 1');
    // }
    // if (selected[target.name] === true) {
    // setSelected({
    //   ...selected,
    //   [name]: false,
    // });
    // const meals = await fetchMeals();
    // setDataMeals(meals);
    // const drinks = await fetchDrinks();
    // setDataDrinks(drinks);
    // console.log('if 2');
  };

  const handleAllClick = async (type) => {
    if (type === 'allDrinks') {
      const drinks = await fetchDrinks();
      setDataDrinks(drinks);
    }
    if (type === 'allMeals') {
      const meals = await fetchMeals();
      setDataMeals(meals);
    }
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
    handleAllClick,
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
