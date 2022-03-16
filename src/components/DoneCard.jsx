import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/MainCard.css';
// import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const DoneCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  index,
  strTags,
  strCategory,
  type,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const linkCopied = () => {
    copy(`http://localhost:3000/${type}/${idMeal}`);
    setIsClicked(true);
  };

  return (
    <section
      data-testid={ `${index}-recipe-card` }
      key={ idMeal }
    >
      <div className="container-img">
        <Link key={ idMeal } to={ `/${type}/${idMeal}` }>
          <img
            src={ strMealThumb }
            data-testid={ `${index}-horizontal-image` }
            alt={ strMeal }
            width="15%"
          />
          <div className="container-title">
            <h3 data-testid={ `${index}-horizontal-name` }>
              Nome:
              {strMeal}
            </h3>
          </div>
        </Link>

        <h4 data-testid={ `${index}-horizontal-top-text` }>
          Categora:
          {strCategory}
        </h4>
        <h6 data-testid={ `${index}-horizontal-done-date` }>
          23/06/2020
        </h6>
        <button
          type="button"
          // id="myButton1"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          onClick={ () => { linkCopied(); } }
        >
          Share
        </button>

        <button
          type="button"
          // id="myButton1"
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          // onClick={ () => { linkCopied(); } }
        >
          Favorite
        </button>

        { isClicked && <span>Link copied!</span> }
        {strTags !== undefined
      && strTags !== null
      && strTags.map((item) => (
        <h6 key={ item } data-testid={ `${index}-${item}-horizontal-tag` }>
          {item}
        </h6>
      ))}

      </div>
    </section>
  );
};

DoneCard.propTypes = {
  idMeal: PropTypes.elementType.isRequired,
  strTags: PropTypes.elementType.isRequired,
  index: PropTypes.number.isRequired,
  strMeal: PropTypes.elementType.isRequired,
  strMealThumb: PropTypes.elementType.isRequired,
  strCategory: PropTypes.elementType.isRequired,
  type: PropTypes.elementType.isRequired,
};

export default DoneCard;
