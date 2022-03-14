import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  const { receitaRandom, setReceitaRandom } = useContext(AppContext);
  const fetchRandom = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    setReceitaRandom(results.meals);
  };

  useEffect(() => {
    fetchRandom('https://www.themealdb.com/api/json/v1/1/random.php');
  }, []);

  const history = useHistory();
  function handleClick({ target }) {
    if (target.value === 'ingredient') {
      history.push('/explore/foods/ingredients');
    } else if (target.value === 'nationality') {
      history.push('/explore/foods/nationalities');
    } else if (target.value === 'surprise') {
      console.log(receitaRandom[0].idMeal);
      history.push(`/foods/${receitaRandom[0].idMeal}`);
    }
  }
  return (
    <div>
      <Header title="Explore Foods" />
      <button
        data-testid="explore-by-ingredient"
        value="ingredient"
        type="button"
        onClick={ handleClick }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        value="nationality"
        type="button"
        onClick={ handleClick }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        value="surprise"
        type="button"
        onClick={ handleClick }
      >
        Surprise me!
      </button>
      <Footer />

    </div>
  );
}
