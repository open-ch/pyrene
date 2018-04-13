import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Button } from 'pyrene';
import MainComponent from './app/MainComponent';

//console.log(ButtonPage);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route component={MainComponent} />
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('appRoot')
);
