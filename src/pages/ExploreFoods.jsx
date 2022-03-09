import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods() {
  const history = useHistory();
  function handleClick({ target }) {
    if (target.value === 'ingredient') {
      history.push('/explore/foods/ingredients');
    } else if (target.value === 'nationality') {
      history.push('/explore/foods/nationalities');
    } else if (target.value === 'surprise') {
      history.push('/explore/foods/surprise');
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
