import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MainCard.css';

const MainCard = ({ idMeal, strMeal, strMealThumb }) => (
  <section className="conteiner-mainCard">
    <div className="container-img" key={ idMeal }>
      <img src={ strMealThumb } alt={ strMeal } />
      <div className="container-title">
        <h3>{strMeal}</h3>
      </div>
    </div>
  </section>

);

MainCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
};

export default MainCard;
