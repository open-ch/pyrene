import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { getPaddedTickLabelLeft, getTickLabelLeftProps, getTickLabelBottomProps } from './AxisUtil';

/**
 * CategoricalAxis is used to display a categorical left or bottom axis.
 */
const CategoricalAxis = (props) => (
  props.orientation === 'left' ? (
    <AxisLeft
      left={props.left}
      scale={props.scale}
      tickLength={0}
      tickLabelProps={getTickLabelLeftProps(props.left, props.tickLabelColor)}
      tickComponent={getPaddedTickLabelLeft(props.left)}
      stroke={props.strokeColor}
      tickStroke={props.tickLabelColor}
      tickFormat={props.tickFormat}
      hideTicks
    />
  ) : (
    <AxisBottom
      top={props.top}
      scale={props.scale}
      tickLabelProps={getTickLabelBottomProps(props.tickLabelColor)}
      stroke={props.strokeColor}
      tickStroke={props.tickLabelColor}
      tickFormat={props.tickFormat}
      hideTicks
    />
  )
);

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  left: 0,
  tickFormat: (d) => d,
  top: 0,
};

CategoricalAxis.propTypes = {
  /**
   * Sets the horizontal offset for this component.
   */
  left: PropTypes.number,
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the scale function for the label axis.
   */
  scale: PropTypes.func.isRequired,
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
   * Sets the vertical offset for this component.
   */
  top: PropTypes.number,
};

export default CategoricalAxis;
