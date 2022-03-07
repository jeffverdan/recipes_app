import React, { useState } from 'react';

const FormLogin = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validEmail = (email) => {
    // REFERÊNCIA
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(email);
  };

  const handleDisabled = () => {
    const MINIMIUM_CARACTERS = 6;
    const { email, password } = user;
    const isValid = validEmail(email);
    return password.length > MINIMIUM_CARACTERS && isValid;
  };

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <section>
      <form onSubmit={ () => {} }>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="text"
            id="email"
            name="email"
            placeholder="EMAIL"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            placeholder="SENHA"
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ !handleDisabled() }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </section>
  );
};

export default FormLogin;
