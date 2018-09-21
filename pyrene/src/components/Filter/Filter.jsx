import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './filter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';

export default class Filter extends React.Component {
  state = {
    displayFilterPopover: false,
  };

  displayFilterPopover = () => {
    this.setState((prevState, props) => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };


  filterDidChange = (target) => {
    console.log(target);
  };

  render() {
    return (
      <div styleName={'tableFilter'}>
        {/* No Searchbar for now
        <div styleName={'filterSearchBar'}>
          <input
            styleName={'filterSearchBarInput'}
            type={'text'}
            placeholder={'Search'}
            onChange={() => null}
            onFocus={() => null}
          />
          <span className={'icon-search'} styleName={'searchIcon'} />
        </div>
        <div styleName="spacer" /> */}
        <FilterPopoverButton label={'Filter'} displayPopover={this.state.displayFilterPopover} onClick={this.displayFilterPopover} filters={this.props.filters} handleFilterChange={this.filterDidChange}/>
      </div>
    );
  }
}


Filter.displayName = 'Filter';

Filter.defaultProps = {};

Filter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    options: PropTypes.array,
  })).isRequired,
};