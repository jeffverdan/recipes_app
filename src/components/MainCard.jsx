import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MainCard.css';

const MainCard = ({ idMeal, strMeal, strMealThumb, index }) => (
  <section
    data-testid={ `${index}-recipe-card` }
    key={ idMeal }
  >
    <div className="container-img">
      <img
        src={ strMealThumb }
        data-testid={ `${index}-card-img` }
        alt={ strMeal }
        width="15%"
      />
      <div className="container-title">
        <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
      </div>
    </div>
  </section>
);

MainCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
  index: PropTypes.string.isRequired,
};

export default MainCard;