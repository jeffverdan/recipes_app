import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import AppContext from '../context/AppContext';

// const jsonEmail = localStorage.getItem('user');
// const user = JSON.parse(jsonEmail);
export default function Profile() {
  const history = useHistory();

  const checkPerfil = history.location.pathname === '/profile';

  const [email, setEmail] = useState('');
  // const { password, setPassword } = useContext(AppContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
    console.log(user);
  }, []);

  function handleClick({ target }) {
    if (target.value === 'done') {
      history.push('/done-recipes');
    } else if (target.value === 'favorite') {
      history.push('/favorite-recipes');
    } else if (target.value === 'logout') {
      localStorage.clear();
      history.push('/');
    }
  }

  return (
    <div>
      <Header title="Profile" />
      <div>
        {checkPerfil
          ? <h3 data-testid="profile-email">{ email }</h3>
          : null}
      </div>
      <button
        data-testid="profile-done-btn"
        type="button"
        value="done"
        onClick={ handleClick }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        value="favorite"
        onClick={ handleClick }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        value="logout"
        onClick={ handleClick }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
/* O elemento de email deve possuir o atributo data-testid="profile-email";
O botão para "Done Recipes" deve possuir o atributo data-testid="profile-done-btn";
O botão para "Favorite Recipes" deve possuir o atributo data-testid="profile-favorite-btn";
O botão de "Logout" deve possuir o atributo data-testid="profile-logout-btn". */
