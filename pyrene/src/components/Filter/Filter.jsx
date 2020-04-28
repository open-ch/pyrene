import React from 'react';
import PropTypes from 'prop-types';
import FilterBar from './FilterComponents/FilterBar';
import FilterButton from './FilterComponents/FilterButton';
import './Filter.css';

export default class Filter extends React.PureComponent {

  render() {
    const {
      disabled, filters, isNegationEnabled, onFilterSubmit,
    } = this.props;

    if (disabled) {
      return (
        <div styleName="filterButtonWrapper">
          <FilterButton label="Filter" disabled />
        </div>
      );
    }

    if (filters && filters.length > 0 && disabled === false) {
      return <FilterBar filters={filters} onFilterSubmit={onFilterSubmit} filterValues={this.props.filterValues} isNegationEnabled={isNegationEnabled} />;
    }

    return null;
  }

}

Filter.displayName = 'Filter';

Filter.defaultProps = {
  isNegationEnabled: false,
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
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    negated: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
      /** text displayed to the user in the filter dropdown */
      label: PropTypes.string.isRequired,
      /** key for manipulation */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    })),
    /** Disable this if you don't want Pyrene to sort your filter options (defaults to true) */
    sorted: PropTypes.bool,
    type: PropTypes.oneOf(['singleSelect', 'multiSelect', 'text']).isRequired,
  })),
  /**
   * Filter values object, with:
   * keys: same as the `id` in filterDefinition
   * values: the users input; for single & multiSelect value contains of both value and label! In case of multiSelect, value can consist of multiple objects {value: , label: } in an array
   * use {} for passing empty filterValues
   * */
  filterValues: PropTypes.shape().isRequired,
  /**
   * True to enable the visual components to handle negated filters. Defaults to false
   */
  isNegationEnabled: PropTypes.bool,
  /**
   * Called when the user clicks on the apply button. Contains all the filter information as its argument.
   */
  onFilterSubmit: PropTypes.func,
};

export { createSimpleFilter, createDataFilter } from './utils/createFilter';
