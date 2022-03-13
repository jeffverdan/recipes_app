import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

const FilterArea = () => {
  const {
    countrySelect,
    setCountrySelect,
    setFilterAll,
    setFilterCountry,
  } = useContext(AppContext);

  const handleClick = async ({ target }) => {
    if (target.value === 'All') {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      console.log('todos');
      console.log(meals);
      setFilterAll(meals);
      setFilterCountry(target.value);
    } else {
      const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`)
        .then((response) => response.json());
      console.log('filtrado');
      console.log(meals);
      setFilterAll(meals);
      setFilterCountry(target.value);
    }
  };
  const fetchApiJson = async () => {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json());
    console.log(meals);
    setCountrySelect(meals);
  };
  useEffect(() => {
    const teste = async () => {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      console.log('todos');
      console.log(meals);
      setFilterAll(meals);
    };
    fetchApiJson();
    teste();
  }, []);

  return (
    <div>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleClick }

      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        {countrySelect.map((area) => (

          <option
            data-testid={ `${area.strArea}-option` }
            key={ area.strArea }
          >
            {area.strArea}

          </option>

        ))}
      </select>

    </div>

  );
};

export default FilterArea;
