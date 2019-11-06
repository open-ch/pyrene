import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './textArea.css';


/**
 * Textareas allow the user to enter several lines of text.
 */
const TextArea = (props) => {

  const characterCount = props.maxLength - (props.value !== null ? props.value.length : 0);
  const characterLimitReached = characterCount < 0;

  return (
    <div
      style={{ width: props.width ? props.width : '100%' }}
      styleName={classNames(
        'textAreaContainer',
        { disabled: props.disabled },
        { invalid: props.invalid && !props.disabled },
        { full: characterLimitReached && !props.disabled && props.maxLength > 0 },
      )}
    >
      <div styleName="textAreaTitleBar">
        {props.title && <span styleName={classNames('textAreaTitle', { required: props.required && !props.disabled })}>{props.title}</span>}
        {props.maxLength > 0 && <span styleName="characterCounter">{characterCount}</span>}
      </div>
      <textarea
        styleName={classNames('textArea', { resizeable: props.resizeable }, { filled: props.value })}
        name={props.name}
        placeholder={props.placeholder}
        rows={props.rows}
        value={props.value}
        wrap="hard"
        onBlur={props.onBlur}
        onChange={(event) => props.onChange(event.target.value, event)}
        onFocus={props.onFocus}
      />

      {(props.invalid && props.invalidLabel && !props.disabled)
        ? (
          <div styleName="invalidLabel">
            <span className="pyreneIcon-errorOutline" styleName="errorIcon" />
            {props.invalidLabel}
          </div>
        )
        : (
          <>
            {props.helperLabel
          && (
            <div styleName="textAreaHelper">
              {props.helperLabel}
            </div>
          )}
          </>
        )}
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
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel: PropTypes.string,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel: PropTypes.string,
  /**
   * Sets a maximum allowed number of characters.
   */
  maxLength: PropTypes.number,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Javascript event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Javascript event handler.
   */
  onChange: PropTypes.func,
  /**
   * Javascript event handler.
   */
  onFocus: PropTypes.func,
  /**
   * Sets the placeholder label.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required: PropTypes.bool,
  /**
   * Whether the user can resize the text area's height.
   */
  resizeable: PropTypes.bool,
  /**
   * Sets a fixed height for the input field.
   */
  rows: PropTypes.number,
  /**
   * Sets the title above the input field.
   */
  title: PropTypes.string,
  /**
   * Sets the value of the input field.
   */
  value: PropTypes.string,
  /**
   * Sets a fixed width (px) for the input field.
   */
  width: PropTypes.number,
};

export default TextArea;
