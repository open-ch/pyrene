import React from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';
import classNames from 'classnames';


export default class SearchBar extends React.Component {
  state = {
    focused: false
  };

  handleFocus = () => {
    this.setState(() => ({
      focused: true,
    }));
  };

  handleBlur = () => {
    this.setState(() => ({
      focused: false,
    }));
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
        />
      </div>
    );
  }

}

SearchBar.displayName = 'SearchBar';

SearchBar.defaultProps = {};

SearchBar.propTypes = {};