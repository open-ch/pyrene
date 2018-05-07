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

TextField.docProps = [
  { propName: 'title', isRequired: false, type: 'String', defaultValue: '', description: 'Changes what the title says.' },
  { propName: 'placeholder', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the text field placeholder says.' },
  { propName: 'inputText', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the text field says.' },
  { propName: 'helperLabel', isRequired: true, type: 'String', defaultValue: '', description: 'Helper text below the input field, also used to display error messages if prop invalid is set.'},
  { propName: 'width', isRequired: false, type: 'Int', defaultValue: '-1', description: 'Changes the width of the input field in px. Use -1 to inherit parent width.' },
  { propName: 'required', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Adds a visual indication that the field is required.' },
  { propName: 'invalid', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Changes the fields and helpers visual appearance to indicate a validation error.' },
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the text field.' }
];


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
  title: PropTypes.string,
  placeholder: PropTypes.string,
  inputText: PropTypes.string,
  helperLabel: PropTypes.string,
  width: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

