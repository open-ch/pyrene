import React from 'react';
import { Route } from 'react-router-dom';
import Logo from './Logo';
import SideBarMenu from './SideBarMenu/SideBarMenu';
import ButtonPage from '../pages/button/ButtonPage';
import IntroductionPage from '../pages/IntroductionPage';

import packageJson from '../../../package.json';
import '../../css/common.css';
import LinkPage from '../pages/link/LinkPage';
import ShareDialogPage from '../pages/shareDialog/ShareDialogPage';
import ModalPage from '../pages/modal/ModalPage';
import ColorsPage from '../pages/foundations/ColorsPage';
import IconsPage from '../pages/foundations/IconsPage';
import ResourcesPage from '../pages/ResourcesPage';
import CheckboxPage from '../pages/formElements/CheckboxPage';
import RadioSelectionPage from '../pages/formElements/RadioSelectionPage';
import TextFieldPage from '../pages/formElements/TextFieldPage';
import TextAreaPage from '../pages/formElements/TextAreaPage';
import SingleSelectPage from '../pages/select/SingleSelectPage';
import MultiSelectPage from '../pages/select/MultiSelectPage';
import ArrowButtonPage from '../pages/button/ArrowButtonPage';

const MainComponent = () => (
  <div styleName={'mainContainer'}>
    <div styleName={'leftContainer'}>
      <Logo versionNr={packageJson.version} />
      <SideBarMenu />
    </div>
    <div styleName={'pageContainer'}>
      <Route path={'/'} component={IntroductionPage} exact />

      <Route path={'/colors'} component={ColorsPage} />
      <Route path={'/icons'} component={IconsPage} />

      <Route path={'/arrowButton'} component={ArrowButtonPage} />
      <Route path={'/button'} component={ButtonPage} />
      <Route path={'/link'} component={LinkPage} />
      <Route path={'/shareDialog'} component={ShareDialogPage} />
      <Route path={'/checkbox'} component={CheckboxPage} />
      <Route path={'/radio'} component={RadioSelectionPage} />
      <Route path={'/textField'} component={TextFieldPage} />
      <Route path={'/textArea'} component={TextAreaPage} />
      <Route path={'/modal'} component={ModalPage} />
      <Route path={'/singleSelect'} component={SingleSelectPage} />
      <Route path={'/multiSelect'} component={MultiSelectPage} />

      <Route path={'/resources'} component={ResourcesPage} />
    </div>
  </div>
);

MainComponent.displayName = 'MainComponent';

MainComponent.propTypes = {
};

MainComponent.defaultProps = {
};

export default MainComponent;
