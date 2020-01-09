import React from 'react';
import PropTypes from 'prop-types';
import './chartUnit.css';

/**
 * Chart unit is used to display unit of the chart.
 */
const ChartUnit = (props) => (
  <div styleName="container">
    {props.unit}
  </div>
);

ChartUnit.displayName = 'Chart Unit';

ChartUnit.propTypes = {
  unit: PropTypes.string.isRequired,
};

export default ChartUnit;
