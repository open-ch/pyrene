import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import selectStyle from './selectStyle';
import './select.css';
import Loader from '../Loader/Loader';
import CustomOption from './CustomOption';
import { SingleSelectGroupedOption, SingleSelectOption } from './SingleSelectTypes';

const LoadingIndicator = () => <Loader />;

export type SingleSelectProps = {
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
  defaultValue?: SingleSelectOption;
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
  groupedOptions?: SingleSelectGroupedOption[];
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
  onChange?: (option: SingleSelectOption, evt: {target: {type: string; name: string; value: any;}}) => void;
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
  options?: SingleSelectOption[];

  placeholder?: string;

  required?: boolean;

  searchable?: boolean;

  sorted?: boolean;

  title?: string;

  value?: SingleSelectOption
};
/**
 * Selects are used when the user has to make a selection from a list that is too large to show.
 */

const SingleSelect: React.FC<SingleSelectProps> = ({
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
  defaultValue = undefined,
  helperLabel = '',
  invalidLabel = '',
  title = '',
  value = undefined,
  onChange = () => null,
  onBlur = () => null,
  onFocus = () => null,
}: SingleSelectProps) => {

  if (sorted) {
    // sorting both
    groupedOptions.forEach((o: SingleSelectGroupedOption) => (o.options
      ? {
        label: o.label,
        options: o.options.sort((a, b) => a.label.localeCompare(b.label)),
      }
      : o));
    options.sort((a, b) => a.label.localeCompare(b.label));
  }

  // grouped options have precedence above the options -> its not possible to pass both!
  const optionsObj = groupedOptions.length > 0 ? groupedOptions : options;

  return (
    <div styleName={classNames('selectContainer', { disabled: disabled })}>
      {title && <div styleName={classNames('selectTitle', { required: required && !disabled })}>{title}</div>}

      {creatable
        ? (
          <CreatableSelect
            className="singleSelect"
            styles={selectStyle}
            components={{
              LoadingIndicator,
              Option: CustomOption,
            }}
            // Sets the internal value to "" in case of null or undefined
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
            getOptionValue={(option: any) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={placeholder}
            options={optionsObj}
            value={value}
            defaultValue={defaultValue}
            isClearable={clearable}
            isDisabled={disabled}
            isInvalid={invalid}
            isLoading={loading}
            // wrapping type and key into target so it better reflects the api that input event has (there is also event.target.name)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
            onChange={(option: any) => onChange(option, { target: { type: 'singleSelect', name: name, value: option } })}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            id={name}
            inputId={name}
            autoFocus={autoFocus}
            openMenuOnFocus={openMenuOnFocus}
            maxMenuHeight={maxMenuHeight}
            noOptionsMessage={() => 'no matches found'}
            formatCreateLabel={(inputValue: string) => `Create new tag "${inputValue}"`}
            isSearchable
            blurInputOnSelect
            escapeClearsValue
            captureMenuScroll
          />
        )
        : (
          <Select
            className="singleSelect"
            styles={selectStyle}
            components={{
              LoadingIndicator,
              Option: CustomOption,
            }}
            // Sets the internal value to "" in case of null or undefined
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
            getOptionValue={(option: any) => ((option.value !== null && typeof option.value !== 'undefined') ? option.value : '')}
            placeholder={placeholder}
            options={optionsObj}
            value={value}
            defaultValue={defaultValue}
            isClearable={clearable}
            isSearchable={searchable}
            isDisabled={disabled}
            isInvalid={invalid}
            isLoading={loading}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            onChange={(option: any) => onChange(option, { target: { type: 'singleSelect', name: name, value: option } })}
            onBlur={onBlur}
            onFocus={onFocus}
            name={name}
            id={name}
            inputId={name}
            autoFocus={autoFocus}
            openMenuOnFocus={openMenuOnFocus}
            maxMenuHeight={maxMenuHeight}
            noOptionsMessage={() => 'no matches found'}
            blurInputOnSelect
            escapeClearsValue
            captureMenuScroll
          />
        )}

      {invalid && invalidLabel && !disabled
        ? (
          <div styleName="invalidLabel">
            <span className="pyreneIcon-errorOutline" styleName="errorIcon" />
            {invalidLabel}
          </div>
        )
        : (
          <>
            {helperLabel
              && (
                <div styleName="selectHelper">
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
