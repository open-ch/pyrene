import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import SelectStyle from './singleSelectCSS';
import '../select.css';


export default class SingleSelect extends React.Component {

  render() {
    return (
      <div styleName={classNames('selectContainer', {disabled: this.props.disabled}, {invalid: this.props.invalid && !this.props.disabled})}>
        {this.props.title && <div styleName={classNames('selectTitle', { required: this.props.required && !this.props.disabled })}>{this.props.title}</div>}

        {this.props.creatable ?
          <CreatableSelect
            className={'singleSelect'}
            styles={SelectStyle}
            placeholder={this.props.placeholder}
            options={this.props.options}
            defaultValue={this.props.defaultValue}
            isClearable={this.props.clearable}
            isDisabled={this.props.disabled}
            isInvalid={this.props.invalid}
            onChange={option => this.props.onChange(option)}

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
            placeholder={this.props.placeholder}
            options={this.props.options}
            defaultValue={this.props.defaultValue}
            isClearable={this.props.clearable}
            isSearchable={this.props.searchable}
            isDisabled={this.props.disabled}
            isInvalid={this.props.invalid}
            onChange={(option) => this.props.onChange(option)}

            maxMenuHeight={264}
            noOptionsMessage={() => 'no matches found'}

            blurInputOnSelect
            escapeClearsValue
            captureMenuScroll
          />
        }
        {(this.props.helperLabel || this.props.invalid) && <div styleName={'selectHelper'}>
          {this.props.invalid && !this.props.disabled && <span className={'icon-error-outline'} styleName={'errorIcon'} />}
          {this.props.helperLabel}
        </div>}
      </div>
    );
  }

}

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
