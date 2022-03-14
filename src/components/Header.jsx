import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Searchbar from './Searchbar';
import SearchbarDrinks from './SearchbarDrinks';
import '../styles/Header.css';

// Title muda de acordo com a página e loadingSearch oculta o search dependendo da página(Req 10)
export default function Header({ title, loadingSearch }) {
  const [search, setSearch] = useState(false);

  // onClick para redirecionar para página de perfil ao clicar no icone
  // const history = useHistory();
  // function profilePush() {
  //   history.push('/perfil');
  // }

  return (
    <header className="header-conteiner">
      <div className="profileConteiner">
        <Link to="/profile">
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
            <Switch>
              <Route exact path="/foods" component={ Searchbar } />
              <Route exact path="/drinks" component={ SearchbarDrinks } />
            </Switch>
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
