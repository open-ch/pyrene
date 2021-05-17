import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './radioPopover.css';
import Popover from '../Popover/Popover';
import OptionList from './OptionList';


export default class RadioPopover extends React.Component {

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

  closePopover = () => this.setState({ displayPopover: false });

  render() {
    const {
      options,
      onChange,
      renderHelpSection,
      renderLabel,
      value,
    } = this.props;
    const { displayPopover } = this.state;

    const selectedValue = options.find((option) => option.value === value);

    return (
      <div className={styles.radioPopover}>
        <Popover
          preferredPosition={['bottom']}
          align="end"
          displayPopover={displayPopover}
          distanceToTarget={8}
          onClickOutside={this.closePopover}
          renderPopoverContent={() => (
            <OptionList
              options={options}
              onChange={(newValue) => {
                onChange(newValue);
                this.closePopover();
              }}
              renderHelpSection={renderHelpSection}
              selectedValue={selectedValue}
            />
          )}
        >
          <div className={clsx(styles.popoverTriggerButton, { [styles.popoverOpen]: this.state.displayPopover })} onClick={this.togglePopover}>
            <div className={clsx(styles.buttonLabel, 'unSelectable')}>
              {renderLabel(selectedValue)}
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

RadioPopover.displayName = 'Radio Popover';

RadioPopover.defaultProps = {
  options: [],
  renderHelpSection: null,
  renderLabel: (value) => value && value.label,
  value: null,
};

RadioPopover.propTypes = {
  /**
   * Sets the selected choice of the user.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Set the values that the user can choose from.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })),
  /**
   * Render callback for the help section above the options
   */
  renderHelpSection: PropTypes.func,
  /**
   * Render callback for the label for custom formatting
   */
  renderLabel: PropTypes.func,
  /**
   * selected value - should match the `value` key in one of the `options`
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
