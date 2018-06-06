import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { components }from 'react-select';
import { Div, Span } from 'react-select/lib/primitives';
import SelectStyle  from './iconSelectCSS';
import { icons } from '../../../data/foundationsData';
import './select.css';

const Option = (props) => {
  const { getStyles, children, innerProps } = props;
  return (
    <Div {...innerProps} style={getStyles('option', props)}>
      <span className={`icon-${children}`} style={{verticalAlign: 'middle', marginRight: 4}}/> {children}
    </Div>
  );
};

const IconSelect = props => (
  <div styleName={classNames('selectContainer')}>
    {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
    <Select
      components={{ Option }}
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
   * Changes what the title says.
   */
  title: PropTypes.string,
};

export default IconSelect;
