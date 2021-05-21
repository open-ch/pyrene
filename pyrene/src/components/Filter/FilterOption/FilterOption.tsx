import React, { FunctionComponent } from 'react';

import styles from './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';
import Checkbox from '../../Checkbox/Checkbox';
import {
  InputValue,
  SingleSelectValue,
  MultiselectValue,
  TextFieldValue,
  SingleSelectOption,
  MultiSelectOption,
  HandleFilterChange,
} from '../types';

export interface FilterOptionsProps {
  handleFilterChange: HandleFilterChange,
  id: string,
  label: string,
  negatable: boolean,
  negated?: boolean,
  options?: Array<SingleSelectOption | MultiSelectOption>,
  sorted?: boolean,
  type: string,
  value?: InputValue,
}

const doesInterfaceSupportNegate = (inputType: string) => ['text', 'singleSelect', 'multiSelect'].indexOf(inputType) !== -1;

const renderOption = ({
  handleFilterChange,
  id,
  type,
  sorted,
  negated,
  options,
  value,
}: Omit<FilterOptionsProps, 'label' | 'negatable' | 'negated'> & { negated: boolean }) => {

  const isValue = !!value;

  switch (type) {
    case 'singleSelect':
      return (
        <SingleSelect
          name={id}
          options={options as SingleSelectOption}
          onChange={(option) => handleFilterChange(option, negated, id)}
          value={(isValue ? value : null) as SingleSelectValue}
          sorted={sorted}
          clearable
          searchable
        />
      );
    case 'multiSelect':
      return (
        <MultiSelect
          name={id}
          options={options}
          // If multiSelect is empty (empty array) return null to filter instead of []
          onChange={(option) => handleFilterChange(Array.isArray(option) && option.length === 0 ? null : option, negated, id)}
          // Pass empty array instead of null to multiSelect component if filterValues are null
          value={(isValue ? value : []) as MultiselectValue}
          sorted={sorted}
          selectedOptionsInDropdown
          keepMenuOnSelect
          clearable
        />
      );
    case 'text':
      return (
        <TextField
          name={id}
          // If textField is empty (empty string) return null instead of ''
          onChange={(option) => handleFilterChange(option === '' ? null : option, false, id)}
          // Pass empty string instead of null to textField component if filterValues are null
          value={(isValue ? value : '') as TextFieldValue}
        />
      );
    default:
      return null;
  }
};

const FilterOption: FunctionComponent<FilterOptionsProps> = ({
  handleFilterChange,
  id,
  label,
  negatable,
  type,
  sorted = true,
  negated = false,
  options = [],
  value = undefined,
}: FilterOptionsProps) => (
  <div className={styles.filterOption}>
    <div className={styles.filterOptionWrapper}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.interface}>
        {renderOption({
          handleFilterChange, id, type, sorted, negated, options, value,
        })}
      </div>
    </div>
    {negatable && (
      <div className={styles.negatedCheckbox}>
        {doesInterfaceSupportNegate(type) && (
          <Checkbox
            value={negated}
            disabled={false}
            onChange={(option) => handleFilterChange(value, option, id)}
            tooltip="To negate the filter, check the box."
          />
        )}
      </div>
    )}
  </div>
);


FilterOption.displayName = 'FilterOption';

export default FilterOption;
