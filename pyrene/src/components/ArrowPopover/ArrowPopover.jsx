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
          preferredPosition={['top', 'left']}
          onClickOutside={this.closePopover}
          renderPopoverContent={(position, nudgedLeft, nudgedTop, targetRect, popoverRect) => {
            // Square
            const lengthSide = 20;
            const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

            let top = (targetRect.top - popoverRect.top) + (targetRect.height / 2) - (arrowWidth / 2);
            let left = (targetRect.left - popoverRect.left) + (targetRect.width / 2) - (arrowWidth / 2);

            let popoverRectHeight = popoverRect.height - arrowWidth;
            let popoverRectWidth = popoverRect.width - arrowWidth;

            switch (position) {
              case 'top':
                popoverRectWidth -= arrowWidth;
                break;
              case 'bottom':
                popoverRectWidth += arrowWidth;
                break;
              case 'left':
                popoverRectHeight -= arrowWidth;
                break;
              case 'right':
                popoverRectHeight -= arrowWidth;
                break;
              default:
                break;
            }

            left = left < 0 ? 0 : left;
            left = left + arrowWidth > popoverRectWidth ? popoverRectWidth : left;
            top = top < 0 ? 0 : top;
            top = top + arrowWidth > popoverRectHeight ? popoverRectHeight : top;

            return (
              <div styleName={classNames('popover')}>
                <div>{this.props.popoverContent}</div>
                <div
                  styleName={classNames('triangle')}
                  style={{
                    left,
                    top,
                    width: lengthSide,
                    height: lengthSide,
                  }}
                />
              </div>
            );
          }}
          displayPopover={this.state.displayPopover}
          autoReposition
        >
          <div>
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
