import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import '../SingleSelect/select.css';
import MultiSelectStyle from './multiSelectCSS';
import Loader from '../Loader/Loader';
import MultiSelectMenuWithOptions from './MultiSelectMenuWithOptions';
import CustomOption from '../SingleSelect/CustomOption';
import { getCaseInsensitiveDistinctValues, getDelimitedValues } from './delimiterUtil';

const LoadingIndicator = () => <Loader />;

const MultiValue = ({ data: { value, label }, getValue }) => ( // eslint-disable-line react/prop-types
  <>
    {label}
    {value !== getValue()[getValue().length - 1].value ? ', ' : ' '}
  </>
);

const componentsNormal = {
  LoadingIndicator,
  Option: CustomOption,
};
const componentsOptionsInDropdown = {
  Menu: MultiSelectMenuWithOptions,
  MultiValue,
  LoadingIndicator,
  Option: CustomOption,
};

// Finds the union of value and options, based on options[].value and values[].value being equal.
export const valueFromOptions = (options, values) => options.filter((o) => values.findIndex((v) => o.value === v.value) > -1);

/**
 * Return the new value object array. If entries match a given option, use that option.
 * @param {string[]} values - array of string values
 * @param {object[]} options - pre-provided options
 * @returns {object[]} array of value object in same format as the options
 */
export const createNewValue = (values, options) => values.filter((v) => v.length > 0)
  .map((v) => {
    const foundOption = options ? options.find((o) => o.label.toLowerCase() === v.toLowerCase()) : null;
    return foundOption || { value: v, label: v, invalid: false };
  });

/**
 * Multi-Selects are used when the user has to make a choice from a list. It allows the user to select multiple items from a dropdown list.
 */
const MultiSelect = (props) => {
  const [hasPastedDuplicates, setHasPastedDuplicates] = useState(false);
  const options = props.sorted ? props.options.sort((a, b) => a.label.localeCompare(b.label)) : props.options;

  const onPaste = (event) => {
    if (props.creatable) {
      setHasPastedDuplicates(false);
      const pastedData = (event.clipboardData || window.clipboardData).getData('text');
      const delimitedValues = getCaseInsensitiveDistinctValues(getDelimitedValues(pastedData));
      const newValue = createNewValue(delimitedValues, props.options);
      if (props.value) {
        const distinctNewValue = newValue.filter((o) => props.value.findIndex((exO) => exO.label.toLowerCase() === o.label.toLowerCase()) < 0);
        setHasPastedDuplicates(distinctNewValue.length < delimitedValues.length);
        props.onChange([...props.value, ...distinctNewValue]);
      } else {
        props.onChange(newValue);
      }

      // Prevents the pasted data from becoming inputValue
      event.preventDefault();
    }
  };

  const formatNoOptionsMessage = (input) => {
    const existingLabels = props.value.map((v) => v.label);
    const foundLabel = existingLabels.find((v) => v.toLowerCase() === input.inputValue.toLowerCase());
    return foundLabel ? `Duplicate tag "${foundLabel}"` : 'No matches found';
  };

  return (
    <div onPaste={onPaste} styleName={classNames('selectContainer', { disabled: props.disabled })}>
      {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
      {props.creatable
        ? (
          <CreatableSelect
            className="multiSelect"
            styles={MultiSelectStyle(props)}
            components={props.selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal}
            // Sets the internal value to "" in case of null or undefined
            getOptionValue={(option) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={props.placeholder}
            options={options}
            value={props.value}
            defaultValue={props.defaultValue}
            isClearable={props.clearable}
            isDisabled={props.disabled}
            isInvalid={props.invalid}
            isLoading={props.loading}
            // wrapping type and key into target so it better reflects the api that input event has (there is also event.target.name)
            onChange={(option) => props.onChange(option, { target: { type: 'multiSelect', name: props.name, value: option } })}
            onInputChange={() => setHasPastedDuplicates(false)}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            name={props.name}
            id={props.name}
            inputId={props.name}

            maxMenuHeight={264}
            noOptionsMessage={formatNoOptionsMessage}
            formatCreateLabel={(inputValue) => `Create new tag "${inputValue}"`}

            closeMenuOnSelect={!props.keepMenuOnSelect}
            isMulti
            isSearchable
            escapeClearsValue
            captureMenuScroll
          />
        )
        : (
          <Select
            className="multiSelect"
            styles={MultiSelectStyle(props)}
            components={props.selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal}
            // Sets the internal value to "" in case of null or undefined
            getOptionValue={(option) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={props.placeholder}
            options={options}
            value={props.value}
            defaultValue={props.defaultValue}
            isClearable={props.clearable}
            isDisabled={props.disabled}
            isInvalid={props.invalid}
            isLoading={props.loading}
            onChange={(option) => props.onChange(option, { target: { type: 'multiSelect', name: props.name, value: option } })}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            name={props.name}
            id={props.name}
            inputId={props.name}

            maxMenuHeight={264}
            noOptionsMessage={formatNoOptionsMessage}

            closeMenuOnSelect={!props.keepMenuOnSelect}

            isMulti
            isSearchable
            escapeClearsValue
            captureMenuScroll
            backspaceRemovesValue
          />
        )}

      {hasPastedDuplicates && props.creatable && !props.disabled
      && (
        <div styleName="warningLabel">
          <span className="pyreneIcon-warning" styleName="errorIcon" />
          Duplicates were found and removed
        </div>
      )}

      {props.invalid && props.invalidLabel && !props.disabled
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
          <div styleName="selectHelper">
            {props.helperLabel}
          </div>
        )}
          </>
        )}

    </div>
  );
};

MultiSelect.displayName = 'Multi Select';

MultiSelect.defaultProps = {
  placeholder: '',
  helperLabel: '',
  invalidLabel: '',
  title: '',
  name: '',
  defaultValue: [],
  options: [],
  rows: -1,
  selectedOptionsInDropdown: false,
  creatable: false,
  disabled: false,
  invalid: false,
  loading: false,
  required: false,
  clearable: false,
  keepMenuOnSelect: false,
  sorted: true,
  value: null,
  onChange: () => null,
  onBlur: () => null,
  onFocus: () => null,
};

MultiSelect.propTypes = {
  /**
   * Whether the selection is clearable.
   */
  clearable: PropTypes.bool,
  /**
   * Whether the user can create new options.
   */
  creatable: PropTypes.bool,
  /**
   * Sets a preselected options. Type: [ string | number ]
   */
  defaultValue: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })),
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
   * Whether to keep the menu open on select.
   */
  keepMenuOnSelect: PropTypes.bool,
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
   * Custom event handler, returns selected options from the options array.
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
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
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
   * Sets a fixed height for the input field. Default behaviour is one row expanding up to 3, then starts scrolling.
   */
  rows: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  /**
   * Displays the selected options in the dropdown and prevents the input from growing vertically.
   */
  selectedOptionsInDropdown: PropTypes.bool,
  /**
   * Whether the options are automatically sorted by the label or not.
   */
  sorted: PropTypes.bool,
  /**
   * Sets the title above the input field.
   */
  title: PropTypes.string,
  /**
   * Sets the value of the input field. Same type as supplied options.
   */
  value: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  })),
};

export default MultiSelect;
