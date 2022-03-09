import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  const history = useHistory();
  function handleClick({ target }) {
    if (target.value === 'ingredient') {
      history.push('/explore/drinks/ingredients');
    } else if (target.value === 'surprise') {
      history.push('/explore/drinks/surprise');
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
        value="suprise"
        type="button"
        onClick={ handleClick }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
