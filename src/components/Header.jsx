import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './Searchbar';

// Title muda de acordo com a página e loadingSearch oculta o search dependendo da página(Req 10)
export default function Header({ title, loadingSearch }) {
  const [search, setSearch] = useState(false);

  // onClick para redirecionar para página de perfil ao clicar no icone
  // const history = useHistory();
  // function profilePush() {
  //   history.push('/perfil');
  // }

  return (
    <header>
      <div className="profileConteiner">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            aria-hidden
            data-testid="profile-top-btn"
            alt="Perfil"
          />
        </Link>
      </div>
      <div className="titleConteiner">
        <h1 data-testid="page-title">
          { title }
        </h1>
      </div>
      {loadingSearch && (
        // <div className="searchIco">
        //   <input
        //     data-testid="search-top-btn"
        //     src={ searchIcon }
        //     type="image"
        //     alt="Pesquisar"
        //     onClick={ () => setSearch(!search) } // Função para habilitar e desabilitar a barra de busca
        //   />
        // </div>
        <div
          role="presentation"
          onClick={ () => setSearch(!search) }
          className="searchIco"
        >
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search"
          />
        </div>
      )}
      {search && (
        <div className="searchConteiner">
          <span>
            <Searchbar />
          </span>
        </div>
      )}

    </header>
  );
}

Header.propTypes = {
  loadingSearch: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;
