import React, { FunctionComponent } from 'react';

import './filterOption.css';
import SingleSelect from '../../SingleSelect/SingleSelect';
import TextField from '../../TextField/TextField';
import MultiSelect from '../../MultiSelect/MultiSelect';
import Checkbox from '../../Checkbox/Checkbox';

interface FilterOptionsProps {
  handleFilterChange: (value: any, inputValue: string | boolean, id: string) => void,
  id: string,
  label: string,
  negatable: boolean,
  negated?: boolean,
  options?: any[],
  sorted?: boolean,
  type: string,
  value?: any,
}

const FilterOption: FunctionComponent<FilterOptionsProps> = ({
  handleFilterChange,
  id,
  label,
  negatable,
  type,
  sorted = true,
  negated = false,
  options = [],
  value = null
}: FilterOptionsProps) => {

  const doesInterfaceSupportNegate = (inputType: string) => {
    switch (inputType) {
      case 'text':
      case 'singleSelect':
      case 'multiSelect': return true;
      default: return false;
    }
  };

  const getFilterInterface = () => {

    const isValue = !!value;

    switch (type) {
      case 'singleSelect':
        return (
          <SingleSelect
            name={id}
            options={options}
            onChange={(value) => handleFilterChange(value, negated, id)}
            value={isValue ? value : null}
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
            onChange={(value) => handleFilterChange(value && value.length === 0 ? null : value, negated, id)}
            // Pass empty array instead of null to multiSelect component if filterValues are null
            value={isValue ? value : []}
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
            onChange={(value) => handleFilterChange(value === '' ? null : value, false, id)}
            // Pass empty string instead of null to textField component if filterValues are null
            value={isValue ? value : ''}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div styleName="filterOption">
      <div styleName="filterOptionWrapper">
        <div styleName="label">
          {label}
        </div>
        <div styleName="interface">
          {getFilterInterface()}
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
};


FilterOption.displayName = 'FilterOption';
