import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoodsIngredients() {
  const [ingredientsList, setIngredients] = useState('');
  const NUM = 12;
  const fetchApiJson = async (url) => {
    const results = await fetch(url).then((response) => response.json());
    setIngredients(results.meals);
  };

  useEffect(() => {
    fetchApiJson('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {ingredientsList && ingredientsList.slice(0, NUM).map((ingredient, index) => (
        <div key={ ingredient.idIngredient } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ ingredient.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
