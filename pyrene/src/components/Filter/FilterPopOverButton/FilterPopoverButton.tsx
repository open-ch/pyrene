import React, { FunctionComponent, MouseEvent } from 'react';
import Popover from '../../Popover/Popover';
import { SingleSelectProps } from '../../SingleSelect/SingleSelect';
import FilterPopover from '../FilterPopover/FilterPopover';
import FilterButton from '../FilterComponents/FilterButton';
import { IconProps } from '../../Icon/Icon';

type SingleSelectValue = SingleSelectProps<unknown>['value'];
type MultiselectValue = Array<{iconProps?: IconProps, label: string, value?: string | number | boolean}>;
type TextFieldValue = string;

export interface FilterPopoverButtonProps {
  displayPopover?: boolean,
  filterNegatedKeys: string[],
  filters:Array<{
    id?: string,
    label?: string,
    negated?: boolean,
    options?: any[],
    sorted?: boolean,
    type?: string,
  }>,
  filterValues: { [key: string]: MultiselectValue | SingleSelectValue | TextFieldValue },
  handleFilterChange: (value: any, negated: boolean, id: string) => void,
  label: string,
  negatable: boolean,
  noBorder?: boolean,
  onClick?: (e: MouseEvent) => void,
  onFilterApply: (e: MouseEvent) => void,
  onFilterClear: (e: MouseEvent) => void,
}

const FilterPopoverButton: FunctionComponent<FilterPopoverButtonProps> = ({
  handleFilterChange,
  filterValues,
  negatable,
  filters,
  filterNegatedKeys,
  onFilterClear,
  onFilterApply,
  label,
  onClick = () => null,
  displayPopover = false,
  noBorder = false,
}: FilterPopoverButtonProps) => (
  <Popover
    align="start"
    distanceToTarget={8}
    displayPopover={displayPopover}
    preferredPosition={['bottom']}
    renderPopoverContent={() => (
      <FilterPopover
        filters={filters}
        handleFilterChange={handleFilterChange}
        filterValues={filterValues}
        filterNegatedKeys={filterNegatedKeys}
        negatable={negatable}
        onFilterClear={onFilterClear}
        onClose={onClick}
        onFilterApply={onFilterApply}
      />
    )}
  >
    <FilterButton disabled={false} displayPopover={displayPopover} label={label} noBorder={noBorder} onClick={onClick} />
  </Popover>
);

FilterPopoverButton.displayName = 'FilterPopoverButton';

export default FilterPopoverButton;
