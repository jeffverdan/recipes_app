import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

const Footer = () => {
  const history = useHistory();
  return (
    <section className="container-img">
      <footer data-testid="footer">
        <div className="img-footer">
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
            onClick={ () => history.push('/drinks') }
            aria-hidden
          />
        </div>
        <div className="img-footer">
          <img
            src={ exploreIcon }
            alt="explore"
            data-testid="explore-bottom-btn"
            onClick={ () => history.push('/explore') }
            aria-hidden
          />
        </div>
        <div className="img-footer">
          <img
            src={ mealIcon }
            alt="foods"
            data-testid="food-bottom-btn"
            onClick={ () => history.push('/foods') }
            aria-hidden
          />
        </div>
      </footer>
    </section>
  );
};

export default Footer;
