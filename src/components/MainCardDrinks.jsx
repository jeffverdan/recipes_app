import React from 'react';
import PropTypes from 'prop-types';

const MainCardDrinks = ({ index, idDrink, strDrink, strDrinkThumb }) => (
  <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
    <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
    <img
      src={ strDrinkThumb }
      alt={ strDrink }
      width="30%"
      data-testid={ `${index}-card-img` }
    />
  </div>

);

MainCardDrinks.propTypes = {
  idDrink: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  strDrink: PropTypes.elementType.isRequired,
  strDrinkThumb: PropTypes.elementType.isRequired,
};

export default MainCardDrinks;
