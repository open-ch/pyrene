import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../select.css';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import MultiSelectStyle from './multiSelectCSS';

/**
 * Selection elements are used primarily on ....
 */
const MultiSelect = props => (
  <div styleName={classNames('selectContainer', { disabled: props.disabled })}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
    {props.creatable ?
      <CreatableSelect
        className={'multiSelect'}
        styles={MultiSelectStyle(props.rows)}
        placeholder={props.placeholder}
        options={props.options}
        defaultValue={props.options.filter(option => props.defaultValues.includes(option.value))}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        onChange={(option) => props.onChange({target: {name: props.name, value: option, type: 'multiSelect'}})}
        onBlur={props.onBlur}
        name={props.name}
        id={props.name}
        inputId={props.name}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}
        formatCreateLabel={inputValue => `Create new tag "${inputValue}"`}

        closeMenuOnSelect={!props.keepMenuOnSelect}
        isMulti
        isSearchable
        escapeClearsValue
        captureMenuScroll
      />
      :
      <Select
        className={'multiSelect'}
        styles={MultiSelectStyle(props.rows)}
        placeholder={props.placeholder}
        options={props.options}
        defaultValue={props.options.filter(option => props.defaultValues.includes(option.value))}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        isSearchable={props.searchable}
        onChange={(option) => props.onChange({target: {name: props.name, value: option, type: 'multiSelect'}})}
        onBlur={props.onBlur}
        name={props.name}
        id={props.name}
        inputId={props.name}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}

        closeMenuOnSelect={!props.keepMenuOnSelect}
        isMulti
        escapeClearsValue
        captureMenuScroll
        backspaceRemovesValue
      />
    }

    {props.invalid && props.invalidLabel && !props.disabled ?
      <div styleName={'invalidLabel'}>
        <span className={'icon-errorOutline'} styleName={'errorIcon'} />
        {props.invalidLabel}
      </div>
      :
      <React.Fragment>
        {props.helperLabel &&
        <div styleName={'selectHelper'}>
          {props.helperLabel}
        </div>}
      </React.Fragment>
    }

  </div>
);

MultiSelect.displayName = 'Multi-Select';

MultiSelect.defaultProps = {
  placeholder: 'Multi-Select',
  helperLabel: '',
  invalidLabel: '',
  title: '',
  name: '',
  defaultValues: [],
  options: [],
  rows: -1,
  creatable: false,
  disabled: false,
  invalid: false,
  required: false,
  clearable: false,
  searchable: false,
  keepMenuOnSelect: false,
  value: null,
  onChange: () => null,
  onBlur: () => null,
};

MultiSelect.propTypes = {
  /**
   * Let's the user clear his selection.
   */
  clearable: PropTypes.bool,
  /**
   * Keep the menu open on select if false
   */
  keepMenuOnSelect: PropTypes.bool,
  /**
   * Allows to create new options.
   */
  creatable: PropTypes.bool,
  /**
   * Set's one or multiple preselected options.
   */
  defaultValues: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
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
   * Html input name tag
   */
  name: PropTypes.string,
  /**
   * Event Handler.
   */
  onBlur: PropTypes.func,
  /**
   * Event Handler. Param option: {value: , label:}
   */
  onChange: PropTypes.func,
  /**
   * Supplies the available options to the dropdown.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    invalid: PropTypes.bool,
  })),
  /**
   * Placeholder inside the input.
   */
  placeholder: PropTypes.string,
  /**
   * Adds a visual indication that the field is required..
   */
  required: PropTypes.bool,
  /**
   * Let's you set a fixed height to the multiselect. Default behaviour is one row that expands up to 3, then starts scrolling.
   */
  rows: PropTypes.number,
  /**
   * Let's the user type in the inputbox.
   */
  searchable: PropTypes.bool,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Changes the currently chosen option. Only set when needed, do not keep prop set at all times as this prevents user interaction.
   */
  value: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })),
};

export default MultiSelect;
