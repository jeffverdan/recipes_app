import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

const Footer = () => {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <img
        src={ drinkIcon }
        alt="drinks"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        aria-hidden
      />
      <img
        src={ exploreIcon }
        alt="explore"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        aria-hidden
      />
      <img
        src={ mealIcon }
        alt="foods"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        aria-hidden
      />
    </footer>
  );
};

export default Footer;
