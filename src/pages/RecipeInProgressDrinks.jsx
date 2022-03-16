import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Title from '../components/FoodsDetailsComponents/Title';
import Buttons from '../components/FoodsDetailsComponents/Buttons';

export default function RecipeInProgressDrinks({ match }) {
  const [filterID, setFilterID] = useState([]);
  const idDrink = match.params.id;
  const [ingredientsLocal, setIngredientsLocal] = useState(
    localStorage.checkIngredients
      ? JSON.parse(localStorage.getItem('checkIngredients')) : [],
  );

  async function getDataMeals(url) {
    const results = await fetch(url).then((response) => response.json());
    const { drinks: drinkData } = results;
    setFilterID(drinkData[0]);
  }

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    getDataMeals(url);
    localStorage.setItem('checkIngredients', JSON.stringify(ingredientsLocal)); // Salva as informações dos ingredientes se atualizar a página
  }, [idDrink, ingredientsLocal]);

  const {
    strCategory,
    strDrink,
    strDrinkThumb,
    strInstructions,
    strAlcoholic,
  } = filterID;

  const receiveData = [{
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  }];

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
    } else {
      // Remove do localStorage
      const ingredientUnChk = inProgressIngredients.filter(
        (ingredient) => ingredient !== target.name,
      );
      localStorage.setItem('checkIngredients', JSON.stringify(ingredientUnChk));
    }
    setIngredientsLocal(JSON.parse(localStorage.getItem('checkIngredients')));
  }

  const MAX_INGREDIENTS = 15;
  const filterApartIngredients = Object.keys(filterID).indexOf('strIngredient1'); // Retorna um numero do 'strIngredient1' até o final da lista
  const valuesApartIngredients = Object.values(filterID) // Retorna o valor da key acima até no maximo 20
    .splice(filterApartIngredients, MAX_INGREDIENTS);
  const IngredientsList = valuesApartIngredients.filter((ingredient) => (
    ingredient !== null && ingredient !== ''));

  return (
    <div className="col">
      <div>
        <Title title={ strDrink } img={ strDrinkThumb } />
        <Buttons id={ idDrink } recipeData={ receiveData } type="drinks" />
      </div>

      <div className="col">
        <spam data-testid="recipe-category">{ strCategory }</spam>
        <p>Ingredients:</p>
        {IngredientsList.map((ingredient, id) => (
          <ul key={ id } data-testid={ `${id}-ingredient-step` }>
            <li>
              <input
                type="checkbox"
                checked={
                  ingredientsLocal
                  && ingredientsLocal.some((value) => value === ingredient)
                }
                name={ ingredient }
                onClick={ handleChecked }
              />
              {' '}
              { ingredient }
            </li>
          </ul>
        ))}
      </div>
      <div className="col">
        <h3>Instructions:</h3>
        <p data-testid="instructions">{ strInstructions }</p>
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

RecipeInProgressDrinks.propTypes = {
  match: PropTypes.object,
}.isRequired;
