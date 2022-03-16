import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../context/AppContext';
import Provider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tela Login', () => {
  it('Se ao usar a função setEmail exibe o email passado', () => {
    renderWithRouter(
      <Provider>
        <AppContext.Consumer>
          {
            (contextValue) => (
              <>
                <span>
                  {`Seu email é: ${contextValue.email}`}
                </span>
                <button
                  type="button"
                  onClick={ contextValue.setEmail('tiopatinhas@gmail.com') }
                >
                  Enter
                </button>
              </>
            )
          }
        </AppContext.Consumer>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Enter' }));
    const isLogged = screen.getByText('Seu email é: tiopatinhas@gmail.com');
    expect(isLogged).toBeTruthy();
  });

  it('Se ao usar a função setPassword salva senha', () => {
    renderWithRouter(
      <Provider>
        <AppContext.Consumer>
          {
            (contextValue) => (
              <>
                <span>
                  {`Sua senha é: ${contextValue.password}`}
                </span>
                <button
                  type="button"
                  onClick={ contextValue.setPassword('naoEMinhaDatadeNascimento') }
                >
                  Enter
                </button>
              </>
            )
          }
        </AppContext.Consumer>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'Enter' }));
    const isLogged = screen.getByText('Sua senha é: naoEMinhaDatadeNascimento');
    expect(isLogged).toBeTruthy();
  });

  it('O input de email, senha e botão estão presente na tela na rota "/"', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const { location: { pathname } } = history;
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(pathname).toBe('/');
    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
  });

  it('Ao inserir dados corretamente, e clicar no botão redireciona para "/foods"', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    screen.debug(inputPassword);
    const btnEnter = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(inputEmail, 'email@mail.com');
    userEvent.type(inputPassword, 'naoEMinhaDatadeNascimento');
    userEvent.click(btnEnter);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods');
  });
});
