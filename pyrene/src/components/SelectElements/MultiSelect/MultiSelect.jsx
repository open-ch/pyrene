import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import '../select.css';
import MultiSelectStyle from './multiSelectCSS';
import Loader from '../../Loader/Loader';


const LoadingIndicator = () => {
  return <Loader />;
};

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
        components={{ LoadingIndicator }}
        placeholder={props.placeholder}
        options={props.options}
        value={props.value ? props.value : null}
        defaultValue={props.options.filter(option => props.defaultValues.includes(option.value))}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        isLoading={props.loading}
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
        components={{ LoadingIndicator }}
        placeholder={props.placeholder}
        options={props.options}
        value={props.value ? props.value : null}
        defaultValue={props.options.filter(option => props.defaultValues.includes(option.value))}
        isClearable={props.clearable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        isLoading={props.loading}
        onChange={(option) => props.onChange({target: {name: props.name, value: option, type: 'multiSelect'}})}
        onBlur={props.onBlur}
        name={props.name}
        id={props.name}
        inputId={props.name}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}

        closeMenuOnSelect={!props.keepMenuOnSelect}

        isMulti
        isSearchable
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
  loading: false,
  required: false,
  clearable: false,
  keepMenuOnSelect: false,
  value: null,
  onChange: () => null,
  onBlur: () => null,
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
  defaultValues: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
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
   * Data input array. Type: [{ value: string (required), label: string (required), invalid: bool }]
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    invalid: PropTypes.bool,
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
   * Let's you set a fixed height to the multiselect. Default behaviour is one row that expands up to 3, then starts scrolling.
   */
  rows: PropTypes.number,
  /**
   * Sets the title above the input field.
   */
  title: PropTypes.string,
  /**
   * Sets the value of the input field. Same type as supplied options.
   */
  value: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })),
};

export default MultiSelect;
