import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../components/FoodsDetailsComponents/Title';
import Buttons from '../components/FoodsDetailsComponents/Buttons';

// Link que retirei conhecimento do match https://dev.to/ishakmohmed/history-location-match-in-react-summarized-like-crazy-9d1
export default function RecipesDetailsFood({ match }) {
  const [filterID, setFilterID] = useState([]);
  const idMeals = match.params.id; // Pega id que está no link

  async function getDataMeals(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const results = await fetch(url).then((response) => response.json());
    setFilterID(results);
  }

  useEffect(() => {
    getDataMeals(idMeals);
  }, [idMeals]);

  console.log(filterID);
  const {
    strArea,
    strCatergory,
    strInstructions,
    strMeal,
    strMealThumb,
    strTags,
    strYoutube,
  } = filterID.meals[0];
  console.log(strArea);
  console.log(strCatergory);
  console.log(strInstructions);
  console.log(strTags);
  console.log(strYoutube);

  // const measureIngredientes = () => {
  //   const MAX_INGREDIENTES = 20;
  //   for (let i = 0; i <= MAX_INGREDIENTES; i += 1) {
  //     const concatIngredients = concat
  //       .concat(
  //         filterID.meals[0].strIngredient + i,
  //         ' - ',
  //         filterID.meals[0].strMeasure + i,
  //       );
  //     console.log(concatIngredients);
  //   }
  // };

  return (
    <div>
      <Title title={ strMeal } img={ strMealThumb } />
      <Buttons mealData={ filterID.meals[0] } type="food" />
      <span data-testid="recipe-category">{ strCatergory }</span>
    </div>
  );
}

RecipesDetailsFood.propTypes = {
  match: PropTypes.object,
}.isRequired;
