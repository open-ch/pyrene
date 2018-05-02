import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './checkbox.css';


export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      checked: this.props.checked
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.checked !== nextProps.checked) {
      return {
        checked: nextProps.checked
      };
    }
    return null;
  }

  toggleChange() {
    this.props.onChange(!this.state.checked);
    this.setState(state => ({
      checked: !state.checked
    }));
  }

  render() {
    const rand = Math.floor(Math.random() * 1e10);
    return (
      <div styleName={'checkboxContainer'}>
        <input
          id={`checkbox_${this.props.label}_${rand}`}
          styleName={'checkbox'}
          type={'checkbox'}
          checked={this.state.checked}
          onChange={this.toggleChange}
        />

        <label
          className={'unSelectable'}
          styleName={
            classNames('checkboxLabel',
              { checked: this.state.checked },
              { disabled: this.props.disabled })}
          htmlFor={`checkbox_${this.props.label}_${rand}`}
        >
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
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the button.' },
  { propName: 'checked', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Pre-checks the component.' }
];

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => null
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
