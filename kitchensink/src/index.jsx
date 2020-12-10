import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './app/common/Main';
import '@osag/pyrene/dist/pyrene.css';
import '@osag/pyrene-graphs/dist/pyrene-graphs.css';

const App = () => (
  <Router basename={process.env.BASE_PATH}>
    <Route component={Main} />
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('appRoot'),
);
