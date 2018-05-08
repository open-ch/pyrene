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
      value: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return {
        value: nextProps.value
      };
    }
    // No State Change
    return null;
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  _getWidth() {
    if (this.props.resizeable) {
      return 'auto';
    }
    if (this.props.width >= 0) {
      return `${this.props.width}px`;
    }
    return '100%';
  }

  render() {
    const characterCount = this.props.maxLength - this.state.value.length;
    const characterLimitReached = characterCount < 0;
    return (
      <div
        styleName={classNames(
          'textAreaContainer',
          { disabled: this.props.disabled },
          { invalid: this.props.invalid && !this.props.disabled},
          { full: characterLimitReached && !this.props.disabled && this.props.maxLength >= 0})
        }
        style={{ width: this._getWidth() }}
      >
        <span styleName={classNames('textAreaTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</span>
        <div styleName={'textAreaInputContainer'}>
          <textarea
            styleName={classNames('textArea', { resizeable: this.props.resizeable })}
            wrap={'hard'}
            rows={this.props.rows}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            ref={this.textAreaRef}
          />
          {this.props.maxLength >= 0 && <span styleName={'characterCounter'}>{characterCount}</span>}
        </div>
        <div styleName={'textAreaHelper'}>{characterLimitReached && !this.props.disabled && this.props.maxLength >= 0 ? 'Maximum number of characters reached' : this.props.helperLabel}</div>
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
  width: -1,
  rows: 3,
  maxLength: -1,
  resizeable: false,
  required: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null
};

TextArea.propTypes = {
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Changes what the text area placeholder says.
   */
  placeholder: PropTypes.string,
  /**
   * Changes what the text area says.
   */
  value: PropTypes.string,
  /**
   * Helper text below the input field, also used to display error messages if prop invalid is set.
   */
  helperLabel: PropTypes.string,
  /**
   * Changes the width of the input field in px. Use -1 to inherit parent width.
   */
  width: PropTypes.number,
  /**
   * Changes the height of the input field.
   */
  rows: PropTypes.number,
  /**
   * Sets a maximum character count. Default allows any length.
   */
  maxLength: PropTypes.number,
  /**
   * Let's the user resize the text area.
   */
  resizeable: PropTypes.bool,
  /**
   * Adds a visual indication that the field is required.
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

