/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import selectStyle from './selectStyle';
import styles from './select.css';
import Loader from '../Loader/Loader';
import CustomOption from './CustomOption';
import { SingleSelectGroupedOption, SingleSelectOption } from './SingleSelectTypes';

const LoadingIndicator = () => <Loader />;

type DefaultValueType = null | undefined | string | number | boolean;

export type SingleSelectProps<ValueType = DefaultValueType> = {
  /**
   * Focus an element when it mounts.
   */
  autoFocus?: boolean;
  /**
   * Whether the selection is clearable.
   */
  clearable?: boolean;
  /**
   * Whether the user can create new options.
   */
  creatable?: boolean;
  /**
   * Sets a preselected option.
   */
  defaultValue?: SingleSelectOption<ValueType>;
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean;
  /**
   * Data input array for dropdown with groups
   * eg of dropdown:

   * white // only option without group heading

   * SAD COLORS (not selectable heading) -- example a)
   * black (selectable option)
   * blue

   * HAPPY COLORS
   * yellow
   * light green
   */
  groupedOptions?: SingleSelectGroupedOption<ValueType>[];
  /**
   * Sets a label below the input field to display additional information for the user.
   */
  helperLabel?: string;
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean;
  /**
   * Sets the label displayed instead of the helperLabel when the input is invalid.
   */
  invalidLabel?: string;
  /**
   * Displays a loading indicator inside of the input.
   */
  loading?: boolean;
  /**
   * Sets the maximum height of the dropdown menu.
   */
  maxMenuHeight?: number;
  /**
   * Sets the html name property of the form element.
   */
  name?: string;
  /**
   * Javascript event handler.
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * Event Handler. Param option: {value: , label:}
   */
  onChange?: (option: SingleSelectOption<ValueType>, evt: { target: { type: string; name: string; value: SingleSelectOption<ValueType> } }) => void;
  /**
   * Focus event handler, use this to dynamically fetch options.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  /**
   * If true, menu opens on "on focus"
   * false by default
   * */
  openMenuOnFocus?: boolean;
  /**
   * Data input array. Type: [{ value: string (required), label: string (required), invalid: bool }]
   */
  options?: SingleSelectOption<ValueType>[];

  placeholder?: string;

  required?: boolean;

  searchable?: boolean;

  sorted?: boolean;

  title?: string;

  value?: SingleSelectOption<ValueType>
};

const sortOptions = <ValueType extends unknown>(options: SingleSelectOption<ValueType>[]) => {
  const sortedOptions = [...options];
  sortedOptions.sort((a, b) => a.label.localeCompare(b.label));
  return sortedOptions;
};

const getOptionsObj = <ValueType extends unknown>(
  options: SingleSelectOption<ValueType>[],
  groupedOptions: SingleSelectGroupedOption<ValueType>[],
  sorted: boolean,
): SingleSelectOption<ValueType>[] | SingleSelectGroupedOption<ValueType>[] => {
  // grouped options have precedence above the options -> its not possible to pass both!
  if (groupedOptions.length) {
    if (sorted) {
      return groupedOptions.map((o) => (o.options
        ? ({ ...o, options: sortOptions(o.options) })
        : o
      ));
    }
    return groupedOptions;
  }
  if (sorted) {
    return sortOptions(options);
  }
  return options;

};

const defaultFilterOption = <ValueType extends unknown>(option: { label: string, value?: string, data: SingleSelectOption<ValueType> }, rawInput: string) => {
  const lowerInput = rawInput.toLowerCase();
  const values = [
    option.value ? option.value.toString() : null,
    option.label,
    ...(option.data.tags || []),
  ];
  return values.some((tag) => tag && tag.toLowerCase().indexOf(lowerInput) >= 0);
};

/**
 * Selects are used when the user has to make a selection from a list that is too large to show.
 */
const SingleSelect = <ValueType extends unknown = DefaultValueType>({
  autoFocus = false,
  placeholder = '',
  name = '',
  creatable = false,
  disabled = false,
  invalid = false,
  loading = false,
  required = false,
  searchable = false,
  sorted = true,
  clearable = false,
  options = [],
  groupedOptions = [],
  maxMenuHeight = 264,
  openMenuOnFocus = false,
  defaultValue,
  helperLabel = '',
  invalidLabel = '',
  title = '',
  value,
  onChange,
  onBlur = () => null,
  onFocus = () => null,
}: SingleSelectProps<ValueType>): React.ReactElement => {

  const optionsObj = getOptionsObj(options, groupedOptions, sorted);

  const selectProps = {
    className: 'singleSelect',
    styles: selectStyle(),
    components: {
      LoadingIndicator,
      Option: CustomOption,
    },
    getOptionValue: (option: any) => option.value ?? '',
    placeholder: placeholder,
    options: optionsObj,
    value: value,
    defaultValue: defaultValue,
    isClearable: clearable,
    isDisabled: disabled,
    isInvalid: invalid,
    isLoading: loading,
    onChange: (option: any) => onChange?.(option, { target: { type: 'singleSelect', name: name, value: option } }),
    onBlur: onBlur,
    onFocus: onFocus,
    name: name,
    id: name,
    inputId: name,
    autoFocus: autoFocus,
    openMenuOnFocus: openMenuOnFocus,
    maxMenuHeight: maxMenuHeight,
    noOptionsMessage: () => 'no matches found',
    filterOption: defaultFilterOption,
    formatCreateLabel: creatable ? (inputValue: string) => `Create new tag "${inputValue}"` : undefined,
    isSearchable: creatable ? true : searchable,
    blurInputOnSelect: true,
    escapeClearsValue: true,
    captureMenuScroll: true,
  };

  return (
    <div className={clsx(styles.selectContainer, { [styles.disabled]: disabled })}>
      {title && <div className={clsx(styles.selectTitle, { [styles.required]: (required && !disabled) })}>{title}</div>}

      {creatable ? <CreatableSelect {...selectProps} /> : <Select {...selectProps} /> }

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

SingleSelect.displayName = 'Single Select';

export default SingleSelect;
