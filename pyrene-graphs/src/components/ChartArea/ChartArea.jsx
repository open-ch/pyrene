import React from 'react';
import PropTypes from 'prop-types';
import { chartConstants } from 'tuktuktwo';

/**
 * ChartArea represents the area of graph excluding the axes.
 *
 * The purpose of ChartArea is to make sure mouse event listeners attached to the outermost <g> element operate on the entire area of the chart.
 */
const ChartArea = (props) => (
  <rect
    className="chartArea"
    y={0}
    x={chartConstants.marginLeftNumerical}
    fill="transparent"
    width={Math.max(0, props.width - chartConstants.marginLeftNumerical)}
    height={Math.max(0, props.height - chartConstants.marginBottom)}
  />
);

ChartArea.displayName = 'ChartArea';

ChartArea.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartArea;
