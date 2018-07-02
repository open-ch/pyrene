import React from 'react';
import { Route } from 'react-router-dom';
import Components from 'pyrene';
import packageJson from '../../../package.json';
import Logo from './Logo';
import SideBarMenu from './SideBarMenu/SideBarMenu';
import IntroductionPage from '../static/IntroductionPage';
import ColorsPage from '../static/foundations/ColorsPage';
import IconsPage from '../static/foundations/IconsPage';
import ResourcesPage from '../static/ResourcesPage';
import ComponentPage from './ComponentPage';
import '../../css/common.css';
import SearchBar from './Search/SearchBar/SearchBar';
import ResultsPage from './Search/ResultsPage';


export default class Main extends React.Component {

  render() {

    // Prefill the searchbar with the searched input from the url if the site is directly accessed via a .../search/somesearchinput link
    let searchBarValue = '';
    if (this.props.location.pathname.includes('search')) {
      searchBarValue = this.props.location.pathname.split('search/')[1];
    }

    return (
      <div styleName={'mainContainer'}>
        <div styleName={'leftContainer'}>
          <Logo versionNr={packageJson.version} />
          <SearchBar value={searchBarValue} />
          <SideBarMenu />
        </div>
        <div styleName={'pageContainer'}>
          <Route path={'/'} component={IntroductionPage} exact />
          <Route path={'/colors'} component={ColorsPage} />
          <Route path={'/icons'} component={IconsPage} />
          <Route path={'/resources'} component={ResourcesPage} />

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
                    lowercaseName={lowercaseComponentName}
                  />)}
              />
            );
          })}

          <Route path={'/search/:searchInput'} component={ResultsPage} />

        </div>
      </div>
    );
  }

}

Main.displayName = 'Main';

Main.propTypes = {
};

Main.defaultProps = {
};
