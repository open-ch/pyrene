import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textField.css';


export default class TextField extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputText: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.inputText !== nextProps.inputText) {
      return {
        inputText: nextProps.inputText
      };
    }
    // No State Change
    return null;
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
    this.props.onChange(event);
  }

  _getWidth() {
    if (this.props.width >= 0) {
      return `${this.props.width}px`;
    }
    return '100%';
  }

  render() {
    return (
      <div styleName={classNames('textFieldContainer', { disabled: this.props.disabled }, { invalid: this.props.invalid && !this.props.disabled})} style={{width: this._getWidth()}}>
        <div styleName={classNames('textFieldTitle', { required: this.props.required && !this.props.disabled },)}>{this.props.title}</div>
        <input
          type="text"
          styleName={'textField'}
          placeholder={this.props.placeholder}
          value={this.state.inputText}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        <div styleName={classNames('textFieldHelper')}>{this.props.helperLabel}</div>
      </div>
    );
  }

}

TextField.displayName = 'TextField';

TextField.defaultProps = {
  title: '',
  inputText: '',
  placeholder: '',
  helperLabel: '',
  width: -1,
  required: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null
};

TextField.propTypes = {
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Changes what the text field placeholder says.
   */
  placeholder: PropTypes.string,
  /**
   * Changes what the text field says.
   */
  inputText: PropTypes.string,
  /**
   * Helper text below the input field, also used to display error messages if prop invalid is set.
   */
  helperLabel: PropTypes.string,
  /**
   * Changes the width of the input field in px. Use -1 to inherit parent width..
   */
  width: PropTypes.number,
  /**
   * Adds a visual indication that the field is required..
   */
  required: PropTypes.bool,
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Changes the fields and helpers visual appearance to indicate a validation error.
   */
  invalid: PropTypes.bool,
  /**
   * Event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Event handler.
   */
  onFocus: PropTypes.func
};

