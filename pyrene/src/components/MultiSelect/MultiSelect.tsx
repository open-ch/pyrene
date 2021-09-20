import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styles from '../SingleSelect/select.css';
import MultiSelectStyle from './multiSelectCSS';
import Loader from '../Loader/Loader';
import MultiSelectMenuWithOptions from './MultiSelectMenuWithOptions';
import CustomOption from '../SingleSelect/CustomOption';
import { getCaseInsensitiveDistinctValues, getDelimitedValues } from './delimiterUtil';
import { IconProps } from '../Icon/Icon';

export interface MultiSelect {
  /**
   * Whether the selection is clearable.
   */
  clearable?: boolean,
  /**
   * Whether the user can create new options.
   */
  creatable?: boolean,
  /**
   * Sets a preselected options. Type: [ string | number ]
   */
  defaultValue?: Array<{
    iconProps?: IconProps,
    label: string,
    value?: string | number | boolean,
  }>,
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel?: string,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean,
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel?: string,
  /**
   * Whether to keep the menu open on select.
   */
  keepMenuOnSelect?: boolean,
  /**
   * Displays a loading indicator inside of the input.
   */
  loading?: boolean,
  /**
   * Maximum width of the value label in pixels. Use false to disable a maximum width.
   */
  maxValueLabelWidth?: string, // eslint-disable-line react/no-unused-prop-types
  /**
   * Sets the html name property of the form element.
   */
  name?: string,
  /**
   * Javascript event handler.
   */
  onBlur?: () => void,
  /**
   * Custom event handler, returns selected options from the options array.
   */
  onChange?: () => void,
  /**
   * Focus event handler, use this to dynamically fetch options.
   */
  onFocus?: () => void,
  /**
   * Data input array. Type: [{ value: string (required), label: string (required), invalid: bool }]
   */
  options: Array<{
    iconProps?: IconProps,
    invalid?: boolean,
    label?: string,
    value?: string | number | boolean,
  }>,
  /**
   * Sets the placeholder label.
   */
  placeholder?: string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required?: boolean,
  /**
   * Sets a fixed height for the input field. Default behaviour is one row expanding up to 3, then starts scrolling.
   */
  rows?: number, // eslint-disable-line react/no-unused-prop-types
  /**
   * Displays the selected options in the dropdown and prevents the input from growing vertically.
   */
  selectedOptionsInDropdown?: boolean,
  /**
   * Whether the options are automatically sorted by the label or not.
   */
  sorted?: boolean,
  /**
   * Sets the title above the input field.
   */
  title?: string,
  /**
   * Sets the value of the input field. Same type as supplied options.
   */
  value: Array<{
    iconProps?: IconProps,
    label: string,
    value?: string | number | boolean,
  }>,
}

const LoadingIndicator = () => <Loader />;

const MultiValue = ({ data: { value, label }, getValue }) => ( // eslint-disable-line react/prop-types
  <>
    {label}
    {value !== getValue()[getValue().length - 1].value ? ', ' : ' '}
  </>
);

const MultiValueLabel = ({ innerProps, children }) => ( // eslint-disable-line react/prop-types
  <div title={typeof children === 'string' ? children : undefined} {...innerProps}>
    {children}
  </div>
);

const componentsNormal = {
  LoadingIndicator,
  Option: CustomOption,
  MultiValueLabel,
};
const componentsOptionsInDropdown = {
  Menu: MultiSelectMenuWithOptions,
  MultiValue,
  LoadingIndicator,
  Option: CustomOption,
  MultiValueLabel,
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
      // @ts-ignore event should be typed as a ClipboardEvent
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
    const existingLabels = (props.value || []).map((v) => v.label);
    const foundLabel = existingLabels.find((v) => v.toLowerCase() === input.inputValue.toLowerCase());
    return foundLabel ? `Duplicate tag "${foundLabel}"` : 'No matches found';
  };

  return (
    <div onPaste={onPaste} className={clsx(styles.selectContainer, { [styles.disabled]: props.disabled })}>
      {props.title && <div className={clsx(styles.selectTitle, { [styles.required]: (props.required && !props.disabled) })}>{props.title}</div>}
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
            onInputChange={(input) => {
              if (input.length > 0) {
                setHasPastedDuplicates(false);
              }
            }}
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
        <div className={styles.warningLabel}>
          <span className={clsx('pyreneIcon-warning', styles.errorIcon)} />
          Duplicates were found and removed
        </div>
      )}

      {props.invalid && props.invalidLabel && !props.disabled
        ? (
          <div className={styles.invalidLabel}>
            <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
            {props.invalidLabel}
          </div>
        )
        : (
          <>
            {props.helperLabel
        && (
          <div className={styles.selectHelper}>
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
  maxValueLabelWidth: '123px',
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

export default MultiSelect;
