/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import SelectStyle from './tableSelectCSS';
import styles from './tableSelect.css';

interface TableSelectProps {
  defaultValue?: string,
  disabled?: boolean,
  onBlur?: () => void,
  onChange?: (event: any) => void,
  options?: Array<{
    invalid?: boolean,
    label?: string,
    value?: string,
  }>,
  placeholder?: string,
  value?: string,
}

const TableSelect: FunctionComponent<TableSelectProps> = ({
  placeholder = '',
  disabled = false,
  options = [],
  defaultValue,
  value,
  onChange,
  onBlur,
}) => (
  <div className={clsx(styles.selectContainer, { [styles.disabled]: disabled })}>
    <Select
      className="singleSelect"
      styles={SelectStyle as any}
      placeholder={placeholder}
      options={options}
      value={value ? options.filter((o) => o.value === value).pop() : null}
      defaultValue={options.filter((o) => o.value === defaultValue).pop()}
      isDisabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      noOptionsMessage={() => 'no matches found'}
      isSearchable={false}
      isClearable={false}
      blurInputOnSelect
      escapeClearsValue
      captureMenuScroll
    />
  </div>
);

export default TableSelect;
