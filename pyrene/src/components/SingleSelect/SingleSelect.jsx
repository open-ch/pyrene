import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import SelectStyle from './singleSelectCSS';
import './select.css';
import Loader from '../Loader/Loader';

const LoadingIndicator = () => <Loader />;

/**
 * Selects are used when the user has to make a selection from a list that is too large to show.
 */
const SingleSelect = props => (
  <div styleName={classNames('selectContainer', { disabled: props.disabled })}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}

    {props.creatable
      ? (
        <CreatableSelect
          className="singleSelect"
          styles={SelectStyle}
          components={{ LoadingIndicator }}
          placeholder={props.placeholder}
          options={props.options}
          value={props.value ? props.options.filter(o => o.value === props.value).pop() : null}
          defaultValue={props.options.filter(o => o.value === props.defaultValue).pop()}
          isClearable={props.clearable}
          isDisabled={props.disabled}
          isInvalid={props.invalid}
          isLoading={props.loading}
          onChange={option => props.onChange({ target: { name: props.name, value: option, type: 'singleSelect' } })}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          name={props.name}
          id={props.name}
          inputId={props.name}

          maxMenuHeight={264}
          noOptionsMessage={() => 'no matches found'}
          formatCreateLabel={inputValue => `Create new tag "${inputValue}"`}

          isSearchable
          blurInputOnSelect
          escapeClearsValue
          captureMenuScroll
        />
      )
      : (
        <Select
          className="singleSelect"
          styles={SelectStyle}
          components={{ LoadingIndicator }}
          placeholder={props.placeholder}
          options={props.options}
          value={props.value ? props.options.filter(o => o.value === props.value).pop() : null}
          defaultValue={props.options.filter(o => o.value === props.defaultValue).pop()} // pop() -> take only last found value
          isClearable={props.clearable}
          isSearchable={props.searchable}
          isDisabled={props.disabled}
          isInvalid={props.invalid}
          isLoading={props.loading}
          onChange={option => props.onChange({ target: { name: props.name, value: option, type: 'singleSelect' } })}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          name={props.name}
          id={props.name}
          inputId={props.name}

          maxMenuHeight={264}
          noOptionsMessage={() => 'no matches found'}

          blurInputOnSelect
          escapeClearsValue
          captureMenuScroll
        />
      )
    }

    {props.invalid && props.invalidLabel && !props.disabled
      ? (
        <div styleName="invalidLabel">
          <span className="pyreneIcon-errorOutline" styleName="errorIcon" />
          {props.invalidLabel}
        </div>
      )
      : (
        <React.Fragment>
          {props.helperLabel
        && (
          <div styleName="selectHelper">
            {props.helperLabel}
          </div>
        )}
        </React.Fragment>
      )
    }

  </div>
);

SingleSelect.displayName = 'Single Select';

SingleSelect.defaultProps = {
  placeholder: 'Select',
  name: '',
  creatable: false,
  disabled: false,
  invalid: false,
  loading: false,
  required: false,
  searchable: false,
  clearable: false,
  options: [],
  defaultValue: null,
  helperLabel: '',
  invalidLabel: '',
  title: '',
  value: null,
  onChange: () => null,
  onBlur: () => null,
  onFocus: () => null,
};

SingleSelect.propTypes = {
  /**
   * Whether the selection is clearable.
   */
  clearable: PropTypes.bool,
  /**
   * Whether the user can create new options.
   */
  creatable: PropTypes.bool,
  /**
   * Sets a preselected option.
   */
  defaultValue: PropTypes.string,
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
   * Displays a loading indicator inside of the input.
   */
  loading: PropTypes.bool,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Javascript event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Event Handler. Param option: {value: , label:}
   */
  onChange: PropTypes.func,
  /**
    * Focus event handler, use this to dynamically fetch options.
    */
  onFocus: PropTypes.func,
  /**
   * Data input array. Type: [{ value: string (required), label: string (required), invalid: bool }]
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    invalid: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  /**
   * Sets the placeholder label.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required: PropTypes.bool,
  /**
   * Whether the user is allowed to type to search elements. Ignored if creatable is set true.
   */
  searchable: PropTypes.bool,
  /**
   * Sets the title above the input field.
   */
  title: PropTypes.string,
  /**
   * Sets the value of the input field. Same type as supplied options.
   */
  value: PropTypes.string,
};

export default SingleSelect;
