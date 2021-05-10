import React, { FunctionComponent } from 'react';

import './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';
import Checkbox from '../../Checkbox/Checkbox';
import { InputValue, SingleSelectValue, MultiselectValue, TextFieldValue } from '../types';

export interface FilterOptionsProps {
  handleFilterChange: (value: any, negated: boolean, id: string) => void,
  id: string,
  label: string,
  negatable: boolean,
  negated?: boolean,
  options?: any[],
  sorted?: boolean,
  type: string,
  value?: InputValue | null,
}

const doesInterfaceSupportNegate = (inputType: string) => ['text', 'singleSelect', 'multiSelect'].indexOf(inputType) !== -1;

const getFilterInterface = ({
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
          options={options}
          onChange={(inputValue) => handleFilterChange(inputValue, negated, id)}
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
          onChange={(inputValue) => handleFilterChange(Array.isArray(inputValue) && inputValue.length === 0 ? null : inputValue, negated, id)}
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
          onChange={(inputValue) => handleFilterChange(inputValue === '' ? null : inputValue, false, id)}
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
  value = null,
}: FilterOptionsProps) => (
  <div styleName="filterOption">
    <div styleName="filterOptionWrapper">
      <div styleName="label">
        {label}
      </div>
      <div styleName="interface">
        {getFilterInterface({
          handleFilterChange, id, type, sorted, negated, options, value,
        })}
      </div>
    </div>
    {negatable && (
      <div styleName="negatedCheckbox">
        {doesInterfaceSupportNegate(type) && (
          <Checkbox
            value={negated}
            disabled={false}
            onChange={(inputValue) => handleFilterChange(value, inputValue, id)}
            tooltip="To negate the filter, check the box."
          />
        )}
      </div>
    )}
  </div>
);


FilterOption.displayName = 'FilterOption';

export default FilterOption;
