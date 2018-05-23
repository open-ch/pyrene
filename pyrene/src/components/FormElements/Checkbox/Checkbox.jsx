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
    this.setState((prevState, props) => ({
      checked: !prevState.checked
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
          name={this.props.name}
        />

        <label
          className={'unSelectable'}
          styleName={
            classNames('checkboxLabel',
              { checked: this.state.checked },
              { disabled: this.props.disabled },
              { invalid: this.props.invalid && !this.state.checked })}
          htmlFor={`checkbox_${this.props.label}_${rand}`}
        >
          <span styleName={'checkboxIcon'} />
          {this.props.label}
        </label>
      </div>
    );
  }

}

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
  invalid: false,
  name: '',
  onChange: () => null,
};

Checkbox.propTypes = {
  /**
   * Pre-checks the checkbox.
   */
  checked: PropTypes.bool,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Changes the visual appearance, to signal that the usage was invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Displayed label.
   */
  label: PropTypes.string.isRequired,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Event handler.
   */
  onChange: PropTypes.func
};
