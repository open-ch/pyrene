import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import SelectStyle from './tableSelectCSS';
import './tableSelect.css';


const TableSelect = props => (
  <div styleName={classNames('selectContainer', { disabled: props.disabled })}>
    <Select
      className={'singleSelect'}
      styles={SelectStyle}
      placeholder={props.placeholder}
      options={props.options}
      value={props.value ? props.options.filter(o => o.value === props.value).pop() : null}
      defaultValue={props.options.filter(o => o.value === props.defaultValue).pop()}
      isDisabled={props.disabled}
      onChange={props.onChange}
      onBlur={props.onBlur}

      noOptionsMessage={() => 'no matches found'}

      blurInputOnSelect
      escapeClearsValue
      captureMenuScroll
    />
  </div>
);

TableSelect.displayName = 'Select';

TableSelect.defaultProps = {
  placeholder: '',
  disabled: false,
  options: [],
  defaultValue: null,
  value: null,
  onChange: () => null,
  onBlur: () => null,
};

TableSelect.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    invalid: PropTypes.bool,
  })),
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default TableSelect;
