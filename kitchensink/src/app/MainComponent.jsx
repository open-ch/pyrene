import React from 'react';
import { Route } from 'react-router-dom';
import Logo from './common/Logo';
import SideBarMenu from './common/SideBarMenu/SideBarMenu';
import ButtonPage from './pages/button/ButtonPage';
import IntroductionPage from './IntroductionPage';

import packageJson from '../../package.json';
import '../css/common.css';
import LinkPage from './pages/link/LinkPage';
import ShareDialogPage from './pages/shareDialog/ShareDialogPage';
import FormElementsPage from './pages/formElements/FormElementsPage';
import ModalPage from './pages/modal/ModalPage';
import SelectPage from './pages/select/SelectPage';


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
      <Route path={'/formElements'} component={FormElementsPage} />
      <Route path={'/modal'} component={ModalPage} />
      <Route path={'/select'} component={SelectPage} />
    </div>
  </div>
);

MainComponent.displayName = 'MainComponent';

MainComponent.propTypes = {
};

MainComponent.defaultProps = {
};

export default MainComponent;
