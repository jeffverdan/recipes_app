import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  const { receitaRandom, setReceitaRandom } = useContext(AppContext);
  const fetchRandom = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    setReceitaRandom(results.drinks);
  };

  useEffect(() => {
    fetchRandom('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }, []);
  const history = useHistory();
  function handleClick({ target }) {
    if (target.value === 'ingredient') {
      history.push('/explore/drinks/ingredients');
    } else if (target.value === 'surprise') {
      console.log(receitaRandom[0].idMeal);
      history.push(`/drinks/${receitaRandom[0].idDrink}`);
    }
  }
  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        data-testid="explore-by-ingredient"
        value="ingredient"
        type="button"
        onClick={ handleClick }
      >
        By Ingredient
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
