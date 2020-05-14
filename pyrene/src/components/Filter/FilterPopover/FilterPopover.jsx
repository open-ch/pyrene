import React from 'react';
import PropTypes from 'prop-types';

import './filterPopover.css';
import ButtonBar from '../../ButtonBar/ButtonBar';
import Button from '../../Button/Button';
import FilterOption from '../FilterOption/FilterOption';
import Collapsible from '../../Collapsible/Collapsible';

/* eslint-disable react/jsx-props-no-spreading */

const FilterPopover = (props) => (
  <div styleName="filterPopover">
    <div styleName="title">Select Filter</div>
    {props.negatable && <div styleName="negateTitle">Negate</div>}
    <div styleName="filterOptions">
      {props.filters.length <= 6
        ? props.filters.map((filter) => (
          <FilterOption {...filter}
            value={props.filterValues ? props.filterValues[filter.id] : null}
            negated={props.negatable ? props.filterNegatedKeys.includes(filter.id) : false}
            handleFilterChange={props.handleFilterChange}
            negatable={props.negatable}
            key={filter.id}
          />
        ))
        : (
          <>
            {props.filters.slice(0, 6).map((filter) => (
              <FilterOption {...filter}
                value={props.filterValues ? props.filterValues[filter.id] : null}
                negated={props.filterNegatedKeys && props.negatable ? props.filterNegatedKeys.includes(filter.id) : false}
                handleFilterChange={props.handleFilterChange}
                negatable={props.negatable}
                key={filter.id}
              />
            ))}
            <Collapsible
              align="end"
              labelCollapsed="More Filter Options"
              labelExpanded="Fewer Filter Options"
              renderCallback={() => props.filters.slice(6).map((filter) => (
                <FilterOption {...filter}
                  value={props.filterValues ? props.filterValues[filter.id] : null}
                  negated={props.filterNegatedKeys && props.negatable ? props.filterNegatedKeys.includes(filter.id) : false}
                  handleFilterChange={props.handleFilterChange}
                  negatable={props.negatable}
                  key={filter.id}
                />
              ))}
            />
          </>
        )}
    </div>
    <div styleName="buttonBarContainer">
      <ButtonBar
        rightButtonSectionElements={[
          <Button label="Clear" type="ghost" onClick={props.onFilterClear} />,
          <Button label="Cancel" type="secondary" onClick={props.onClose} />,
          <Button label="Apply" type="primary" onClick={props.onFilterApply} />,
        ]}
      />
    </div>
  </div>
);


FilterPopover.displayName = 'FilterPopover';

FilterPopover.defaultProps = {
};

FilterPopover.propTypes = {
  filterNegatedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    negated: PropTypes.bool,
    options: PropTypes.array,
    sorted: PropTypes.bool,
    type: PropTypes.string,
  })).isRequired,
  filterValues: PropTypes.shape().isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  negatable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterApply: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func.isRequired,
};

export default FilterPopover;
