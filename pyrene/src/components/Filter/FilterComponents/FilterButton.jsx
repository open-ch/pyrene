import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './filterButton.css';

const FilterButton = (props) => (
  <div styleName={classNames('filterButton', { noBorder: props.noBorder }, { popoverOpen: props.displayPopover }, { disabled: props.disabled })} onClick={props.onClick}>
    <div styleName="buttonLabel">
      {props.label}
    </div>
    <div styleName="arrowIcon" className={classNames(props.displayPopover ? 'pyreneIcon-chevronUp' : 'pyreneIcon-chevronDown')} />
  </div>
);


FilterButton.displayName = 'FilterButton';

FilterButton.defaultProps = {
  disabled: false,
  displayPopover: false,
  noBorder: false,
  onClick: () => null,
};

FilterButton.propTypes = {
  disabled: PropTypes.bool,
  displayPopover: PropTypes.bool,
  label: PropTypes.string.isRequired,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

export default FilterButton;
