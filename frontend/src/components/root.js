import React from 'react';
// import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';
import { StateProvider } from './store.js';


const Root = () => (
  // <StateProvider >
    <HashRouter>
      <App />
    </HashRouter>
  // </StateProvider>
);

export default Root;