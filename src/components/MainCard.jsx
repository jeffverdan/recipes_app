import React from 'react';
import PropTypes from 'prop-types';

const MainCard = ({ index, idMeal, strMeal, strMealThumb }) => (
  <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
    <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
    <img
      src={ strMealThumb }
      alt={ strMeal }
      width="30%"
      data-testid={ `${index}-card-img` }
    />
  </div>

);

MainCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
};

export default MainCard;
