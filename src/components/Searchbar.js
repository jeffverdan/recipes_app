import React, { useState } from 'react';
// import AppContext from '../context/AppContext';

const Searchbar = () => {
  const [searchbarFilter, setSearchbarFilter] = useState('');
  const [apiData, setApiData] = useState('');

  const fetchApiJson = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    setApiData(results);
  };

  const handleOnlyOneResponse = () => {
    const { meals } = apiData;
    if (meals.length === 1) {
      console.log('FOUND ONE ONLY');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (document.getElementById('ingredient').checked) {
      // console.log('ingredient');
      fetchApiJson(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchbarFilter}`);
    } else if (document.getElementById('name').checked) {
      // console.log('name');
      fetchApiJson(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchbarFilter}`);
      handleOnlyOneResponse();
    } else if (
      document.getElementById('firstLetter').checked && searchbarFilter.length === 1) {
      // console.log('firstLetter');
      fetchApiJson(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchbarFilter}`);
    } else if (searchbarFilter.length !== 1) {
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
          />
        </label>

        <label htmlFor="name">
          Name:
          <input
            type="radio"
            id="name"
            name="searchbar"
            data-testid="name-search-radio"
          />
        </label>

        <label htmlFor="firstLetter">
          First letter:
          <input
            type="radio"
            id="firstLetter"
            name="searchbar"
            data-testid="first-letter-search-radio"
          />
        </label>

        <label htmlFor="searchbar">
          Name:
          <input
            type="text"
            id="searchbar"
            name="searchbar"
            data-testid="name-filter"
            onChange={ handleNameChange }
            value={ searchbarFilter }
          />
        </label>

        <button type="submit" data-testid="exec-search-btn">Search</button>

      </form>
    </div>
  );
};

export default Searchbar;
