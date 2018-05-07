import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textArea.css';


export default class TextArea extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputText: '',
      maxLength: this.props.maxLength,
      lengthCounterStyle: {
        color: 'inherit'
      }
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
    const updatedmaxLength = this.props.maxLength - event.target.value.length;
    this.setState({
      inputText: event.target.value,
      maxLength: updatedmaxLength
    });
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
      <div styleName={classNames('textAreaContainer', { disabled: this.props.disabled }, { invalid: this.props.invalid && !this.props.disabled})} style={{ width: this._getWidth() }}>
        <div styleName={'textAreaTitleBar'}>
          <span styleName={classNames('textAreaTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</span>
          <span styleName={classNames('characterCounter', { full: this.state.maxLength < 0 })}>{this.state.maxLength}</span>
        </div>
        <textarea
          styleName={classNames('textArea', {resizeable: this.props.resizeable})}
          wrap={'hard'}
          rows={this.props.rows}
          value={this.state.inputText}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
        />
        <div styleName={classNames('textAreaHelper')}>{this.props.helperLabel}</div>
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

TextArea.docProps = [
  { propName: 'title', isRequired: false, type: 'String', defaultValue: '', description: 'Changes what the title says.' },
  { propName: 'placeholder', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the text area placeholder says.' },
  { propName: 'inputText', isRequired: true, type: 'String', defaultValue: '', description: 'Changes what the text area says.' },
  { propName: 'helperLabel', isRequired: true, type: 'String', defaultValue: '', description: 'Helper text below the input field, also used to display error messages if prop invalid is set.'},
  { propName: 'width', isRequired: false, type: 'Int', defaultValue: '-1', description: 'Changes the width of the input field in px. Use -1 to inherit parent width.' },
  { propName: 'rows', isRequired: false, type: 'Int', defaultValue: '3', description: 'Changes the height of the input field.' },
  { propName: 'maxLength', isRequired: false, type: 'Int', defaultValue: '3000', description: 'Sets a character count limit for the field.' },
  { propName: 'resizeable', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Let\'s the user resize the text area.' },
  { propName: 'required', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Adds a visual indication that the field is required.' },
  { propName: 'invalid', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Changes the fields and helpers visual appearance to indicate a validation error.' },
  { propName: 'disabled', isRequired: false, type: 'Bool', defaultValue: 'false', description: 'Disables any interaction with the text field.' }
];


TextArea.displayName = 'TextArea';

TextArea.defaultProps = {
  title: '',
  inputText: '',
  placeholder: '',
  helperLabel: '',
  width: -1,
  rows: 3,
  maxLength: 3000,
  resizeable: false,
  required: false,
  disabled: false,
  invalid: false,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null
};

TextArea.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  inputText: PropTypes.string,
  helperLabel: PropTypes.string,
  width: PropTypes.number,
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  resizeable: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

