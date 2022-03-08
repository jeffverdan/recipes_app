import React from 'react';
import PropTypes from 'prop-types';

const MainCard = ({ idMeal, strMeal, strMealThumb }) => (
  <div key={ idMeal }>
    <h3>{strMeal}</h3>
    <img src={ strMealThumb } alt={ strMeal } width="30%" />
  </div>

);

MainCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
};

export default MainCard;
