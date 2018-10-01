import React from 'react';
import PropTypes from 'prop-types';

import './filterPopover.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import FilterOption from '../FilterOption/FilterOption';
import Collapsible from '../../Collapsible/Collapsible';

const FilterPopover = props => (
  <div styleName={'filterPopover'}>
    <div styleName={'title'}>Select Filter</div>
    <div styleName={'filterOptions'}>
      {props.filters.length <= 6 ?
        props.filters.map(filter =>
          <FilterOption {...filter} handleFilterChange={props.handleFilterChange} filterValues={props.filterValues} key={filter.filterKey} />
        )
        :
        <React.Fragment>
          {props.filters.slice(0, 6).map(filter =>
            <FilterOption {...filter} handleFilterChange={props.handleFilterChange} filterValues={props.filterValues} key={filter.filterKey} />
          )}
          <Collapsible
            align={'end'}
            labelCollapsed={'More Filter Options'}
            labelExpanded={'Less Filter Options'}
            renderCallback={() => props.filters.slice(6).map(filter => (
              <FilterOption {...filter} handleFilterChange={props.handleFilterChange} filterValues={props.filterValues} key={filter.filterKey} />
            ))}
          />
        </React.Fragment>
      }
    </div>
    <ButtonBar
      rightButtonSectionElements={[
        <Button label={'Clear'} type={'ghost'} onClick={props.onFilterClear} />,
        <Button label={'Cancel'} type={'secondary'} onClick={props.onClose} />,
        <Button label={'Apply'} type={'primary'} onClick={props.onFilterApply} />,
      ]}
    />
  </div>
);


FilterPopover.displayName = 'FilterPopover';

FilterPopover.defaultProps = {};

FilterPopover.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    key: PropTypes.string,
    options: PropTypes.array,
  })).isRequired,
  filterValues: PropTypes.object,
  handleFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
};

export default FilterPopover;