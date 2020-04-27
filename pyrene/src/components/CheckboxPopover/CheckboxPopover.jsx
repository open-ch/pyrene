import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkboxPopover.css';
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
      <div className={classNames('checkboxPopover', { disabled: this.props.disabled })}>
        <Popover
          preferredPosition={['bottom']}
          align="end"
          displayPopover={this.state.displayPopover}
          distanceToTarget={8}
          onClickOutside={() => this.setState({ displayPopover: false })}
          renderPopoverContent={() => <CheckboxList listItems={this.props.listItems} onItemClick={this.props.onItemClick} onRestoreDefault={this.props.onRestoreDefault} />}
        >
          <div styleName={classNames('popoverTriggerButton', { popoverOpen: this.state.displayPopover })} onClick={this.togglePopover}>
            <div styleName="buttonLabel" className="unSelectable">
              {this.props.buttonLabel}
            </div>
            <div
              styleName="arrowIcon"
              className={this.state.displayPopover ? 'pyreneIcon-chevronUp' : 'pyreneIcon-chevronDown'}
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
