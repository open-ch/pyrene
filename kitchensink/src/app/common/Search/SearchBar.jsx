import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter} from 'react-router-dom';
import classNames from 'classnames';

import SearchUtils from './SearchUtils';
import './searchBar.css';


class SearchBar extends React.Component {
  state = {
    focused: false,
    searchInput: this.props.value,
    shouldRedirectToResultsPage: false,
    shouldRedirectToPageBeforeSearch: false,
    lastPathBeforeSearch: '',
  };

  // On focus check if we already are on a search page (refresh or direct url call to such a link)
  // if this is the case set the path to redirect on searchbar clear to home: '/'
  // else we are on some page of the kitchensink, save it to lastPathBeforeSearch to be able to
  // return there when the search is cleared
  handleFocus = () => {
    if (!this.state.searchInput) {
      let lastPathBeforeSearch = this.props.location.pathname;
      if (lastPathBeforeSearch.includes('search')) {
        lastPathBeforeSearch = '/';
      }
      this.setState(() => ({
        focused: true,
        lastPathBeforeSearch: lastPathBeforeSearch,
      }));
    } else {
      this.setState(() => ({
        focused: true,
      }));
    }
  };

  handleBlur = () => {
    this.setState(() => ({
      focused: false,
    }));
  };

  handleChange = (event) => {
    // Starting point of search, normalise function returns lowercased and trimmed string
    const searchInput = SearchUtils.normalise(event.target.value);
    this.setState(() => ({
      searchInput: searchInput,
    }));
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If there is an input and it is different from the one before,
    // set redirect flag which triggers a redirect via the handleSearchResultsDisplay function
    if (this.state.searchInput !== prevState.searchInput && this.state.searchInput) {
      this.setState(() => ({
        shouldRedirectToResultsPage: true,
      }));

      // If the input changed but now it is empty set a flag to redirect back
      // to the page where the user started the search
    } else if (this.state.searchInput !== prevState.searchInput && !this.state.searchInput) {
      this.setState(() => ({
        shouldRedirectToPageBeforeSearch: true,
      }));

      // Both of the state changes above trigger a rerendering,
      // to avoid an endless rerendering loop, the states have to be reset
    } else if (this.state.shouldRedirectToResultsPage) {
      this.setState(() => ({
        shouldRedirectToResultsPage: false,
      }));
    } else if (this.state.shouldRedirectToPageBeforeSearch) {
      this.setState(() => ({
        shouldRedirectToPageBeforeSearch: false,
      }));
    }
  }

  // function that renders the redirects accordingly to the set flags
  // the searchinput is given to the resultspage via the path
  handleSearchResultsDisplay = () => {
    if (this.state.shouldRedirectToResultsPage) {
      return <Redirect to={`/search/${this.state.searchInput}`} push />;
    }
    if (this.state.shouldRedirectToPageBeforeSearch) {
      return <Redirect to={this.state.lastPathBeforeSearch} push />;
    }
  };

  render() {
    return (
      <div styleName={classNames('searchBarContainer', {focused: this.state.focused})}>
        <span className={'pyreneIcon-search'} styleName={'searchIcon'} />
        <input
          styleName={'searchInput'}
          type={'text'}
          placeholder={'Type to search'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={this.props.value}
        />

        {this.handleSearchResultsDisplay()}
      </div>
    );
  }

}

SearchBar.displayName = 'SearchBar';

SearchBar.defaultProps = {
  isDisplayingSearchResults: false,
  value: '',
};

SearchBar.propTypes = {
  value: PropTypes.string,
};

export default withRouter(SearchBar);