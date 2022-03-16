import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../context/AppContext';
import Provider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';
import MainCard from '../components/MainCard';
import mealTest from '../dataTests/dataTests';
// import App from '../App';
import Foods from '../pages/Foods';

const THREE = 3;

afterEach(() => {
  cleanup();
});

describe('Tela Foods', () => {
  it('Se exibe os cards do array meals', () => {
    renderWithRouter(
      <Provider>
        <AppContext.Consumer>
          {
            ({ dataMeals, setDataMeals }) => (
              <>
                <span>
                  {
                    dataMeals.map((meal, index) => (
                      <MainCard
                        key={ meal.idMeal }
                        idMeal={ meal.idMeal }
                        strMeal={ meal.strMeal }
                        strMealThumb={ meal.strMealThumb }
                        index={ index }
                      />
                    ))
                  }
                </span>
                <button
                  type="button"
                  onClick={ () => setDataMeals(mealTest) }
                >
                  Take from API
                </button>
              </>
            )
          }
        </AppContext.Consumer>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: /Take from API/i });
    userEvent.click(button);
    const section = screen.getAllByRole('img');
    expect(section).toHaveLength(THREE);
  });

  // v1
  // it('header está presente na página', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const foodsH1 = screen.getByRole('heading', { level: 1, name: /Foods/i });
  //   expect(foodsH1).toBeDefined();
  // });

  it('Header, ícones profile e search estão presente na página', () => {
    renderWithRouter(
      <Provider>
        <Foods />
      </Provider>,
    );

    // const { location: { pathname } } = history;
    // expect(pathname).toBe('/foods');
    // const { dataMeals, setDataMeals } = useContext(AppContext);
    // setDataMeals(mealTest);
    const foodsH1 = screen.getByRole('heading', { level: 1, name: 'Foods' });
    const profileImg = screen.getByAltText('Perfil');
    const searchBarImg = screen.getByAltText('Search');
    expect(foodsH1).toBeDefined();
    expect(
      profileImg,
    ).toHaveAttribute(
      'src',
      'profileIcon.svg',
    );
    expect(
      searchBarImg,
    ).toHaveAttribute(
      'src',
      'searchIcon.svg',
    );
  });

  it('Botões de filtro estão presentes na tela', async () => {
    renderWithRouter(
      <Provider>
        <Foods />
      </Provider>,
    );
    // Toda vez q usar find tem q usar async/await
    // Não consigo usar um forEach pra pegar todos os botões
    const btnAll = screen.getByRole('button', { name: /All/i });
    const btnBeef = await screen.findByRole('button', { name: /Beef/i });
    const btnBreakfast = await screen.findByRole('button', { name: /Breakfast/i });
    const btnChicken = await screen.findByRole('button', { name: /Chicken/i });
    const btnDessert = await screen.findByRole('button', { name: /Dessert/i });
    const btnGoat = await screen.findByRole('button', { name: /Goat/i });
    expect(btnAll).toBeDefined();
    expect(btnBeef).toBeDefined();
    expect(btnBreakfast).toBeDefined();
    expect(btnChicken).toBeDefined();
    expect(btnDessert).toBeDefined();
    expect(btnGoat).toBeDefined();
  });
});
