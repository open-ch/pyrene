import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import ScaleUtils from '../../common/ScaleUtils';
import chartConstants from '../../common/chartConstants';

/**
 * CategoricalAxis is used to display a categorical left or bottom axis.
 */
const CategoricalAxis = (props) => {
  const chartHeight = props.height - chartConstants.marginBottom;
  const labels = props.showTickLabels ? props.tickLabels : [];
  return (
    props.orientation === 'left' ? (
      <AxisLeft
        left={props.left}
        scale={ScaleUtils.scaleOrdinal(0, props.height - chartConstants.marginBottom, labels)}
        tickLength={0}
        tickLabelProps={() => ({
          fontSize: 10, fill: props.tickLabelColor, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.325em', dx: -props.left,
        })}
        stroke={props.strokeColor}
        tickStroke={props.tickLabelColor}
        tickFormat={props.tickFormat}
        hideTicks
      />
    ) : (
      <AxisBottom
        top={chartHeight}
        scale={ScaleUtils.scaleOrdinal(props.left, props.width, labels)}
        tickLabelProps={() => ({
          textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: props.tickLabelColor, dy: '-0.25em',
        })}
        stroke={props.strokeColor}
        tickStroke={props.tickLabelColor}
        tickFormat={props.tickFormat}
        hideTicks
      />
    )
  );
};

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  showTickLabels: true,
  tickFormat: (d) => d,
};

CategoricalAxis.propTypes = {
  /**
   * Sets the height of the graph canvas.
   * Type: number (required)
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number.isRequired,
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * If set, the tick labels get rendered.
   */
  showTickLabels: PropTypes.bool,
  /**
   * Sets the color of the axis and the grid lines.
   * Type: string (required)
   */
  strokeColor: PropTypes.string.isRequired,
  /**
   * Set function to format the tick labels.
   */
  tickFormat: PropTypes.func,
  /**
   * Sets the color of the tick labels.
   * Type: string (required)
   */
  tickLabelColor: PropTypes.string.isRequired,
  /**
   * Set the categorical tick labels. Type: [ string ]
   */
  tickLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Sets the width of the graph canvas.
   * Type: number (required)
   */
  width: PropTypes.number.isRequired,
};

export default CategoricalAxis;
