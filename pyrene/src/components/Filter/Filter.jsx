import React from 'react';
import PropTypes from 'prop-types';
import FilterBar from './FilterComponents/FilterBar';
import FilterButton from './FilterComponents/FilterButton';
import './Filter.css';

export default class Filter extends React.PureComponent {

  render() {
    const { disabled, filters, onFilterSubmit } = this.props;

    if (disabled) {
      return (
        <div styleName="filterButtonWrapper">
          <FilterButton label="Filter" disabled />
        </div>
      );
    }

    if (filters && filters.length > 0 && disabled === false) {
      return <FilterBar filters={filters} onFilterSubmit={onFilterSubmit} filterValues={this.props.filterValues} />;
    }

    return null;
  }

}

Filter.displayName = 'Filter';

Filter.defaultProps = {
  onFilterSubmit: () => null,
  disabled: false,
  filters: undefined,
};

Filter.propTypes = {
  /**
   * True if filter should be displayed but in disabled state (filters might be still undefined)
   * */
  disabled: PropTypes.bool,
  /**
   * Sets the available filters.
   * Type: [{ label: string (required), type: oneOf('singleSelect', 'multiSelect', 'text') (required), key: string (required), options: array of values from which user can choose in single/multiSelect }]
   */
  filters: PropTypes.arrayOf(PropTypes.shape({
    /** Enable this if you don't want Pyrene to sort your filter options */
    filterKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      /** text displayed to the user in the filter dropdown */
      label: PropTypes.string.isRequired,
      /** key for manipulation */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })),
    sorted: PropTypes.bool,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })),
  /**
   * Passing the filter values from outside
   * @filterKey: same as filterKey in filters prop, it should be same as the `id` in filterDefinition
   * @value: the users input; for single & multiSelect value contains of both value and label! In case of multiSelect, value can consist of multiple objects {value: , label: } in an array
   * use {} for passing empty filterValues
   * */
  filterValues: PropTypes.shape({
    filterKey: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  }).isRequired,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};

export { createSimpleFilter, createDataFilter } from './utils/createFilter';
