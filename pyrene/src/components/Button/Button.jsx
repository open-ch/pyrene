import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';

export default class Button extends React.Component {

  render() {
    return (
      <button
        className={'unSelectable'}
        styleName={
          classNames('button',
            { [`type-${this.props.type}`]: true },
            { hasIcon: this.props.icon },
            { isDisabled: this.props.isDisabled })}
        onClick={this.props.onClick}
      >
        {this.props.icon && <span className={`icon-${this.props.icon}`} />}
        {this.props.label}
      </button>
    );
  }

}

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

Button.docProps = [
  { propName: 'icon', isRequired: false, type: 'String', defaultValue: '', description: 'Adds an icon in front of the label. Uses the icon-font.' },
  { propName: 'label', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the button says.' },
  { propName: 'type', isRequired: false, type: 'oneOf: primary secondary ghost danger action admin', defaultValue: 'primary', description: 'Changes the overall button style.' },
  { propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.' }
];

Button.displayName = 'Button';

Button.defaultProps = {
  icon: '',
  label: '',
  type: 'primary',
  isDisabled: false,
  onClick: () => null
};

Button.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'action', 'admin']),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func
};
