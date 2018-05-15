import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CreatableSelect from 'react-select/lib/Creatable';
import '../select.css';
import SelectStyle from './creatableSingleSelectCSS';


export default class CreatableSingleSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName={classNames('selectContainer', {disabled: this.props.disabled}, {invalid: this.props.invalid && !this.props.disabled})}>
        {this.props.title && <div styleName={classNames('selectTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</div>}
        <CreatableSelect
          className={'creatableSingleSelect'}
          styles={SelectStyle}
          placeholder={this.props.placeholder}
          options={this.props.options}
          isClearable={this.props.clearable}
          isSearchable={this.props.searchable}
          isDisabled={this.props.disabled}
          isInvalid={this.props.invalid}
          onChange={(option) => this.props.onChange(option)}

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

CreatableSingleSelect.displayName = 'CreatableSingleSelect';

CreatableSingleSelect.defaultProps = {
  placeholder: 'Select',
  disabled: false,
  invalid: false,
  required: false,
  searchable: false,
  clearable: false,
  options: {},
  helperLabel: '',
  title: '',
  onChange: () => null
};

CreatableSingleSelect.propTypes = {
  /**
   * Let's the user clear his selection.
   */
  clearable: PropTypes.bool,
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

