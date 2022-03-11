import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore() {
  const history = useHistory();
  function handleClick({ target }) {
    if (target.value === 'foods') {
      history.push('/explore/foods');
    } else if (target.value === 'drinks') {
      history.push('/explore/drinks');
    }
  }

  return (
    <div>
      <Header title="Explore" />
      <button
        data-testid="explore-foods"
        value="foods"
        type="button"
        onClick={ handleClick }
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        value="drinks"
        type="button"
        onClick={ handleClick }
      >
        Explore Drinks
      </button>
      <Footer />

    </div>
  );
}
