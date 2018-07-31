import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import SelectStyle from './singleSelectCSS';
import '../select.css';
import Loader from '../../Loader/Loader';

const LoadingIndicator = () => {
  return <Loader />;
};

/**
 * Selection elements are used primarily on ....
 */
const SingleSelect = props => (
  <div styleName={classNames('selectContainer', { disabled: props.disabled })}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}

    {props.creatable ?
      <CreatableSelect
        className={'singleSelect'}
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
      :
      <Select
        className={'singleSelect'}
        styles={SelectStyle}
        components={{ LoadingIndicator }}
        placeholder={props.placeholder}
        options={props.options}
        value={props.value ? props.options.filter(o => o.value === props.value).pop() : null}
        defaultValue={props.options.filter(o => o.value === props.defaultValue).pop()}
        isClearable={props.clearable}
        isSearchable={props.searchable}
        isDisabled={props.disabled}
        isInvalid={props.invalid}
        isLoading={props.loading}
        onChange={option => props.onChange({ target: { name: props.name, value: option, type: 'singleSelect' } })}
        onBlur={props.onBlur}
        name={props.name}
        id={props.name}
        inputId={props.name}

        maxMenuHeight={264}
        noOptionsMessage={() => 'no matches found'}

        blurInputOnSelect
        escapeClearsValue
        captureMenuScroll
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

SingleSelect.displayName = 'Select';

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
  defaultValue: PropTypes.string,
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
   * When true, displays a loading indicator
   */
  loading: PropTypes.bool,
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
   * Let's the user type in the inputbox. Ignored if creatable is set true.
   */
  searchable: PropTypes.bool,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
  /**
   * Changes the currently chosen option. Only set when needed, do not keep prop set at all times as this prevents user interaction.
   */
  value: PropTypes.string,
};

export default SingleSelect;
