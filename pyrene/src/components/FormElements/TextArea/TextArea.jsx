import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textArea.css';


/**
 * Textareas are used primarily on ....
 */
const TextArea = (props) => {

  const characterCount = props.maxLength - props.value.length;
  const characterLimitReached = characterCount < 0;

  return (
    <div
      style={{ width: props.width ? props.width : '100%' }}
      styleName={classNames(
        'textAreaContainer',
        { disabled: props.disabled },
        { invalid: props.invalid && !props.disabled },
        { full: characterLimitReached && !props.disabled && props.maxLength > 0 })
      }
    >
      <div styleName={'textAreaTitleBar'}>
        {props.title && <span styleName={classNames('textAreaTitle', { required: props.required && !props.disabled })}>{props.title}</span>}
        {props.maxLength > 0 && <span styleName={'characterCounter'}>{characterCount}</span>}
      </div>
      <textarea
        styleName={classNames('textArea', { resizeable: props.resizeable }, { filled: props.value })}
        name={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
        value={props.value}
        wrap={'hard'}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
      />

      {(props.invalid && props.invalidLabel && !props.disabled) ?
        <div styleName={'invalidLabel'}>
          <span className={'icon-errorOutline'} styleName={'errorIcon'} />
          {props.invalidLabel}
        </div>
        :
        <React.Fragment>
          {props.helperLabel &&
          <div styleName={'textAreaHelper'}>
            {props.helperLabel}
          </div>}
        </React.Fragment>
      }
    </div>
  );
};

TextArea.displayName = 'Textarea';

TextArea.defaultProps = {
  title: '',
  value: '',
  placeholder: '',
  helperLabel: '',
  invalidLabel: '',
  name: '',
  width: 0,
  rows: 3,
  maxLength: 0,
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

export default TextArea;