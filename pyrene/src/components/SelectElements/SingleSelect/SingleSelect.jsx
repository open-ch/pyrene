import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import SelectStyle from './singleSelectCSS';
import '../select.css';


const SingleSelect = props => (
  <div styleName={classNames('selectContainer', {disabled: props.disabled}, {invalid: props.invalid && !props.disabled})}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}

    {props.creatable ?
      <CreatableSelect
        className={'singleSelect'}
        styles={SelectStyle}
        placeholder={props.placeholder}
        options={props.options}
        defaultValue={props.defaultValue}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        onChange={option => props.onChange(option)}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}
        formatCreateLabel={inputValue => `Create new tag "${inputValue}"`}

        isSearchable
        blurInputOnSelect
        escapeClearsValue
        captureMenuScroll
      />
      :
      <Select
        className={'singleSelect'}
        styles={SelectStyle}
        placeholder={props.placeholder}
        options={props.options}
        defaultValue={props.defaultValue}
        isClearable={props.clearable}
        isSearchable={props.searchable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        onChange={(option) => props.onChange(option)}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}

        blurInputOnSelect
        escapeClearsValue
        captureMenuScroll
      />
    }
    {(props.helperLabel || props.invalid) && <div styleName={'selectHelper'}>
      {props.invalid && !props.disabled && <span className={'icon-error-outline'} styleName={'errorIcon'} />}
      {props.helperLabel}
    </div>}
  </div>
);

SingleSelect.displayName = 'SingleSelect';

SingleSelect.defaultProps = {
  placeholder: 'Select',
  creatable: false,
  disabled: false,
  invalid: false,
  required: false,
  searchable: false,
  clearable: false,
  options: {},
  defaultValue: null,
  helperLabel: '',
  title: '',
  onChange: () => null
};

SingleSelect.propTypes = {
  /**
   * Let's the user clear his selection.
   */
  clearable: PropTypes.bool,
  /**
   * Allows to create new options.
   */
  creatable: PropTypes.bool,
  /**
   * Set's a preselected option.
   */
  defaultValue: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  }),
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
   * Event Handler. Param option: {value: , label:}
   */
  onChange: PropTypes.func,
  /**
   * Supplies the available options to the dropdown.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
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
   * Let's the user type in the inputbox. Ignored if creatable is set true.
   */
  searchable: PropTypes.bool,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
};

export default SingleSelect;
