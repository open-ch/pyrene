import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './app/common/Main';

const App = () => (
  <Router>
    <Route component={Main} />
  </Router>
);

ReactDOM.render(
  <App />,
  document.getElementById('appRoot')
);
