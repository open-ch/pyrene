/* eslint-disable react/no-did-update-set-state,react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import './searchBar.css';


class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      shouldRedirectToResultsPage: false,
      shouldRedirectToPageBeforeSearch: false,
      lastPathBeforeSearch: '',

      searchInput: props.value,
      lastProps: {
        searchInput: props.value,
      },
    };
  }

  MINIMUM_NUMBER_OF_CHARACTERS_IN_SEARCH = 2;

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastProps.searchInput !== nextProps.value) {
      return {
        searchInput: nextProps.value,
        lastProps: {
          searchInput: nextProps.value,
        },
      };
    }
    // No State Change
    return null;
  }


  componentDidUpdate(prevProps, prevState) {
    // If there is an input and it is different from the one before,
    // set redirect flag which triggers a redirect via the handleSearchResultsDisplay function
    if (this.state.searchInput !== prevState.searchInput && this.state.searchInput.length >= this.MINIMUM_NUMBER_OF_CHARACTERS_IN_SEARCH) {
      this.setState(() => ({
        shouldRedirectToResultsPage: true,
      }));

      // If the input changed but now it is empty set a flag to redirect back
      // to the page where the user started the search
    } else if (this.state.searchInput !== prevState.searchInput && this.state.searchInput.length < this.MINIMUM_NUMBER_OF_CHARACTERS_IN_SEARCH && this.state.searchInput) {
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
    return null;
  };

  handleChange = (event) => {
    // Starting point of search, normalise function returns lowercased and trimmed string
    const searchInput = event.target.value;
    this.setState(() => ({
      searchInput: searchInput,
    }));
  };

  handleClear = () => {
    this.setState(() => ({
      searchInput: '',
      shouldRedirectToPageBeforeSearch: true,
    }));
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


  render() {
    return (
      <div styleName={classNames('searchBarContainer', { focused: this.state.focused })}>
        <span className="pyreneIcon-search" styleName="searchIcon" />
        <input
          styleName="searchInput"
          type="text"
          placeholder="Type to search"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={this.state.searchInput}
        />
        {(this.props.value || this.state.searchInput) && <span className="pyreneIcon-delete" styleName="clearIcon" onClick={this.handleClear} />}

        {this.handleSearchResultsDisplay()}
      </div>
    );
  }

}

SearchBar.displayName = 'SearchBar';

SearchBar.defaultProps = {
  value: '',
};

SearchBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.string,
};

export default withRouter(SearchBar);
