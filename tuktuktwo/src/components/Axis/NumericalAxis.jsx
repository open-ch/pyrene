import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import Grid from '../Grid/Grid';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';

const getScale = (parentSize, maxValue, position, scale) => (
  scale !== undefined ? scale : Utils.scaleLinear(parentSize, maxValue, position === 'left' ? 'vertical' : 'horizontal')
);

const NumericalAxis = (props) => {
  const stroke = '#e1e3e8';
  const tickStroke = '#979ca8';
  return (
    props.orientation === 'left' ? (
      <Group>
        <AxisLeft
          left={AxisUtils.axisLeftNumerical}
          scale={getScale(Utils.chartHeight, props.maxValue, props.orientation, props.scale)}
          tickLength={0}
          tickLabelProps={() => ({
            fontSize: 10, fill: tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.25em', dx: -AxisUtils.axisLeftNumerical,
          })}
          stroke={stroke}
          tickStroke={tickStroke}
          numTicks={5}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <Grid
            left={AxisUtils.axisLeftNumerical}
            direction="vertical"
            maxValue={props.maxValue}
            parentSize={{ width: props.parentSize.width - AxisUtils.axisLeftNumerical, height: Utils.chartHeight }}
          />
        )}
      </Group>
    ) : (
      <Group
        left={AxisUtils.axisLeftCategorical}
      >
        <AxisBottom
          top={Utils.chartHeight}
          scale={getScale(props.parentSize.width - AxisUtils.axisLeftCategorical, props.maxValue, props.orientation, props.scale)}
          tickLabelProps={() => ({
            textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickStroke, dy: '-0.25em',
          })}
          stroke={stroke}
          tickStroke={tickStroke}
          numTicks={7}
          tickFormat={props.tickFormat}
          tickValues={props.showTickLabels ? undefined : []}
          hideTicks
          hideZero
        />
        {props.showGrid && (
          <Grid
            direction="horizontal"
            maxValue={props.maxValue}
            parentSize={{ width: props.parentSize.width - AxisUtils.axisLeftCategorical, height: Utils.chartHeight }}
          />
        )}
      </Group>
    ));
};

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  scale: undefined,
  showGrid: true,
  showTickLabels: true,
  tickFormat: d => d,
};

NumericalAxis.propTypes = {
  maxValue: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  /**
   * Sets the parentSize, which is used to calculate the bar length.
   */
  parentSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  scale: PropTypes.func,
  showGrid: PropTypes.bool,
  showTickLabels: PropTypes.bool,
  tickFormat: PropTypes.func,
};

export default NumericalAxis;
