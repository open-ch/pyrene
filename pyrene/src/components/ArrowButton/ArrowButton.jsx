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
        { isDisabled: props.isDisabled })}
    onClick={props.onClick}
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
  { propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.' }
];

ArrowButton.displayName = 'ArrowButton';

ArrowButton.defaultProps = {
  isDisabled: false,
  onClick: () => null
};

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']).isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
