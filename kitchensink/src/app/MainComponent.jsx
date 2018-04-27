import React from 'react';
import { Route } from 'react-router-dom';
import Logo from './common/Logo';
import SideBarMenu from './common/SideBarMenu/SideBarMenu';
import ButtonPage from './button/ButtonPage';
import IntroductionPage from './IntroductionPage';

import packageJson from '../../package.json';
import '../css/common.css';
import LinkPage from './link/LinkPage';
import ShareDialogPage from './shareDialog/ShareDialogPage';
import ModalPage from './modal/ModalPage';


const MainComponent = () => (
  <div styleName={'mainContainer'}>
    <div styleName={'leftContainer'}>
      <Logo versionNr={packageJson.version} />
      <SideBarMenu />
    </div>
    <div styleName={'pageContainer'}>
      <Route exact path={'/'} component={IntroductionPage} />
      <Route path={'/button'} component={ButtonPage} />
      <Route path={'/link'} component={LinkPage} />
      <Route path={'/shareDialog'} component={ShareDialogPage} />
      <Route path={'/modal'} component={ModalPage} />
    </div>
  </div>
);

MainComponent.displayName = 'MainComponent';

MainComponent.propTypes = {
};

MainComponent.defaultProps = {
};

export default MainComponent;
