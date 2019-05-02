import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './radioPopover.css';
import Popover from '../Popover/Popover';
import OptionList from './OptionList';


export default class RadioPopover extends React.Component {

  state = {
    displayPopover: false,
  };

  togglePopover = () => {
    this.setState(prevState => ({
      displayPopover: !prevState.displayPopover,
    }));
  };

  render() {
    const {
      options,
      onChange,
      renderHelpSection,
      renderLabel,
      value,
    } = this.props;
    const { displayPopover } = this.state;

    const selectedValue = options.find(option => option.value === value);

    return (
      <Fragment>
        <div styleName="checkboxPopover">
          <Popover
            preferredPosition={['bottom']}
            align="end"
            // displayPopover={displayPopover}
            distanceToTarget={8}
            onClickOutside={() => this.setState({ displayPopover: false })}
            renderPopoverContent={() => (
              <OptionList
                options={options}
                onChange={onChange}
                renderHelpSection={renderHelpSection}
                selectedValue={selectedValue}
              />
            )}
          >
            <div styleName={classNames('popoverTriggerButton', { popoverOpen: this.state.displayPopover })} onClick={this.togglePopover}>
              <div styleName="buttonLabel" className="unSelectable">
                {renderLabel(selectedValue)}
              </div>
              <div styleName="arrowIcon" className="pyreneIcon-collapsDown" />
            </div>
          </Popover>
        </div>
        {displayPopover && (
          <div styleName="fakePopover">
            <OptionList
              options={options}
              onChange={onChange}
              renderHelpSection={renderHelpSection}
              selectedValue={selectedValue}
            />
          </div>
        )}
      </Fragment>
    );
  }

}

RadioPopover.displayName = 'Radio Popover';

RadioPopover.defaultProps = {
  options: [],
  renderHelpSection: null,
  renderLabel: value => value && value.label,
  value: null,
};

RadioPopover.propTypes = {
  onChange: PropTypes.func.isRequired,
  /**
   * Set the values that the user can choose from.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })),
  /**
   * Sets the selected choice of the user.
   */
  renderHelpSection: PropTypes.func,
  renderLabel: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
