import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import SelectStyle from './iconSelectCSS';
import { icons } from '../../../data/foundationsData';
import './select.css';


const IconSelect = props => (
  <div styleName={classNames('selectContainer')}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
    <Select
      className={'singleSelect'}
      styles={SelectStyle}
      placeholder={'Change to add icon'}
      options={icons.map((icon, index) => ({ value: index, label: icon.name }))}

      closeMenuOnSelect={false}
      onChange={option => props.onChange(option)}

      maxMenuHeight={264}
      noOptionsMessage={() => 'no matches found'}

      isClearable
      isSearchable
      blurInputOnSelect
      escapeClearsValue
      captureMenuScroll
    />

    {props.helperLabel &&
    <div styleName={'selectHelper'}>
      {props.helperLabel}
    </div>}
  </div>
);

IconSelect.displayName = 'IconSelect';

IconSelect.defaultProps = {
  options: [],
  helperLabel: '',
  title: '',
  onChange: () => null,
};

IconSelect.propTypes = {
  /**
   * Helper text below the input field, also used to display error messages if prop invalid is set.
   */
  helperLabel: PropTypes.string,
  /**
   * Event Handler. Param option: {value: , label:}
   */
  onChange: PropTypes.func,
  /**
   * Supplies the available options to the dropdown.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  })),
  /**
   * Changes what the title says.
   */
  title: PropTypes.string,
};

export default IconSelect;
