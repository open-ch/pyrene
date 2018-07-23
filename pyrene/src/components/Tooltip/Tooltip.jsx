import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';

import './tooltip.css';

export default class Tooltip extends React.Component {
  state = {
    isPopoverOpen: false,
  };

  render() {
    return (
      <Popover
        isOpen={this.state.isPopoverOpen}
        position={this.props.preferredPosition}
        align={this.props.align}
        padding={this.props.distanceToTarget}
        content={({ position, nudgedLeft, nudgedTop, targetRect, popoverRect }) => (
          <div styleName={'tooltip'} style={{ width: this.props.width ? this.props.width : null }}>
            {this.props.label}
          </div>
        )}
        containerStyle={{zIndex: 9999}}
        disableReposition={!this.props.repositioning}
      >
        <div
          onMouseOver={() => this.setState({ isPopoverOpen: true })}
          onMouseLeave={() => this.setState({ isPopoverOpen: false })}
        >
          {this.props.children}
        </div>
      </Popover>
    );
  }
}

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  preferredPosition: [],
  align: 'center',
  repositioning: true,
  width: null,
  distanceToTarget: 8,
};

Tooltip.propTypes = {
  /**
   * Alignment of the tooltip
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Automatic repositioning switch
   */
  repositioning: PropTypes.bool,
  /**
   * Text displayed by the tooltip.
   */
  label: PropTypes.string.isRequired,
  /**
   * Preferred position array ordered by priority
   */
  preferredPosition: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
  /**
   * Maximum Tooltip width
   */
  width: PropTypes.number,
  /**
   * Distance to target
   */
  distanceToTarget: PropTypes.number,
};