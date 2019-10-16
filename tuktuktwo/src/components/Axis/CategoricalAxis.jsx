import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';
import './axis.css';

const getScale = (parentSize, labels) => (
  Utils.scaleCategorical(parentSize, labels)
);

const CategoricalAxis = (props) => {
  const stroke = '#e1e3e8';
  const tickStroke = '#979ca8';
  return props.orientation === 'left' ? (
    <AxisLeft
      scale={getScale(props.parentSize.height, props.tickLabels)}
      tickLength={0}
      tickLabelProps={() => ({
        fontSize: 10, fill: tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start',
      })}
      tickComponent={tickProps => AxisUtils.getPaddedTickComponent(tickProps, 102)}
      stroke={stroke}
      tickStroke={tickStroke}
      numTicks={props.tickLabels.length}
      hideAxisLine={props.hideAxisLine}
      tickFormat={props.tickFormat}
      tickValues={props.showTickLabels ? props.tickValues : []}
      hideTicks
      hideZero
    />
  )
    : (
      <AxisBottom
        scale={getScale(props.parentSize.width, props.tickLabels)}
        tickLabelProps={() => ({
          textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickStroke, dy: '-0.25em',
        })}
        stroke={stroke}
        tickStroke={tickStroke}
        numTicks={props.tickLabels.length}
        hideAxisLine={props.hideAxisLine}
        tickFormat={props.tickFormat}
        tickValues={props.showTickLabels ? props.tickValues : []}
        hideTicks
        hideZero
      />
    );
};

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  hideAxisLine: false,
  showTickLabels: true,
  tickFormat: d => d,
  tickValues: undefined,
};

CategoricalAxis.propTypes = {
  hideAxisLine: PropTypes.bool,
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
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default CategoricalAxis;
