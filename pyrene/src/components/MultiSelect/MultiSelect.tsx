import React, { FunctionComponent, useState } from 'react';
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

interface Option {
  iconProps?: IconProps,
  label: string,
  value?: string | number | boolean,
}

export interface MultiSelectProps {
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
  defaultValue?: Array<Option>,
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
  options?: Array<Partial<Option> & { invalid?: boolean }>,
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
  value?: Array<Option>,
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

/**
 * Return the new value object array. If entries match a given option, use that option.
 * @param {string[]} values - array of string values
 * @param {object[]} options - pre-provided options
 * @returns {object[]} array of value object in same format as the options
 */
export const createNewValue = (values: string[], options: Required<MultiSelectProps['options']>) => values.filter((v) => v.length > 0)
  .map((v) => {
    const foundOption = options ? options.find((option) => option?.label?.toLowerCase?.() === v.toLowerCase()) : null;
    return foundOption || { value: v, label: v, invalid: false };
  });

/**
 * Multi-Selects are used when the user has to make a choice from a list. It allows the user to select multiple items from a dropdown list.
 */
const MultiSelect: FunctionComponent<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    clearable = false,
    creatable = false,
    defaultValue = [],
    disabled = false,
    helperLabel = '',
    invalid = false,
    invalidLabel = '',
    keepMenuOnSelect = false,
    loading = false,
    maxValueLabelWidth = '123px',
    name = '',
    onBlur = () => null,
    onChange = () => null,
    onFocus = () => null,
    options = [],
    placeholder = '',
    required = false,
    rows = -1,
    selectedOptionsInDropdown = false,
    sorted = true,
    title = '',
    value = [],
  } = props;

  const [hasPastedDuplicates, setHasPastedDuplicates] = useState(false);
  const opts = sorted ? [...options].sort((a, b) => a.label.localeCompare(b.label)) : options;

  const onPaste = (event) => {
    if (creatable) {
      setHasPastedDuplicates(false);
      // @ts-ignore event should be typed as a ClipboardEvent
      const pastedData = (event.clipboardData || window.clipboardData).getData('text');
      const delimitedValues = getCaseInsensitiveDistinctValues(getDelimitedValues(pastedData));
      const newValue = createNewValue(delimitedValues, options);
      if (value.length > 0) {
        const distinctNewValue = newValue.filter((o) => value.findIndex((exO) => exO.label.toLowerCase() === o.label.toLowerCase()) < 0);
        setHasPastedDuplicates(distinctNewValue.length < delimitedValues.length);
        onChange([...value, ...distinctNewValue]);
      } else {
        onChange(newValue);
      }

      // Prevents the pasted data from becoming inputValue
      event.preventDefault();
    }
  };

  const formatNoOptionsMessage = (input) => {
    const existingLabels = value.map((v) => v.label);
    const foundLabel = existingLabels.find((v) => v.toLowerCase() === input.inputValue.toLowerCase());
    return foundLabel ? `Duplicate tag "${foundLabel}"` : 'No matches found';
  };

  return (
    <div onPaste={onPaste} className={clsx(styles.selectContainer, { [styles.disabled]: disabled })}>
      {title && <div className={clsx(styles.selectTitle, { [styles.required]: required && !disabled })}>{title}</div>}
      {creatable
        ? (
          <CreatableSelect
            className="multiSelect"
            styles={MultiSelectStyle(props)}
            components={selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal}
            // Sets the internal value to "" in case of null or undefined
            getOptionValue={(option) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={placeholder}
            options={opts}
            value={value}
            defaultValue={defaultValue}
            isClearable={clearable}
            isDisabled={disabled}
            isInvalid={invalid}
            isLoading={loading}
            // wrapping type and key into target so it better reflects the api that input event has (there is also event.target.name)
            onChange={(option) => onChange(option, { target: { type: 'multiSelect', name: name, value: option } })}
            onInputChange={(input) => {
              if (input.length > 0) {
                setHasPastedDuplicates(false);
              }
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            id={name}
            inputId={name}
            maxMenuHeight={264}
            noOptionsMessage={formatNoOptionsMessage}
            formatCreateLabel={(inputValue) => `Create new tag "${inputValue}"`}
            closeMenuOnSelect={!keepMenuOnSelect}
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
            components={selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal}
            // Sets the internal value to "" in case of null or undefined
            getOptionValue={(option) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={placeholder}
            options={opts}
            value={value}
            defaultValue={defaultValue}
            isClearable={clearable}
            isDisabled={disabled}
            isInvalid={invalid}
            isLoading={loading}
            onChange={(option) => onChange(option, { target: { type: 'multiSelect', name: name, value: option } })}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            id={name}
            inputId={name}
            maxMenuHeight={264}
            noOptionsMessage={formatNoOptionsMessage}
            closeMenuOnSelect={!keepMenuOnSelect}
            isMulti
            isSearchable
            escapeClearsValue
            captureMenuScroll
            backspaceRemovesValue
          />
        )}

      {hasPastedDuplicates && creatable && !disabled
      && (
        <div className={styles.warningLabel}>
          <span className={clsx('pyreneIcon-warning', styles.errorIcon)} />
          Duplicates were found and removed
        </div>
      )}

      {invalid && invalidLabel && !disabled
        ? (
          <div className={styles.invalidLabel}>
            <span className={clsx('pyreneIcon-errorOutline', styles.errorIcon)} />
            {invalidLabel}
          </div>
        )
        : (
          <>
            {helperLabel && (
              <div className={styles.selectHelper}>
                {helperLabel}
              </div>
            )}
          </>
        )}
    </div>
  );
};

MultiSelect.displayName = 'Multi Select';

export default MultiSelect;
