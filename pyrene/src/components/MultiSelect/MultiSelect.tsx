/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FunctionComponent, useState, ClipboardEvent } from 'react';
import clsx from 'clsx';
import Select, { Props as SelectProps, SelectComponentsConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styles from '../SingleSelect/select.css';
import MultiSelectStyle from './multiSelectCSS';
import Loader from '../Loader/Loader';
import MultiSelectMenuWithOptions from './MultiSelectMenuWithOptions';
import CustomOption from '../SingleSelect/CustomOption';
import { getCaseInsensitiveDistinctValues, getDelimitedValues } from './delimiterUtil';
import { Option } from './types';

export interface MultiSelectProps {
  /**
   * Custom new tag label. Sets the text for the "create new ..." option in the menu.
   */
  addNewTagLabel?: string,
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
  onChange?: (options: ReadonlyArray<Option>, op?: { target: { type: string, name: string, value: ReadonlyArray<Option> } }) => void,
  /**
   * Focus event handler, use this to dynamically fetch options.
   */
  onFocus?: () => void,
  /**
   * Data input array. Type: [{ value: string (required), label: string (required), invalid: bool }]
   */
  options?: ReadonlyArray<Option>,
  /**
   * Sets the placeholder label.
   */
  placeholder?: string,
  /**
   * Adds a visual indication to display that the field is required.
   */
  required?: boolean,
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
  value?: ReadonlyArray<Option>,
}

const LoadingIndicator = () => <Loader />;

const MultiValue: SelectComponentsConfig<Option, true>['MultiValue'] = ({ data: { value, label }, getValue }) => (
  <>
    {label}
    {value !== getValue()[getValue().length - 1].value ? ', ' : ' '}
  </>
);

const MultiValueLabel: SelectComponentsConfig<Option, true>['MultiValueLabel'] = ({ innerProps, children }) => (
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
export const createNewValue = (values: string[], options: MultiSelectProps['options']) => values.filter((v) => v.length > 0)
  .map((v) => {
    const foundOption = options ? options.find((option) => option?.label?.toLowerCase?.() === v.toLowerCase()) : null;
    return foundOption || { value: v, label: v, invalid: false };
  });

/**
 * Multi-Selects are used when the user has to make a choice from a list. It allows the user to select multiple items from a dropdown list.
 */
const MultiSelect: FunctionComponent<MultiSelectProps> = (props: MultiSelectProps) => {
  const {
    addNewTagLabel = 'Create new tag',
    clearable = false,
    creatable = false,
    defaultValue = [],
    disabled = false,
    helperLabel = '',
    invalid = false,
    invalidLabel = '',
    keepMenuOnSelect = false,
    loading = false,
    name = '',
    onBlur,
    onChange,
    onFocus,
    placeholder = '',
    required = false,
    selectedOptionsInDropdown = false,
    sorted = true,
    title = '',
    value = [],
    options = [],
  } = props;

  const [hasPastedDuplicates, setHasPastedDuplicates] = useState(false);
  const opts = sorted ? [...options].sort((a, b) => a.label.localeCompare(b.label)) : options;

  const onPaste = (event: ClipboardEvent<HTMLDivElement>) => {
    if (creatable) {
      setHasPastedDuplicates(false);
      const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');
      const delimitedValues = getCaseInsensitiveDistinctValues(getDelimitedValues(pastedData));
      const newValue = createNewValue(delimitedValues, options);
      if (value.length > 0) {
        const distinctNewValue = newValue.filter((o) => value.findIndex((exO) => exO.label.toLowerCase() === o.label.toLowerCase()) < 0);
        setHasPastedDuplicates(distinctNewValue.length < delimitedValues.length);
        onChange?.([...value, ...distinctNewValue]);
      } else {
        onChange?.(newValue);
      }

      // Prevents the pasted data from becoming inputValue
      event.preventDefault();
    }
  };

  const formatNoOptionsMessage: SelectProps<Option, true>['noOptionsMessage'] = (input) => {
    const existingLabels = value.map((v) => v.label);
    const foundLabel = existingLabels.find((v) => v.toLowerCase() === input.inputValue.toLowerCase());
    return foundLabel ? `Duplicate tag "${foundLabel}"` : 'No matches found';
  };

  return (
    <div onPaste={onPaste} className={clsx(styles.selectContainer, { [styles.disabled]: disabled })}>
      {title && <div className={clsx(styles.selectTitle, { [styles.required]: required && !disabled })}>{title}</div>}
      {creatable
        ? (
          <CreatableSelect<Option, true>
            className="multiSelect"
            styles={MultiSelectStyle(props) as any}
            components={(selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal) as SelectComponentsConfig<Option, true>}
            // Sets the internal value to "" in case of null or undefined
            getOptionValue={(option) => (option.value !== null && typeof option.value !== 'undefined' ? option.value : '')}
            placeholder={placeholder}
            options={opts}
            value={value}
            defaultValue={defaultValue}
            isClearable={clearable}
            isDisabled={disabled}
            isInvalid={invalid}
            isLoading={loading}
            // wrapping type and key into target so it better reflects the api that input event has (there is also event.target.name)
            onChange={(option: any) => onChange?.(option, { target: { type: 'multiSelect', name: name, value: option } })}
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
            formatCreateLabel={(inputValue) => `${addNewTagLabel} "${inputValue}"`}
            closeMenuOnSelect={!keepMenuOnSelect}
            isMulti
            isSearchable
            escapeClearsValue
            captureMenuScroll
          />
        )
        : (
          <Select<Option, true>
            className="multiSelect"
            styles={MultiSelectStyle(props) as any}
            components={(selectedOptionsInDropdown ? componentsOptionsInDropdown : componentsNormal) as SelectComponentsConfig<Option, true>}
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
            onChange={(option: any) => onChange?.(option, { target: { type: 'multiSelect', name: name, value: option } })}
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

      {hasPastedDuplicates && creatable && !disabled && (
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

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
