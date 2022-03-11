import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinksIngredients() {
  const [ingredientsList, setIngredients] = useState('');
  const NUM = 12;
  const fetchApiJson = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    setIngredients(results.drinks);
  };

  useEffect(() => {
    fetchApiJson('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />

      {ingredientsList && ingredientsList.slice(0, NUM).map((ingredient, index) => (
        <div key={ ingredient.strIngredient1 } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt={ ingredient.strIngredient1 }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient1 }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
