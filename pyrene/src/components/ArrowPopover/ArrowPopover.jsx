import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrowPopover.css';
import Popover from '../Popover/Popover';


/**
 *  Popover with Arrow
 */
class ArrowPopover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayPopover: false,
    };
  }

  closePopover = () => {
    this.setState(() => ({
      displayPopover: false,
    }));
  };

  openPopover = () => {
    this.setState(() => ({
      displayPopover: true,
    }));
  };

  render() {
    return (
      <div styleName={classNames('arrowPopover')}>
        <Popover
          align="center"
          distanceToTarget={20}
          onClickOutside={this.closePopover}
          preferredPosition={['top']}
          renderPopoverContent={() => (
            <div styleName={classNames('popover')}>
              <div>{this.props.popoverContent}</div>
              <div styleName={classNames('triangle')} />
            </div>
          )}
          displayPopover={this.state.displayPopover}
          autoReposition
        >
          <div>
            {console.log(this.props.children)}
            {React.cloneElement(
              this.props.children,
              { onClick: this.openPopover },
            )}
          </div>
        </Popover>
      </div>
    );
  }

}

ArrowPopover.displayName = 'Arrow Popover';

ArrowPopover.defaultProps = {};

ArrowPopover.propTypes = {
  /**
   * Action element
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /**
   * Content renderd in popover
   */
  popoverContent: PropTypes.any.isRequired,
};

export default ArrowPopover;
