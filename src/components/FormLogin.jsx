import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import '../styles/FormLogin.css';

const FormLogin = () => {
  const history = useHistory();
  // const { user, setUser } = useContext();
  const { email, setEmail } = useContext(AppContext);
  const { password, setPassword } = useContext(AppContext);

  const handleChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const validEmail = (emailParam) => {
    // REFERÊNCIA
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(emailParam);
  };

  const handleDisabled = () => {
    const MINIMIUM_CARACTERS = 6;
    const isValid = validEmail(email);
    return password.length > MINIMIUM_CARACTERS && isValid;
  };

  const handleClick = (event) => {
    event.preventDefault();
    const userObj = email;
    const objectEmail = { email: userObj };
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(objectEmail));
    history.push('/foods');
  };

  return (
    <section className="col justify-content-center container-formlogin">
      <img alt="Yummy" src="https://media1.giphy.com/media/SX6Nht6OviI03lPFPz/giphy.gif?cid=790b761155a987def12bae18b4b081db5d81bc4746e6355e&rid=giphy.gif&ct=g" />
      <p className="display-5">Recipes App</p>
      <form className="formLogin" onSubmit={ () => {} }>
        <label htmlFor="email" className=" input-group mb-3 input-email">
          <span
            className="input-group-text"
            id="basic-addon1"
          >
            @
          </span>
          <input
            className="form-control"
            data-testid="email-input"
            aria-describedby="basic-addon1"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={ handleChangeEmail }
          />
        </label>
        <label htmlFor="password" className="input-password">
          <input
            className="form-control"
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            onChange={ handleChangePassword }
          />
        </label>
        <div>
          <button
            className="btn btn-primary"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ !handleDisabled() }
            onClick={ handleClick }
          >
            Enter
          </button>
        </div>
      </form>
    </section>
  );
};

FormLogin.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default FormLogin;
