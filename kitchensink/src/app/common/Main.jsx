import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Components from 'pyrene/dist/pyrene.dev';
import examples from 'pyrene/dist/pyrene.examples';
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
import NotFoundPage from '../static/NotFoundPage';
import FormUsage from '../static/cookBooks/FormUsage';
import PyreneTutorial from '../static/cookBooks/PyreneTutorial';

export default class Main extends React.PureComponent {

  render() {

    // Prefill the searchbar with the searched input from the url if the site is directly accessed via a .../search/somesearchinput link
    let searchBarValue = '';
    if (this.props.location.pathname.includes('search')) {
      searchBarValue = this.props.location.pathname.split('search/')[1];
    }

    return (
      <div styleName="mainContainer">
        <div styleName="leftContainer">
          <Logo pyreneVersion={packageJson.dependencies.pyrene} />
          <SearchBar value={searchBarValue} />
          <SideBarMenu />
          <div styleName="copyRight">&copy; Open Systems 2019</div>
        </div>
        <div styleName="pageContainer">
          <Switch>
            <Route path="/" component={IntroductionPage} exact />
            <Route path="/colors" component={ColorsPage} />
            <Route path="/icons" component={IconsPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/form" component={FormUsage} />
            <Route path="/pyrene" component={PyreneTutorial} />

            {Object.values(Components)
              .filter(component => examples[component.name])
              .map(component => (
                <Route
                  key={component.name}
                  path={`/${component.name}`}
                  render={routeProps => (
                    <ComponentPage
                      {...routeProps}
                      component={component}
                      examples={examples[component.name]}
                    />
                  )}
                />
              ))}

            <Route path="/search/:searchInput" component={ResultsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }

}

Main.displayName = 'Main';

Main.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Main.defaultProps = {
};
