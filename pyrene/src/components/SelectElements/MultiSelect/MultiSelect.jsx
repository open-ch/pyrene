import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import '../select.css';
import SelectStyle from './multiSelectCSS';


export default class MultiSelect extends React.Component {

  render() {
    return (
      <div styleName={classNames('selectContainer', {disabled: this.props.disabled}, {invalid: this.props.invalid && !this.props.disabled})}>
        {this.props.title && <div styleName={classNames('selectTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</div>}
        <Select
          className={'multiSelect'}
          styles={SelectStyle}
          placeholder={this.props.placeholder}
          options={this.props.options}
          defaultValue={this.props.defaultValue}
          isClearable={this.props.clearable}
          isDisabled={this.props.disabled}
          isInvalid={this.props.invalid}
          onChange={(option) => this.props.onChange(option)}

          isMulti
          isSearchable
          blurInputOnSelect
          escapeClearsValue
          captureMenuScroll
        />
        {(this.props.helperLabel || this.props.invalid) && <div styleName={'selectHelper'}>
          {this.props.invalid && !this.props.disabled && <span className={'icon-error-outline'} styleName={'errorIcon'} />}
          {this.props.helperLabel}
        </div>}
      </div>
    );
  }

}

MultiSelect.displayName = 'MultiSelect';

MultiSelect.defaultProps = {
  placeholder: 'Select',
  disabled: false,
  invalid: false,
  required: false,
  clearable: false,
  options: {},
  defaultValue: {},
  helperLabel: '',
  title: '',
  onChange: () => null
};

MultiSelect.propTypes = {
  /**
   * Let's the user clear his selection.
   */
  clearable: PropTypes.bool,
  /**
   * Set's one or multiple preselected options.
   */
  defaultValue: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  })),
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
   * Let's the user type in the inputbox.
   */
  searchable: PropTypes.bool,
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
};

