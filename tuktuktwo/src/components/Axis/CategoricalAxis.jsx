import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';

const getScale = (parentSize, labels) => (
  Utils.scaleCategorical(parentSize, labels)
);

const CategoricalAxis = props => (
  props.orientation === 'left' ? (
    <AxisLeft
      left={AxisUtils.axisLeftCategorical}
      scale={getScale(Utils.chartHeight, props.tickLabels)}
      tickLength={0}
      tickLabelProps={() => ({
        fontSize: 10, fill: AxisUtils.tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.25em', dx: -AxisUtils.axisLeftCategorical,
      })}
      stroke={AxisUtils.stroke}
      tickStroke={AxisUtils.tickStroke}
      tickFormat={props.tickFormat}
      tickValues={props.showTickLabels ? undefined : []}
      hideTicks
    />
  ) : (
    <AxisBottom
      top={Utils.chartHeight}
      left={AxisUtils.axisLeftNumerical}
      scale={getScale(props.parentSize.width - AxisUtils.axisLeftNumerical, props.tickLabels)}
      tickLabelProps={() => ({
        textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: AxisUtils.tickStroke, dy: '-0.25em',
      })}
      stroke={AxisUtils.stroke}
      tickStroke={AxisUtils.tickStroke}
      tickFormat={props.tickFormat}
      tickValues={props.showTickLabels ? undefined : []}
      hideTicks
    />
  )
);

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  showTickLabels: true,
  tickFormat: d => d,
};

CategoricalAxis.propTypes = {
  /**
   * Sets the orientation of the axis.
   */
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the parentSize, which is used to calculate the bar length. Type: { height: number, width: number }
   */
  parentSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  /**
   * If set, the tick labels get rendered.
   */
  showTickLabels: PropTypes.bool,
  /**
   * Set function to format the tick labels.
   */
  tickFormat: PropTypes.func,
  /**
   * Set the categorical tick labels. Type: [ string ]
   */
  tickLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoricalAxis;
