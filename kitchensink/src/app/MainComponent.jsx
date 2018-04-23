import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Logo from './common/Logo';
import SideBarMenu from './common/SideBarMenu/SideBarMenu';
import ButtonPage from './button/ButtonPage';
import IntroductionPage from './IntroductionPage';
import DropDownPage from './DropDownPage';

import packageJson from '../../package.json';
import '../css/common.css';
import LinkPage from './link/LinkPage';


const MainComponent = () => {
  return (
    <div styleName={'mainContainer'}>
      <div styleName={'leftContainer'}>
        <Logo versionNr={packageJson.version}/>
        <SideBarMenu/>
      </div>
      <div styleName={'pageContainer'}>
        <Route exact={true} path={'/'} component={IntroductionPage} />
        <Route path={'/button'} component={ButtonPage} />
        <Route path={'/link'} component={LinkPage} />
        <Route path={'/dropDown'} component={DropDownPage} />
      </div>
    </div>
  );
}

MainComponent.displayName = 'MainComponent';

MainComponent.propTypes = {
};

MainComponent.defaultProps = {
};

export default MainComponent;