import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'pyrene';
import SideBarMenu from './app/common/SideBarMenu/SideBarMenu';
import Logo from './app/common/Logo';
import './css/common.css';

//console.log(Button);

const App = () => (
  <div styleName={'mainContainer'}>
    <div styleName={'leftContainer'}>
      <Logo versionNr={'0.0.0.0.1'}/>
      <SideBarMenu />
    </div>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('appRoot')
);
