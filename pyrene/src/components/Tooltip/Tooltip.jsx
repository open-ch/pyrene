import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';

import './tooltip.css';

/**
 * A Tooltip is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.
 */
export default class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    };
  }

  render() {
    return (
      <Popover
        isOpen={this.state.isPopoverOpen}
        position={this.props.preferredPosition}
        align={this.props.align}
        padding={this.props.distanceToTarget}
        content={({
          position, nudgedLeft, nudgedTop, targetRect, popoverRect, // eslint-disable-line no-unused-vars
        }) => (
          <div styleName="tooltip" style={{ maxWidth: this.props.maxWidth }}>
            {this.props.label}
          </div>
        )}
        containerStyle={{
          borderRadius: '2px',
          boxShadow: '0 4px 8px -2px rgba(0, 21, 44, 0.2), 0 0 1px 0 rgba(0, 21, 44, 0.3)',
          // @ts-ignore
          zIndex: 9999,
        }}
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
  autoReposition: true,
  maxWidth: 344,
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
   * Wrapped component(s) that the tooltip is using for its positioning.
   */
  children: PropTypes.element.isRequired,
  /**
   * Sets the distance of the tooltip to its target.
   */
  distanceToTarget: PropTypes.number,
  /**
   * Sets the label displayed inside of the tooltip.
   */
  label: PropTypes.node.isRequired,
  /**
   * Sets the Tooltip width. Only to be used to enforce line breaks.
   */
  maxWidth: PropTypes.number,
  /**
    * Sets the preferred position array ordered by priority for auto repositioning.
    */
  preferredPosition: PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
};
