import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/MainCard.css';
import shareIcon from '../images/shareIcon.svg';

const linkCopied = (e) => {
  // https://orclqa.com/copy-url-clipboard/
  // const inputc = document.body.appendChild(document.createElement('input'));
  // inputc.value = window.location.href;
  // inputc.focus();
  // inputc.select();
  // document.execCommand('copy');
  // inputc.parentNode.removeChild(inputc);

  console.log(e.target);

  global.alert('Link copied!');
};

const DoneCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  index,
  strTags,
  strCategory,
  type,
}) => (
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
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ () => { linkCopied(); } }
      >
        Share
      </button>
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
