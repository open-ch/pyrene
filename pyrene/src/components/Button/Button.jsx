import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.css';


export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <button styleName={classNames('button', {[`type-${this.props.type}`]: true})}>
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
  {propName: 'label', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the button says.'},
  {propName: 'type', isRequired: false, type: 'oneOf: primary secondary ghost danger', defaultValue: 'primary', description: 'Changes the overall button style.'},
];

Button.displayName = 'Button';

Button.defaultProps = {
  label: '',
  type: 'primary'
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger'])
};