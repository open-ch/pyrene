import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textArea.css';


export default class TextArea extends React.Component {

  constructor(props) {
    super(props);

    this.textAreaRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return {
        value: nextProps.value,
      };
    }
    // No State Change
    return null;
  }

  handleChange(event) {
    const newValue = event.target.value;
    this.setState((prevState, props) =>
      ({ value: newValue }),
    () => this.props.onChange(newValue));
  }

  render() {
    const characterCount = this.props.maxLength - this.state.value.length;
    const characterLimitReached = characterCount < 0;
    const width = this.props.width >= 0 ? `${this.props.width}px` : '100%';
    return (
      <div
        style={{ width: width }}
        styleName={classNames(
          'textAreaContainer',
          { disabled: this.props.disabled },
          { invalid: this.props.invalid && !this.props.disabled },
          { full: characterLimitReached && !this.props.disabled && this.props.maxLength >= 0 })
        }
      >
        <div styleName={'textAreaTitleBar'}>
          {this.props.title && <span styleName={classNames('textAreaTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</span>}
          {this.props.maxLength >= 0 && <span styleName={'characterCounter'}>{characterCount}</span>}
        </div>
        <textarea
          styleName={classNames('textArea', { resizeable: this.props.resizeable })}
          name={this.props.name}
          placeholder={this.props.placeholder}
          ref={this.textAreaRef}
          rows={this.props.rows}
          value={this.state.value}
          wrap={'hard'}
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
        />
        {(this.props.helperLabel || characterLimitReached || this.props.invalid) &&
        <div styleName={'textAreaHelper'}>

          {(this.props.invalid || (characterLimitReached && !this.props.disabled && this.props.maxLength >= 0)) &&
          <span className={'icon-errorOutline'} styleName={'errorIcon'} />}
          {(characterLimitReached && !this.props.disabled && this.props.maxLength >= 0) ? 'Maximum number of characters reached' : this.props.helperLabel}

        </div>}
      </div>
    );
  }

}

TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  title: '',
  value: '',
  placeholder: '',
  helperLabel: '',
  invalidLabel: '',
  name: '',
  width: -1,
  rows: 3,
  maxLength: -1,
  resizeable: false,
  required: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null,
};

TextArea.propTypes = {
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Helper text below the input field, also used to display error messages if prop invalid is set.
   */
  helperLabel: PropTypes.string,
  /**
   * Changes the fields and helpers visual appearance to indicate a validation error.
   */
  invalid: PropTypes.bool,
  /**
   * Displayed instead of the helperLabel if specified & invalid is set.
   */
  invalidLabel: PropTypes.string,
  /**
   * Sets a maximum character count. Default allows any length.
   */
  maxLength: PropTypes.number,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
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
  onFocus: PropTypes.func,
  /**
   * Changes what the text area placeholder says.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication that the field is required.
   */
  required: PropTypes.bool,
  /**
   * Let's the user resize the text area.
   */
  resizeable: PropTypes.bool,
  /**
   * Changes the height of the input field.
   */
  rows: PropTypes.number,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Predefines a typed value inside the input field
   */
  value: PropTypes.string,
  /**
   * Changes the width of the input field in px. Use -1 to inherit parent width.
   */
  width: PropTypes.number,

};

