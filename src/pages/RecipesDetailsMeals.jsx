import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Title from '../components/FoodsDetailsComponents/Title';
import Buttons from '../components/FoodsDetailsComponents/Buttons';

// Link que retirei conhecimento do match https://dev.to/ishakmohmed/history-location-match-in-react-summarized-like-crazy-9d1
export default function RecipesDetailsMeals({ match }) {
  const [filterID, setFilterID] = useState([]);
  const [youtubeID, setYoutubeID] = useState([]); // Tive que colocar o ID do youtube no fetch, fora quebrava o cod
  const idMeals = match.params.id; // Pega id que está no link
  const SIX = 6; // Numero de drinks pedidos na recomendação
  const {
    allDrinks,
    doneRecipes,
    setInProgressRecipes,
  } = useContext(AppContext);

  async function getDataMeals(url) {
    const results = await fetch(url).then((response) => response.json());
    const { meals: mealData } = results;
    setFilterID(mealData[0]);
    if (mealData[0].strYoutube !== null) {
      setYoutubeID(mealData[0].strYoutube.replace('https://www.youtube.com/watch?v=', '')); // Gera ID do video do Youtube
    }
  }

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`;
    getDataMeals(url);
  }, [idMeals]);

  const {
    strCategory,
    strMeal,
    strMealThumb,
    strInstructions,
    strYoutube,
    // strTags,
    strArea,
    // dateModified,
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

  // const storageRecipes = {
  //   id: idMeals,
  //   type: 'comida',
  //   nationality: strArea,
  //   category: strCategory,
  //   alcoholicOrNot: '',
  //   name: strMeal,
  //   image: strMealThumb,
  //   doneDate: '',
  //   tags: strTags,
  // };

  // Inicia o inProgressRecipes quando vazio.
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  // Retira do localStarage os dados de meals
  const {
    meals: foodsInProgress, cocktails,
  } = JSON.parse(localStorage.getItem('inProgressRecipes'));

  // Função quando click no botão salva os dados do inProgressRecipes
  function startRecipes() {
    const id = { [idMeals]: valuesApartIngredients };
    const inProgress = {
      cocktails: { ...cocktails }, meals: { ...foodsInProgress, ...id } };
    setInProgressRecipes([inProgress]);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }

  return (
    <div>
      <Title title={ strMeal } img={ strMealThumb } />
      <Buttons id={ idMeals } recipeData={ receiveData } type="foods" />
      <h3 data-testid="recipe-category">{ strCategory }</h3>

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
        <h3>Video in Youtube:</h3>
        {// Instalei um package npm do Youtube para construção do player https://www.npmjs.com/package/react-youtube
          strYoutube !== null && (
            <div data-testid="video">
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
          { allDrinks.slice(0, SIX).map((drink, index) => (
            <Carousel.Item key={ drink.idDrink }>
              <Link to={ `/drinks/${drink.idDrink}` } key={ index }>
                <img
                  data-testid={ `${index}-recomendation-card` }
                  className="d-block w-100"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <Carousel.Caption>
                  <h4
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { drink.strDrink }
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

RecipesDetailsMeals.propTypes = {
  match: PropTypes.object,
}.isRequired;
