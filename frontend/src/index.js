import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import axios from 'axios';

import 'fomantic-ui-css/semantic.min.css';

document.addEventListener('DOMContentLoaded', async () => {

  // test 
  window.axios = axios; 
  // test 
  
  
  const root = document.getElementById('root')
  ReactDOM.render(<Root />, root)

})
