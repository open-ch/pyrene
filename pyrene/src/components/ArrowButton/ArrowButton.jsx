import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrowbutton.css';

/**
 * Buttons are used primarily on action items and to communicate what action the user can take.
 * They are placed throughout the UI and can be found in places like forms, modals, dialogues etc.
 * Do not use Buttons as navigational elements.
 * Instead, use Links because it takes the user to a new page and is not associated with an action.
 */
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
   * Sets the direction of the arrow.
   */
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onClick: PropTypes.func,
};

export default ArrowButton;
