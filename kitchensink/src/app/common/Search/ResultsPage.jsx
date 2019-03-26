import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/componentPage.css';
import Components from 'pyrene/dist/pyrene.dev';
import SearchUtils from './SearchUtils';
import SearchResult from './SearchResult/SearchResult';
import Paragraph from '../PageElements/Paragraph/Paragraph';
import GalaxyImage from '../../../images/galaxy.svg';

export default class ResultsPage extends React.Component {

  state = {
    searchInput: this.props.match.params.searchInput,
    matches: SearchUtils.getMatches(this.props.match.params.searchInput, Components),
  };

  // On change of the searchInput restart the search
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.searchInput !== nextProps.match.params.searchInput) {
      return ({
        searchInput: nextProps.match.params.searchInput,
        matches: SearchUtils.getMatches(nextProps.match.params.searchInput, Components),
      });
    }
    return null;
  }

  renderSearchResults = () => (
    <React.Fragment>
      <div styleName="header">
        <div styleName="title">{`${this.state.matches.length} result${this.state.matches.length > 1 ? 's' : ''} matching \u00AB${this.props.match.params.searchInput}\u00BB`}</div>
      </div>
      <div styleName="topicContent">
        <Paragraph>
          {this.state.matches.map((result) => {
            const componentDisplayName = Object.keys(result)[0];
            const componentDescription = Object.values(result)[0];
            return (
              <SearchResult title={componentDisplayName} description={componentDescription} key={componentDisplayName} searchInput={this.state.searchInput} />
            );
          })}
        </Paragraph>
      </div>
    </React.Fragment>
  );

  renderNoResultsPage = () => (
    <React.Fragment>
      <div styleName="header">
        <div styleName="title">{`No matches for \u00AB${this.props.match.params.searchInput}\u00BB`}</div>
      </div>
      <div styleName="topicContent">
        <Paragraph>
          We searched far and wide and couldn’t find any content matching your search. Please give it another try.
        </Paragraph>
        <img src={GalaxyImage} style={{ marginTop: 130 }} alt="Placeholder where are you?" />
      </div>
    </React.Fragment>
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
