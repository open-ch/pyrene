import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrowbutton.css';

const ArrowButton = props => (
  <button
    className={'unSelectable'}
    styleName={
      classNames('arrowButton',
        { [`direction-${props.direction}`]: true },
        { disabled: props.disabled })}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <span className={'icon-chevronRight'} styleName={'icon'} />
  </button>
);

ArrowButton.displayName = 'Arrow Button';

ArrowButton.defaultProps = {
  direction: 'right',
  disabled: false,
  onClick: () => null,
};

ArrowButton.propTypes = {
  /**
   *  Specifies the direction that the arrow is pointing.
   */
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']),
  /**
   *  Disables any interaction with the button.
   */
  disabled: PropTypes.bool,
  /**
   *  onClick function
   */
  onClick: PropTypes.func,
};

export default ArrowButton;
