import React from 'react';
import { Route } from 'react-router-dom';
import Components from 'pyrene';
import Logo from './Logo';
import SideBarMenu from './SideBarMenu/SideBarMenu';
import IntroductionPage from '../pages/IntroductionPage';

import packageJson from '../../../package.json';
import '../../css/common.css';
import ColorsPage from '../pages/foundations/ColorsPage';
import IconsPage from '../pages/foundations/IconsPage';
import ResourcesPage from '../pages/ResourcesPage';
import ComponentPage from './ComponentPage';


const Main = () => (
  <div styleName={'mainContainer'}>
    <div styleName={'leftContainer'}>
      <Logo versionNr={packageJson.version} />
      <SideBarMenu />
    </div>
    <div styleName={'pageContainer'}>
      <Route path={'/'} component={IntroductionPage} exact />

      <Route path={'/colors'} component={ColorsPage} />
      <Route path={'/icons'} component={IconsPage} />

      {Object.values(Components).map((component) => {
        const lowercaseComponentName = component.displayName.replace(/\s/g, '').toLowerCase();
        return (
          <Route
            key={lowercaseComponentName}
            path={`/${lowercaseComponentName}`}
            render={routeProps => (
              <ComponentPage
                {...routeProps}
                component={component}
                description={component.__docgenInfo.description}
                name={component.displayName}
              />)}
          />
        );
      })}

      <Route path={'/resources'} component={ResourcesPage} />
    </div>
  </div>
);

Main.displayName = 'Main';

Main.propTypes = {
};

Main.defaultProps = {
};

export default Main;
