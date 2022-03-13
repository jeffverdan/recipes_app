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
  // STATES do useState
  const [apiData, setApiData] = useState([]);
  const [countrySelect, setCountrySelect] = useState([]);
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterAll, setFilterAll] = useState([]);
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
  const [doneRecepie, setDoneRecepie] = useState([
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strDrinkAlternate: null,
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: 'Bring a large pot of water to a boil. '
            + 'Add kosher salt to the boiling water,'
            + 'then add the pasta. Cook according to the package '
            + 'instructions, about 9 minutes.'
            + 'taste. Bring to a boil and cook for 5 minutes. Remove '
            + 'from the heat and add the chopped basil.\r\nDrain the '
            + 'pasta and add it to the sauce. Garnish with Parmigiano-'
            + 'Reggiano flakes and more basil and serve warm.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strTags: 'Pasta,Curry',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '1 pound',
      strMeasure2: '1/4 cup',
      strMeasure3: '3 cloves',
      strMeasure4: '1 tin ',
      strMeasure7: '6 leaves',
      strMeasure8: 'spinkling',
      strMeasure9: '',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: null,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
    {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      strInstructionsES: null,
      strInstructionsDE: null,
      strInstructionsFR: null,
      strInstructionsIT: 'Shakcio.\r\nFiltrare in una coppetta Martini.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strIngredient4: '',
      strIngredient5: '',
      strIngredient6: '',
      strIngredient7: '',
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: null,
    },
  ]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataCategoryMeals, setDataCategoryMeals] = useState([]);
  const [dataCategoryDrinks, setDataCategoryDrinks] = useState([]);
  const [lastButton, setLastButton] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setLastButton(name);
    }
    if (lastButton === name) {
      const meals = await fetchMeals();
      setDataMeals(meals);
      const drinks = await fetchDrinks();
      setDataDrinks(drinks);
      setLastButton('');
    }
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
    doneRecepie,
    setDoneRecepie,
    email,
    setEmail,
    password,
    setPassword,
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
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    dataCategoryMeals,
    dataCategoryDrinks,
    handleClick,
    handleAllClick,
    // DANIEL
    filterAll,
    setFilterAll,
    filterCountry,
    setFilterCountry,
    countrySelect,
    setCountrySelect,
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
