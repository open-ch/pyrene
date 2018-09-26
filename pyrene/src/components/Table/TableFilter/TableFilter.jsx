import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './tableFilter.css';
import FilterPopoverButton from './FilterPopOverButton/FilterPopoverButton';

export default class TableFilter extends React.Component {
  state = {
    displayFilterPopover: false,
  };

  displayFilterPopover = () => {
    this.setState((prevState, props) => ({
      displayFilterPopover: !prevState.displayFilterPopover,
    }));
  };


  render() {
    return (
      <div styleName={'tableFilter'}>
        <div styleName={'filterSearchBar'}>
          <input
            styleName={'filterSearchBarInput'}
            type={'text'}
            placeholder={'Search'}
            onChange={() => null}
            onFocus={() => null}
          />
          <span className={'pyreneIcon-search'} styleName={'searchIcon'} />
        </div>
        <div styleName="spacer" />
        <FilterPopoverButton label={'Filter'} displayPopover={this.state.displayFilterPopover} onClick={this.displayFilterPopover}/>
      </div>
    );
  }
}


TableFilter.displayName = 'TableFilter';

TableFilter.defaultProps = {};

TableFilter.propTypes = {};