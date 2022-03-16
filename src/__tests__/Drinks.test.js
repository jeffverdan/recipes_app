import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../context/AppContext';
import Provider from '../context/Provider';
import renderWithRouter from '../renderWithRouter';
import MainCard from '../components/MainCard';
import Drinks from '../pages/Drinks';
import drinkTest, { btnsDrinks } from '../dataTests/dataTestFromDrinks';

const QUANTITY_IMAGES = 3;
const QUANTITY_BUTTONS = 4;

describe('Tela Drinks', () => {
  afterEach(() => {
    cleanup();
  });
  it('Se exibe os cards do array drinks', () => {
    renderWithRouter(
      <Provider>
        <AppContext.Consumer>
          {
            ({ dataDrinks, setDataDrinks }) => (
              <>
                <span>
                  {
                    dataDrinks.map((drink, index) => (
                      <MainCard
                        key={ drink.idDrink }
                        idMeal={ drink.idDrink }
                        strMeal={ drink.strDrink }
                        strMealThumb={ drink.strDrinkThumb }
                        index={ index }
                      />
                    ))
                  }
                </span>
                <button
                  type="button"
                  onClick={ () => setDataDrinks(drinkTest) }
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
    expect(section).toHaveLength(QUANTITY_IMAGES);
  });

  it('Testa função setDataCategoryDrinks', () => {
    renderWithRouter(
      <Provider>
        <AppContext.Consumer>
          {
            ({ dataCategoryDrinks, setDataCategoryDrinks }) => (
              <>
                {dataCategoryDrinks.map(({ strCategory }) => (
                  <button
                    type="button"
                    key={ strCategory }
                  >
                    {strCategory}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={ () => setDataCategoryDrinks(btnsDrinks) }
                >
                  Test Buttons
                </button>
              </>
            )
          }
        </AppContext.Consumer>
      </Provider>,
    );

    const btnSubmit = screen.getByRole('button', { name: /Test Buttons/i });
    userEvent.click(btnSubmit);
    const btnsCtgr = screen.getAllByRole('button');
    expect(btnsCtgr).toHaveLength(QUANTITY_BUTTONS);
  });

  it('Header, ícones profile e search estão presente na página Drinks', () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    const foodsH1 = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    const profileImg = screen.getByAltText('Perfil');
    const searchBarImg = screen.getByAltText('Search');
    expect(foodsH1).toBeDefined();
    expect(profileImg).toHaveAttribute('src', 'profileIcon.svg');
    expect(searchBarImg).toHaveAttribute('src', 'searchIcon.svg');
  });

  it('Footer está presente na tela', async () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );

    const drinksImg = screen.getByAltText(/drinks/i);
    const exploreImg = screen.getByAltText(/explore/i);
    const foodsImg = screen.getByAltText(/foods/i);
    expect(drinksImg).toHaveAttribute('src', 'drinkIcon.svg');
    expect(exploreImg).toHaveAttribute('src', 'exploreIcon.svg');
    expect(foodsImg).toHaveAttribute('src', 'mealIcon.svg');
  });
});
