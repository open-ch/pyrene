import React, { FunctionComponent, MouseEvent } from 'react';

import styles from './filterPopover.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import FilterOption from '../FilterOption/FilterOption';
import Collapsible from '../../Collapsible/Collapsible';
import { Filter, Filters, HandleFilterChange } from '../types';

export interface FilterPopoverProps {
  filterNegatedKeys: Array<Filter['id']>,
  filters: Array<Filter>,
  filterValues: Filters,
  handleFilterChange: HandleFilterChange,
  negatable: boolean,
  onClose?: (e: MouseEvent) => void,
  onFilterApply: (e: MouseEvent) => void,
  onFilterClear: (e: MouseEvent) => void,
}

const FilterPopover: FunctionComponent<FilterPopoverProps> = ({
  handleFilterChange,
  filterValues,
  negatable,
  filters,
  filterNegatedKeys,
  onFilterClear,
  onFilterApply,
  onClose,
}: FilterPopoverProps) => (
  <div className={styles.filterPopover}>
    <div className={styles.title}>Select Filter</div>
    {negatable && <div className={styles.negateTitle}>Negate</div>}
    <div className={styles.filterOptions}>
      {filters.length <= 6
        ? filters.map((filter) => (
          <FilterOption {...filter}
            value={filterValues?.[filter.id]}
            negated={negatable ? filterNegatedKeys.includes(filter.id) : false}
            handleFilterChange={handleFilterChange}
            negatable={negatable}
            key={filter.id}
          />
        ))
        : (
          <>
            {filters.slice(0, 6).map((filter) => (
              <FilterOption {...filter}
                value={filterValues?.[filter.id]}
                negated={filterNegatedKeys && negatable ? filterNegatedKeys.includes(filter.id) : false}
                handleFilterChange={handleFilterChange}
                negatable={negatable}
                key={filter.id}
              />
            ))}
            <div className={styles.collapsibleContainer}>
              <Collapsible
                align="end"
                labelCollapsed="More Filter Options"
                labelExpanded="Fewer Filter Options"
                renderCallback={() => filters.slice(6).map((filter) => (
                  <FilterOption {...filter}
                    value={filterValues?.[filter.id]}
                    negated={filterNegatedKeys && negatable ? filterNegatedKeys.includes(filter.id) : false}
                    handleFilterChange={handleFilterChange}
                    negatable={negatable}
                    key={filter.id}
                  />
                ))}
              />
            </div>
          </>
        )}
    </div>
    <div className={styles.buttonBarContainer}>
      <ButtonBar
        rightButtonSectionElements={[
          <Button disabled={Object.keys(filterValues).length === 0} label="Clear" type="ghost" onClick={onFilterClear} />,
          <Button label="Cancel" type="secondary" onClick={onClose} />,
          <Button disabled={Object.keys(filterValues).length === 0} label="Apply" type="primary" onClick={onFilterApply} />,
        ]}
      />
    </div>
  </div>
);

FilterPopover.displayName = 'FilterPopover';

export default FilterPopover;
