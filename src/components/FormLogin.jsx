import React from 'react';

const FormLogin = () => {
  const handleChange = (event) => {
    console.log(event);
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
          type="submit"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </section>
  );
};

export default FormLogin;
