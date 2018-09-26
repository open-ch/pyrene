import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import SelectStyle  from './iconSelectCSS';
import { icons } from '../../../data/foundationsData';
import './select.css';

const Option = (props) => {
  const { getStyles, children, innerProps } = props;
  return (
    <div {...innerProps} style={getStyles('option', props)}>
      <span className={`pyreneIcon-${children}`} style={{verticalAlign: 'text-top', marginRight: 8, fontSize: 16}}/> {children}
    </div>
  );
};

const IconSelect = props => {
  const options = icons.map(icon => ({ value: icon.name, label: icon.name }));
  return (
    <div styleName={classNames('selectContainer')}>
      {props.title && <div styleName={classNames('selectTitle', { required: props.required && !props.disabled })}>{props.title}</div>}
      <Select
        components={{ Option }}
        className={'singleSelect'}
        styles={SelectStyle}
        placeholder={'Change to add icon'}
        value={props.value ? options.filter(o => o.value === props.value).pop() : null}
        options={options}
        onChange={(option) => props.onChange({target: {name: props.name, value: option, type: 'singleSelect' } })}
        onBlur={props.onBlur}
        name={props.name}
        id={props.name}
        inputId={props.name}

        closeMenuOnSelect={false}
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
};

IconSelect.displayName = 'IconSelect';

IconSelect.defaultProps = {
  helperLabel: '',
  value: null,
  title: '',
  onChange: () => null,
};

IconSelect.propTypes = {
  helperLabel: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
};

export default IconSelect;
