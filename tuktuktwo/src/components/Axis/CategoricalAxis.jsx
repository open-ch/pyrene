import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';

const getScale = (parentSize, labels) => (
  Utils.scaleCategorical(parentSize, labels)
);

const CategoricalAxis = (props) => {
  const stroke = '#e1e3e8';
  const tickStroke = '#979ca8';
  return props.orientation === 'left' ? (
    <AxisLeft
      left={AxisUtils.axisLeftCategorical}
      scale={getScale(Utils.chartHeight, props.tickLabels)}
      tickLength={0}
      tickLabelProps={() => ({
        fontSize: 10, fill: tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.25em', dx: -AxisUtils.axisLeftCategorical,
      })}
      stroke={stroke}
      tickStroke={tickStroke}
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
        textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickStroke, dy: '-0.25em',
      })}
      stroke={stroke}
      tickStroke={tickStroke}
      tickFormat={props.tickFormat}
      tickValues={props.showTickLabels ? undefined : []}
      hideTicks
    />
  );
};

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  showTickLabels: true,
  tickFormat: d => d,
};

CategoricalAxis.propTypes = {
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the parentSize, which is used to calculate the bar length.
   */
  parentSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  showTickLabels: PropTypes.bool,
  tickFormat: PropTypes.func,
  tickLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoricalAxis;
