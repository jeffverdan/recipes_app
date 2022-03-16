import React from 'react';
import './App.css';
import Routes from './Routes/Routes';
import ApiProvider from './context/Provider';

function App() {
  return (
    <ApiProvider>
      <Routes />
    </ApiProvider>
  );
}

export default App;
