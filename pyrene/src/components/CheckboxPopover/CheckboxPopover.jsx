import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './checkboxPopover.css';
import Popover from '../Popover/Popover';
import CheckboxList from './CheckboxList';


export default class CheckboxPopover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPopover: false,
    };
  }

  togglePopover = () => {
    this.setState((prevState) => ({
      displayPopover: !prevState.displayPopover,
    }));
  };

  render() {
    return (
      <div className={clsx(styles.checkboxPopover, { [styles.disabled]: this.props.disabled })}>
        <Popover
          preferredPosition={['bottom']}
          align="end"
          displayPopover={this.state.displayPopover}
          distanceToTarget={8}
          onClickOutside={() => this.setState({ displayPopover: false })}
          renderPopoverContent={() => <CheckboxList listItems={this.props.listItems} onItemClick={this.props.onItemClick} onRestoreDefault={this.props.onRestoreDefault} />}
        >
          <div className={clsx(styles.popoverTriggerButton, { [styles.popoverOpen]: this.state.displayPopover })} onClick={this.togglePopover}>
            <div className={clsx(styles.buttonLabel, 'unSelectable')}>
              {this.props.buttonLabel}
            </div>
            <div
              className={clsx(styles.arrowIcon, { 'pyreneIcon-chevronUp': this.state.displayPopover, 'pyreneIcon-chevronDown': !this.state.displayPopover })}
            />
          </div>
        </Popover>
      </div>
    );
  }

}

CheckboxPopover.displayName = 'Checkbox Popover';

CheckboxPopover.defaultProps = {
  disabled: false,
};

CheckboxPopover.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onRestoreDefault: PropTypes.func.isRequired,
};
