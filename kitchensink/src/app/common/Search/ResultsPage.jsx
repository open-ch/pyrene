import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/componentPage.css';
import Components from '@osag/pyrene/dist/pyrene.dev';
import ChartComponents from '@osag/pyrene-graphs/dist/pyrene-graphs.dev';
import examples from '@osag/pyrene/dist/pyrene.examples';
import chartExamples from '@osag/pyrene-graphs/dist/pyrene-graphs.examples';
import SearchUtils from './SearchUtils';
import SearchResult from './SearchResult/SearchResult';
import Paragraph from '../PageElements/Paragraph/Paragraph';
import GalaxyImage from '../../../images/galaxy.svg';

const exampleComponents = { ...examples, ...chartExamples };
const components = [...Object.values(Components), ...Object.values(ChartComponents)];

export default class ResultsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInput: props.match.params.searchInput,
      matches: SearchUtils.getMatches(props.match.params.searchInput, components.filter((component) => exampleComponents[component.name])),
    };
  }

  // On change of the searchInput restart the search
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.searchInput !== nextProps.match.params.searchInput) {
      return ({
        searchInput: nextProps.match.params.searchInput,
        matches: SearchUtils.getMatches(nextProps.match.params.searchInput, components.filter((component) => exampleComponents[component.name])),
      });
    }
    return null;
  }

  renderSearchResults = () => (
    <>
      <div styleName="header">
        <div styleName="title">{`${this.state.matches.length} result${this.state.matches.length > 1 ? 's' : ''} matching \u00AB${this.props.match.params.searchInput}\u00BB`}</div>
      </div>
      <div styleName="topicContent">
        <Paragraph>
          {this.state.matches.map((result) => {
            const category = exampleComponents[result.name].category;
            return (
              <SearchResult
                category={category}
                title={result.displayName}
                description={result.description}
                key={result.displayName}
                searchInput={this.state.searchInput}
              />
            );
          })}
        </Paragraph>
      </div>
    </>
  );

  renderNoResultsPage = () => (
    <>
      <div styleName="header">
        <div styleName="title">{`No matches for \u00AB${this.props.match.params.searchInput}\u00BB`}</div>
      </div>
      <div styleName="topicContent">
        <Paragraph>
          We searched far and wide and couldn’t find any content matching your search. Please give it another try.
        </Paragraph>
        <img src={GalaxyImage} style={{ marginTop: 130 }} alt="Placeholder where are you?" />
      </div>
    </>
  );

  render() {
    return (
      <div styleName="page">
        { this.state.matches && this.state.matches.length > 0 ? this.renderSearchResults() : this.renderNoResultsPage() }
      </div>
    );
  }

}

ResultsPage.displayName = 'ResultsPage';

ResultsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchInput: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

ResultsPage.defaultProps = {
};
