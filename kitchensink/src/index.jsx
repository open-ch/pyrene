import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Button } from 'pyrene';
import SideBarMenu from './app/common/SideBarMenu/SideBarMenu';
import Logo from './app/common/Logo';
import IntroductionPage from './app/IntroductionPage';
import ButtonPage from './app/ButtonPage';
import DropDownPage from './app/DropDownPage';
import './css/common.css';

//console.log(ButtonPage);

class App extends React.Component {
  render() {
    return (

          <div styleName={'mainContainer'}>
            <div styleName={'leftContainer'}>
              <Logo versionNr={'0.0.0.0.1'} />
              <SideBarMenu />
            </div>
            <div className={'pageContainer'}>
              <Route exact={true} path={'/'} component={IntroductionPage}/>
              <Route path={'/button'} component={ButtonPage}/>
              <Route path={'/dropDown'} component={DropDownPage}/>
            </div>
          </div>

    );
  }
}

const RouterApp = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(
  <RouterApp />,
  document.getElementById('appRoot')
);
