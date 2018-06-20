import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/componentPage.css';
import Components from 'pyrene';
import SearchUtils from './SearchUtils';


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
        matches: SearchUtils.getMatches(this.props.match.params.searchInput, Components),
      });
    }
    return null;
  }

  render() {
    return (
      <div className="page">
        {this.state.matches && this.state.matches.length > 0 ?
          <React.Fragment>
            <div styleName="header">
              <div styleName="title">{`${this.state.matches.length} result${this.state.matches.length > 1 ? 's' : ''} matching "${this.props.match.params.searchInput}"`}</div>
            </div>
            <div styleName={'topicContent'}>
              {this.state.matches}
            </div>
          </React.Fragment>
          :
          <div>Nope</div>
        }
      </div>
    );
  }
}

ResultsPage.displayName = 'ResultsPage';

ResultsPage.propTypes = {
};

ResultsPage.defaultProps = {
};

