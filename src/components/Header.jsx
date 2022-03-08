import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

// Title muda de acordo com a página e loadingSearch oculta o search dependendo da página(Req 10)
export default function Header({ title, loadingSearch }) {
  const [search, setSearch] = useState(false);

  // onClick para redirecionar para página de perfil ao clicar no icone
  const history = useHistory();
  function profilePush() {
    history.push('/perfil');
  }

  return (
    <header>
      <div className="profileConteiner">
        <input
          type="image"
          src={ profileIcon }
          data-testid="profile-top-btn"
          onClick={ profilePush }
          alt="Perfil"
        />
      </div>
      <div className="titleConteiner">
        <h1 data-testid="page-title">
          { title }
        </h1>
      </div>
      {loadingSearch && (
        <div className="searchIco">
          <input
            data-testid="search-top-btn"
            src={ searchIcon }
            type="image"
            alt="Pesquisar"
            onClick={ () => setSearch(!search) } // Função para habilitar e desabilitar a barra de busca
          />
        </div>
      )}
      {search && (
        <div className="searchConteiner">
          <span data-testid="search-input">Barra de Busca</span>
        </div>
      )}

    </header>
  );
}

Header.propTypes = {
  loadingSearch: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;
