import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function Buttons({ recipeData, type }) {
  const [linkCopie, setLinkCopie] = useState(false);

  // Parte da lógica retirado do https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
  const copieFunction = async (link) => {
    await navigator.clipboard.writeText(link);
    setLinkCopie(true);
    const INTERVAL = 1000;
    setTimeout(() => { setLinkCopie(false); }, INTERVAL);
  };

  return (
    <div>
      <div>
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ console.log('add favorite') }
          src={ whiteHeartIcon }
        >
          <img
            src={ whiteHeartIcon } // Ainda precisa testar se já é favorito
            alt="Favorite Icon"
          />
        </button>
      </div>
      {linkCopie
        ? <span>Link copied!</span>
        : (
          <div>
            <input
              type="image"
              alt="Share Icon"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ () => copieFunction(`http://localhost:3000/${type}/${recipeData}`) }
            />
          </div>
        )}
    </div>
  );
}

Buttons.propTypes = {
  recipeData: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
