import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';
import AxisUtils from './AxisUtils';
import './axis.css';

const getScale = (parentSize, maxValue, position, scale) => (
  scale !== undefined ? scale : Utils.scaleLinear(parentSize, maxValue, position === 'left' ? 'vertical' : 'horizontal')
);

const NumericalAxis = props => (
  <div styleName={classNames({ axisLeft: props.orientation === 'left', axisLeftNarrow: props.orientation === 'left', axisBottom: props.orientation === 'bottom' })}>
    <Responsive>
      {(parent) => {
        const parentSize = props.orientation === 'left' ? parent.height : parent.width;
        const scale = getScale(parentSize, props.maxValue, props.orientation, props.scale);
        const stroke = '#e1e3e8';
        const tickStroke = '#979ca8';
        return (
          <svg width={parent.width} height={parent.height} shapeRendering="crispEdges">
            {props.orientation === 'left' ? (
              <AxisLeft
                scale={scale}
                tickLength={0}
                tickLabelProps={() => ({
                  fontSize: 10, fill: tickStroke, fontFamily: 'AvenirNext', textAnchor: 'start',
                })}
                tickComponent={tickProps => AxisUtils.getPaddedTickComponent(tickProps, 36)}
                stroke={stroke}
                tickStroke={tickStroke}
                numTicks={5}
                hideAxisLine={props.hideAxisLine}
                tickFormat={props.tickFormat}
                tickValues={props.showTickLabels ? props.tickValues : []}
                hideTicks
                hideZero
              />
            ) : (
              <AxisBottom
                top={1}
                scale={scale}
                tickLabelProps={() => ({
                  textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickStroke, dy: '-0.25em',
                })}
                stroke={stroke}
                tickStroke={tickStroke}
                numTicks={7}
                hideAxisLine={props.hideAxisLine}
                tickFormat={props.tickFormat}
                tickValues={props.showTickLabels ? props.tickValues : []}
                hideTicks
                hideZero
              />
            )}
          </svg>
        );
      }}

    </Responsive>
  </div>
);

NumericalAxis.displayName = 'Numerical Axis';

NumericalAxis.defaultProps = {
  hideAxisLine: false,
  scale: undefined,
  showTickLabels: true,
  tickFormat: d => d,
  tickValues: undefined,
};

NumericalAxis.propTypes = {
  hideAxisLine: PropTypes.bool,
  maxValue: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(['left', 'bottom']).isRequired,
  scale: PropTypes.func,
  showTickLabels: PropTypes.bool,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default NumericalAxis;
