import React, { FunctionComponent, MouseEvent } from 'react';
import Popover from '../../Popover/Popover';
import FilterPopover from '../FilterPopover/FilterPopover';
import FilterButton from '../FilterComponents/FilterButton';
import { Filter, Filters, HandleFilterChange } from '../types';

export interface FilterPopoverButtonProps {
  displayPopover?: boolean,
  filterNegatedKeys: Array<Filter['id']>,
  filters: Array<Filter>,
  filterValues: Filters,
  handleFilterChange: HandleFilterChange,
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
  onClick,
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
