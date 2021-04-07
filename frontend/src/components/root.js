import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
import MainContextProvider from '../context/main-context';



const Root = () => (
  // <Provider >
  <React.StrictMode>
    <MainContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </MainContextProvider>
  </React.StrictMode>
  // </Provider>
);

export default Root;