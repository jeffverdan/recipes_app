import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Searchbar = () => {
  const [searchbarFilter, setSearchbarFilter] = useState('');
  const [radioButtonClicked, setRadioButtonClicked] = useState('');
  const { apiData, setDataDrinks } = useContext(AppContext);

  const history = useHistory();

  const fetchApiJson = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    const { drinks } = results;
    // console.log(drinks);
    setDataDrinks(drinks);
  };

  useEffect(() => {
    const handleOnlyOneResponse = () => {
      const { drinks } = apiData;
      // console.log(apiData);
      // ? verifica se drinks existe. Verifica se drinks é um valor verdadeiro
      if (drinks !== undefined && drinks?.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
        // console.log('chegou');
      }
      if (drinks === null) {
        // history.push(`/drinks/${drinks[0].idMeal}`);
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    handleOnlyOneResponse();
  }, [apiData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (radioButtonClicked === 'ingredient') {
      // console.log(searchbarFilter);
      fetchApiJson(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchbarFilter}`);
    } else if (radioButtonClicked === 'name') {
      // console.log('name');
      fetchApiJson(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchbarFilter}`);
    } else if (
      radioButtonClicked === 'firstLetter'
      && searchbarFilter.length === 1) {
      // console.log('firstLetter');
      fetchApiJson(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchbarFilter}`);
    } else if (
      radioButtonClicked === 'firstLetter'
      && searchbarFilter.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    } else { console.log('Please select'); }
  };

  function handleNameChange(event) {
    setSearchbarFilter(event.target.value);
  }

  return (
    <div>
      <form
        onSubmit={ handleSubmit }
      >

        <label htmlFor="ingredient">
          Ingredient:
          <input
            type="radio"
            id="ingredient"
            name="searchbar"
            data-testid="ingredient-search-radio"
            onClick={ () => setRadioButtonClicked('ingredient') }
          />
        </label>

        <label htmlFor="name">
          Name:
          <input
            type="radio"
            id="name"
            name="searchbar"
            data-testid="name-search-radio"
            onClick={ () => setRadioButtonClicked('name') }
          />
        </label>

        <label htmlFor="firstLetter">
          First letter:
          <input
            type="radio"
            id="firstLetter"
            name="searchbar"
            data-testid="first-letter-search-radio"
            onClick={ () => setRadioButtonClicked('firstLetter') }
          />
        </label>

        <label htmlFor="searchbar">
          <input
            type="text"
            id="searchbar"
            name="searchbar"
            data-testid="search-input"
            onChange={ handleNameChange }
            value={ searchbarFilter }
            placeholder="Search"
          />
        </label>

        <button type="submit" data-testid="exec-search-btn">Search</button>

      </form>
    </div>
  );
};

export default Searchbar;
