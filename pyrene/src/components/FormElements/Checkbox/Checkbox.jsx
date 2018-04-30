import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkbox.css';


export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isChecked: this.props.preChecked
    };
  }

  toggleChange() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  render() {
    return (
      <div styleName={'checkboxContainer'}>
        <input
          id={`checkbox_${this.props.label}`}
          styleName={'checkbox'}
          type={'checkbox'}
          checked={this.state.isChecked}
          onChange={this.toggleChange}
        />

        <label className={'unSelectable'} styleName={classNames('checkboxLabel', { isChecked: this.state.isChecked }, { isDisabled: this.props.isDisabled})} htmlFor={`checkbox_${this.props.label}`}>
          <span styleName={'checkboxIcon'} />
          {this.props.label}
        </label>
      </div>
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

Checkbox.docProps = [
  { propName: 'label', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the button says.' },
  { propName: 'isDisabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.' },
  { propName: 'preChecked', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Pre-checks the component.' }
];

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  isDisabled: false,
  preChecked: false
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  preChecked: PropTypes.bool
};
