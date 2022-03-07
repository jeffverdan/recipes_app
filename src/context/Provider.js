import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  // STATES do useState
  const [apiData, setApiData] = useState([]);

  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  // PARA CADA STATE, PRECISA PASSAR O CONTEXT PARA O CHILDREN NO RETURN
  const contextValue = {
    // FILIPE
    apiData,
    setApiData,
    // JEFERSSON
    // ABNER
    // DANIEL
    // JOHNATHAN
  };

  // USE EFFECT PARA PEGAR OS DADOS DA API
  useEffect(() => {
    async function fetchData() {
      const results = await fetch(url).then((response) => response.json());
      setApiData(results);
      console.log(results);
    }
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default Provider;
