import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Components from '@osag/pyrene/dist/pyrene.dev';
import ChartComponents from '@osag/pyrene-graphs/dist/pyrene-graphs.dev';
import examples from '@osag/pyrene/dist/pyrene.examples';
import chartExamples from '@osag/pyrene-graphs/dist/pyrene-graphs.examples';
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
import FilterUsage from '../static/cookBooks/FilterUsage';
import PyreneTutorial from '../static/cookBooks/PyreneTutorial';
import GitHubLogo from '../../images/githubLogo.png';
import OpenSystemsLogo from '../../images/opensystemsLogo.png';

export default class Main extends React.PureComponent {

  render() {

    // Prefill the searchbar with the searched input from the url if the site is directly accessed via a .../search/somesearchinput link
    let searchBarValue = '';
    if (this.props.location.pathname.includes('search')) {
      searchBarValue = this.props.location.pathname.split('search/')[1];
    }

    const components = [...Object.values(Components), ...Object.values(ChartComponents)];
    const exampleComponents = { ...examples, ...chartExamples };

    return (
      <div styleName="mainContainer">
        <div styleName="leftContainer">
          <Logo pyreneVersion={packageJson.dependencies['@osag/pyrene']} />
          <SearchBar value={searchBarValue} />
          <SideBarMenu />
          <div styleName="footer">
            <a href="https://github.com/open-ch/pyrene">
              <img alt="GitHub" styleName="logo" src={GitHubLogo} />
            </a>
            <a href="https://www.open-systems.com">
              <img alt="Open Systems" styleName="logo" src={OpenSystemsLogo} />
            </a>
          </div>
        </div>
        <div styleName="pageContainer">
          <Switch>
            <Route path="/" component={IntroductionPage} exact />
            <Route path="/colors" component={ColorsPage} />
            <Route path="/icons" component={IconsPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/cookbook/form" component={FormUsage} />
            <Route path="/cookbook/filter" component={FilterUsage} />
            <Route path="/cookbook/pyrene" component={PyreneTutorial} />

            {components
              .filter((component) => exampleComponents[component.name])
              .map((component) => (
                <Route
                  key={component.name}
                  path={`/${exampleComponents[component.name].category === undefined ? 'Other' : exampleComponents[component.name].category}/${component.name}`}
                  render={(routeProps) => (
                    <ComponentPage
                      {...routeProps} /* eslint-disable-line react/jsx-props-no-spreading */
                      component={component}
                      componentOrigin={component.name in examples ? 'pyrene' : 'pyrene-graphs'}
                      examples={exampleComponents[component.name]}
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
