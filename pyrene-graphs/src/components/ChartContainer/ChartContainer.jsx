import React from 'react';
import PropTypes from 'prop-types';
import styles from './chartContainer.css';

/**
 * Chart containers are used to standardize chart layouts.
 * They take care of the correct positioning of headers, charts and chart overlays.
 */
const ChartContainer = (props) => (
  <div className={styles.chartContainer}>
    {props.header}
    <div className={styles.unitContainer}>
      {props.chartUnit}
    </div>
    {props.chartOverlay && (
      <div className={styles.chartOverlay}>
        {props.chartOverlay}
      </div>
    )}
    <div className={styles.chart}>
      {props.chart}
    </div>
  </div>
);

ChartContainer.displayName = 'Chart Container';

ChartContainer.defaultProps = {
  chartOverlay: null,
  chartUnit: '',
};

ChartContainer.propTypes = {
  /**
   * Chart component
   */
  chart: PropTypes.node.isRequired,
  /**
   * ChartOverlay component
   */
  chartOverlay: PropTypes.node,
  /**
   * Sets the unit of the chart, if there is any
   */
  chartUnit: PropTypes.string,
  /**
   * Header component
   */
  header: PropTypes.node.isRequired,
};

export default ChartContainer;
