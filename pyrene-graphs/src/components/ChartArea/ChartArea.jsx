import React from 'react';
import PropTypes from 'prop-types';
import { chartConstants } from 'tuktuktwo';

/**
 * ChartArea represents the area of SVG part of the chart excluding the axes.
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

ChartArea.displayName = 'Chart Area';

ChartArea.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartArea;
