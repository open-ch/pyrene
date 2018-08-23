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
        disableReposition={!this.props.autoReposition}
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
  autoRepositioning: true,
  width: 0,
  distanceToTarget: 8,
};

Tooltip.propTypes = {
  /**
   * Sets the alignment of the tooltip.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),
  /**
   * Whether automatic repositioning is enabled.
   */
  autoReposition: PropTypes.bool,
  /**
   * Sets the label displayed inside of the tooltip.
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the preferred position array ordered by priority for auto repositioning.
   */
  preferredPosition: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
  /**
   * Sets the Tooltip width. Only to be used to enforce line breaks.
   */
  width: PropTypes.number,
  /**
   * Sets the distance of the tooltip to its target.
   */
  distanceToTarget: PropTypes.number,
};