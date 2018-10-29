import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkboxPopover.css';
import Popover from '../Popover/Popover';
import CheckboxList from './CheckboxList';


export default class CheckboxPopover extends React.Component {
  state = {
    displayPopover: false,
  };

  togglePopover = () => {
    this.setState((prevState, props) => ({
      displayPopover: !prevState.displayPopover,
    }));
  };

  render() {
    return (
      <div styleName={'checkboxPopover'}>
        <Popover
          preferredPosition={['bottom']}
          align={'end'}
          displayPopover={this.state.displayPopover}
          distanceToTarget={8}
          onClickOutside={() => this.setState({displayPopover: false})}
          renderPopoverContent={() => <CheckboxList listItems={this.props.listItems} onItemClick={this.props.onItemClick} onRestoreDefault={this.props.onRestoreDefault} />}
        >
          <div styleName={classNames('popoverTriggerButton', { popoverOpen: this.state.displayPopover })} onClick={this.togglePopover}>
            <div styleName={'buttonLabel'}>
              {this.props.buttonLabel}
            </div>
            <div styleName={'arrowIcon'} className={'pyreneIcon-collapsDown'} />
          </div>
        </Popover>
      </div>
    );
  }

}

CheckboxPopover.displayName = 'CheckboxPopover';

CheckboxPopover.defaultProps = {};

CheckboxPopover.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onRestoreDefault: PropTypes.func.isRequired,
};