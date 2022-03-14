import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function Buttons({ recipeData, id, type }) {
  const [linkCopie, setLinkCopie] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [favorites, setFavorites] = useState();

  // Pega no localStorage os favoritos
  useEffect(() => {
    if (localStorage.favoriteRecipes) {
      const localFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(localFav);
      if (localFav.some((recipe) => recipe.id === id)) {
        setIsFav(true);
      }
    }
  }, [id]);

  function favorited() {
    // Remove apenas a receita com ID dos favoritos do localStorage
    if (isFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favorites.filter((recipe) => recipe.id !== id),
      ));
      setIsFav(false);
    // Adiciona o recipeData aos favoritos no localStorage
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeData));
      setIsFav(true);
    }
  }

  // const expectedFavoriteRecipes = [
  //   {
  //     id: '11007',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];
  // localStorage.setItem('favoriteRecipes', JSON.stringify(expectedFavoriteRecipes));

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
          className="btn"
          type="button"
          onClick={ favorited }
          src={ (isFav) ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ (isFav) ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite Icon"
          />
        </button>
      </div>
      {linkCopie
        ? <span>Link copied!</span>
        : (
          <div>
            <button
              type="button"
              className="btn"
              alt="Share Icon"
              data-testid="share-btn"
              src={ shareIcon }
              onClick={ () => copieFunction(`http://localhost:3000/${type}/${id}`) }
            >
              <img
                src={ shareIcon }
                alt="Favorite Icon"
              />
            </button>
          </div>
        )}
    </div>
  );
}

Buttons.propTypes = {
  recipeData: PropTypes.object,
  id: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
