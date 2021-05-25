import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Select from 'react-select';
import SelectStyle from './iconSelectCSS';
import { icons } from '../../../data/foundationsData';
import styles from './select.css';

const Option = (props) => {
  const { getStyles, children, innerProps } = props; // eslint-disable-line react/prop-types
  return (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
    <div {...innerProps} style={getStyles('option', props)}>
      <span className={`pyreneIcon-${children}`} style={{ verticalAlign: 'text-top', marginRight: 8, fontSize: 16 }} />
      {' '}
      {children}
    </div>
  );
};

const IconSelect = (props) => {
  const options = icons.map((icon) => ({ value: icon.name, label: icon.name }));
  return (
    <div className={styles.selectContainer}>
      {props.title && <div className={clsx(styles.selectTitle, { [styles.required]: props.required && !props.disabled })}>{props.title}</div>}
      <Select
        components={{ Option }}
        className="singleSelect"
        styles={SelectStyle}
        placeholder="Change to add icon"
        value={props.value ? options.filter((o) => o.value === props.value).pop() : null}
        options={options}
        onChange={(option) => props.onChange(option.value, { target: { name: props.name, value: option.value, type: 'singleSelect' } })}
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

      {props.helperLabel
      && (
        <div className={styles.selectHelper}>
          {props.helperLabel}
        </div>
      )}
    </div>
  );
};

IconSelect.displayName = 'IconSelect';

IconSelect.defaultProps = {
  helperLabel: '',
  value: null,
  title: '',
  onBlur: () => null,
  onChange: () => null,
  required: false,
  disabled: false,
};

IconSelect.propTypes = {
  disabled: PropTypes.bool,
  helperLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default IconSelect;
