import React from 'react';
import PropTypes from 'prop-types';

/**
 * ChartArea represents the area of SVG part of the chart excluding the axes.
 */
const ChartArea = (props) => (
  <rect
    className="chartArea"
    y={0}
    x={props.left}
    fill="transparent"
    width={Math.max(0, props.width - props.left)}
    height={Math.max(0, props.height)}
  />
);

ChartArea.displayName = 'Chart Area';

ChartArea.defaultProps = {
  left: 0,
};

ChartArea.propTypes = {
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  width: PropTypes.number.isRequired,
};

export default ChartArea;
