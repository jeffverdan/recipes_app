import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MainCard.css';

const MainCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  index,
  tagName,
  strTags,
  strCategory,
}) => (
  <section
    data-testid={ `${index}-recipe-card` }
    key={ idMeal }
  >
    <div className="container-img">
      <img
        src={ strMealThumb }
        data-testid={ `${index}-horizontal-image` }
        alt={ strMeal }
        width="15%"
      />
      <div className="container-title">
        <h3 data-testid={ `${index}-horizontal-name` }>
          {strMeal}
        </h3>
      </div>
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        {strCategory}
      </h4>
      <h6 data-testid={ `${index}-horizontal-done-date` }>
        xxxxxxxxxx
      </h6>
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
        Share
      </button>
      <h6 data-testid={ `${index}-${tagName}-horizontal-tag` }>
        {strTags}
      </h6>
    </div>
  </section>
);

MainCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  strTags: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
  tagName: PropTypes.elementType.isRequired,
  strCategory: PropTypes.elementType.isRequired,
};

export default MainCard;
