import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});


import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

xdescribe('Barra de busca - Header', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const element = screen.getByText(/TRYBE/i);
    expect(element).toBeDefined();
  })
});
