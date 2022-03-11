import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Title from '../components/FoodsDetailsComponents/Title';
import Buttons from '../components/FoodsDetailsComponents/Buttons';

// Link que retirei conhecimento do match https://dev.to/ishakmohmed/history-location-match-in-react-summarized-like-crazy-9d1
export default function RecipesDetailsDrinks({ match }) {
  const [filterID, setFilterID] = useState([]);
  const [youtubeID, setYoutubeID] = useState([]); // Tive que colocar o ID do youtube no fetch, fora quebrava o cod
  const idDrink = match.params.id; // Pega id que está no link
  const SIX = 6; // Numero de drinks pedidos na recomendação
  const {
    allMeals,
    doneRecipes,
    setInProgressRecipes,
  } = useContext(AppContext);

  async function getDataMeals(url) {
    const results = await fetch(url).then((response) => response.json());
    const { drinks: drinkData } = results;
    setFilterID(drinkData[0]);
    if (drinkData[0].strVideo !== null) {
      setYoutubeID(drinkData[0].strVideo.replace('https://www.youtube.com/watch?v=', '')); // Gera ID do video do Youtube
    }
  }

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    getDataMeals(url);
  }, [idDrink]);

  const {
    strCategory,
    strDrink,
    strDrinkThumb,
    strInstructions,
    strVideo,
    strAlcoholic,
  } = filterID;

  // Logica retirada de https://stackoverflow.com/questions/37899422/splice-inside-object-keysobj-foreachfunctionindex
  const MAX_INGREDIENTS = 20;
  const filterApartIngredients = Object.keys(filterID).indexOf('strIngredient1'); // Retorna um numero do 'strIngredient1' até o final da lista
  const valuesApartIngredients = Object.values(filterID) // Retorna o valor da key acima até no maximo 20
    .splice(filterApartIngredients, MAX_INGREDIENTS);
  // Mesma lógica de cima só que agora com srtMeasure1
  const filterApartMeasure = Object.keys(filterID).indexOf('strMeasure1');
  const valuesApartMeasures = Object.values(filterID)
    .splice(filterApartMeasure, MAX_INGREDIENTS);

  const ingradientesAndMeasures = valuesApartIngredients.map((value, index) => value
  && value.concat(' - ', valuesApartMeasures[index]));

  // Inicia o inProgressRecipes quando vazio.
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
  // Retira do localStarage os dados de meals
  const {
    cocktails: drinksInProgress, meals,
  } = JSON.parse(localStorage.getItem('inProgressRecipes'));

  // Função quando click no botão salva os dados do inProgressRecipes
  function startRecipes() {
    const id = { [idDrink]: valuesApartIngredients };
    const inProgress = {
      cocktails: { ...drinksInProgress, ...id }, meals: { ...meals } };
    setInProgressRecipes([inProgress]);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  return (
    <div>
      <Title title={ strDrink } img={ strDrinkThumb } />
      <Buttons recipeData={ idDrink } type="drinks" />
      <h3 data-testid="recipe-category">{` ${strCategory} - ${strAlcoholic} `}</h3>

      <div>
        <p>Ingredients:</p>
        {ingradientesAndMeasures.map((ingredient, id) => ingredient !== null
        && ingredient !== '' && (
          <ul
            key={ id }
            data-testid={ `${id}-ingredient-name-and-measure` }
          >
            <li>{ ingredient }</li>
          </ul>
        ))}
      </div>

      <div>
        <h3>Instructions:</h3>
        <span data-testid="instructions">{ strInstructions }</span>
      </div>

      <div>
        {// Instalei um package npm do Youtube para construção do player https://www.npmjs.com/package/react-youtube
          strVideo !== null && (
            <div data-testid="video">
              <h3>Video in Youtube:</h3>
              <YouTube
                videoId={ youtubeID }
                data-testid="video"
              />
            </div>
          )
        }
      </div>
      <div>
        {/* Inicio do Carousel do Bootstrap */}
        <Carousel>
          { allMeals.slice(0, SIX).map((meal, index) => (
            <Carousel.Item key={ meal.idMeal }>
              <Link to={ `/foods/${meal.idMeal}` } key={ index }>
                <img
                  data-testid={ `${index}-recomendation-card` }
                  className="d-block w-100"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <Carousel.Caption>
                  <h4
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { meal.strMeal }
                  </h4>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {/* //Inicio da lógica do botão de rodapé */}
      {doneRecipes[0].doneDate === ''
        ? (
          <div>
            {Object.keys(foodsInProgress).some((id) => Number(id) !== idMeals)
              ? (
                <Link to={ `/foods/${idMeals}/in-progress` }>
                  <button
                    className="fixed-bottom"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ startRecipes }
                  >
                    Continue Recipe
                  </button>
                </Link>
              )
              : (
                <Link to={ `/foods/${idMeals}/in-progress` }>
                  <button
                    className="fixed-bottom"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ startRecipes }
                  >
                    Start Recipe
                  </button>
                </Link>
              )}
          </div>
        ) : (
          <div>
            <h3 className="btn fixed-bottom">Recipe is done!</h3>
          </div>
        ) }
    </div>
  );
}

RecipesDetailsDrinks.propTypes = {
  match: PropTypes.object,
}.isRequired;
