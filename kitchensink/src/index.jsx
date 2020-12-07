import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './app/common/Main';
import 'pyrene/dist/pyrene.css';
import 'pyrene-graphs/dist/pyrene-graphs.css';

const App = () => (
  <Router>
    <Route component={Main} />
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('appRoot'),
);
