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
    <span className={'icon-Skip-right'} styleName={'icon'} />
  </button>
);

/**
 *
 *  Object which contains all props for the Proptable in Kitchensink
 *  Each prop should be passed as key-value pair following this scheme:
 *
 *  propName:{isRequired(bool): true|false, type(string): 'String|Bool|OneOf|...', default(string): 'defaultValue', description(string): 'This prop changes...'}
 *
 *  Note: default is only required if isRequired is false.
 *
 */

ArrowButton.docProps = [
  { propName: 'direction', isRequired: false, type: 'oneOf: up down right left', defaultValue: '', description: 'Arrow direction.' },
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.' }
];

ArrowButton.displayName = 'ArrowButton';

ArrowButton.defaultProps = {
  disabled: false,
  onClick: () => null
};

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default ArrowButton;
