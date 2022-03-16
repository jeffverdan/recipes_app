import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Title from '../components/FoodsDetailsComponents/Title';
import Buttons from '../components/FoodsDetailsComponents/Buttons';

export default function RecipeInProgressMeals({ match }) {
  const [filterID, setFilterID] = useState([]);
  const idMeals = match.params.id;
  // Recupera os ingredientes checked no localStorage
  const [ingredientsLocal, setIngredientsLocal] = useState(
    localStorage.checkIngredients
      ? JSON.parse(localStorage.getItem('checkIngredients')) : [],
  );

  async function getDataMeals(url) {
    const results = await fetch(url).then((response) => response.json());
    const { meals: mealData } = results;
    setFilterID(mealData[0]);
  }

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`;
    getDataMeals(url);
    localStorage.setItem('checkIngredients', JSON.stringify(ingredientsLocal)); // Salva as informações dos ingredientes se atualizar a página
  }, [idMeals, ingredientsLocal]);

  const MAX_INGREDIENTS = 20;
  const filterApartIngredients = Object.keys(filterID).indexOf('strIngredient1'); // Retorna um numero do 'strIngredient1' até o final da lista
  const valuesApartIngredients = Object.values(filterID) // Retorna o valor da key acima até no maximo 20
    .splice(filterApartIngredients, MAX_INGREDIENTS);
  const IngredientsList = valuesApartIngredients.filter((ingredient) => (
    ingredient !== null && ingredient !== ''));

  function saveRecipesLocalStorage() {
    const id = { [idMeals]: valuesApartIngredients };
    if (localStorage.inProgressRecipes) {
      const {
        meals: foodsInProgress, cocktails,
      } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgress = {
        cocktails: { ...cocktails }, meals: { ...foodsInProgress, ...id },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    const inProgress = {
      cocktails: {}, meals: { ...id },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  // Verifica se o ingrediente está checked
  function handleChecked({ target }) {
    const inProgressIngredients = localStorage.checkIngredients
      ? JSON.parse(localStorage.getItem('checkIngredients')) : [];
    if (target.checked) {
      // Adiciona ao localStorage
      if (localStorage.checkIngredients) {
        const ingredientChk = [...inProgressIngredients, target.name];
        localStorage.setItem('checkIngredients', JSON.stringify(ingredientChk));
      }
      saveRecipesLocalStorage();
    } else {
      // Remove do localStorage
      const ingredientUnChk = inProgressIngredients.filter(
        (ingredient) => ingredient !== target.name,
      );
      localStorage.setItem('checkIngredients', JSON.stringify(ingredientUnChk));
    }
    setIngredientsLocal(JSON.parse(localStorage.getItem('checkIngredients')));
  }

  const {
    strCategory,
    strMeal,
    strMealThumb,
    strInstructions,
    strArea,
  } = filterID;

  const receiveData = [{
    id: idMeals,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  }];

  return (
    <div className="col">
      <div>
        <Title title={ strMeal } img={ strMealThumb } />
        <Buttons id={ idMeals } recipeData={ receiveData } type="foods" />
      </div>

      <div className="col">
        <spam data-testid="recipe-category">{strCategory}</spam>
        <p>Ingredients:</p>
        {IngredientsList.map((ingredient, id) => (
          <ul key={ id } data-testid={ `${id}-ingredient-step` }>
            <li>
              <input
                type="checkbox"
                id="chkIngredient"
                checked={
                  ingredientsLocal
                  && ingredientsLocal.some((value) => value === ingredient)
                }
                name={ ingredient }
                onClick={ handleChecked }
              />
              {' '}
              {ingredient}
            </li>
          </ul>
        ))}
      </div>

      <div>
        <h3>Instructions:</h3>
        <span data-testid="instructions">{strInstructions}</span>
      </div>
      <Link to="/done-recipes">
        <button
          className="btn btn-primary col"
          disabled={ IngredientsList.length !== ingredientsLocal.length }
          type="button"
          data-testid="finish-recipe-btn"
        >
          Recipe is Done
        </button>
      </Link>
    </div>
  );
}

RecipeInProgressMeals.propTypes = {
  match: PropTypes.object,
}.isRequired;
