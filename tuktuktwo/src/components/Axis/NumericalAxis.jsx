import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';
import './axis.css';

const getScale = (parentSize, maxValue, position, scale) => (
  scale !== undefined ? scale : Utils.scaleLinear(parentSize, maxValue, position === 'left' ? 'vertical' : 'horizontal')
);

const NumericalAxis = props => (
  <div styleName={classNames({ axisLeft: props.position === 'left', axisLeftNarrow: props.position === 'left', axisBottom: props.position === 'bottom' })}>
    <Responsive>
      {(parent) => {
        const parentSize = props.position === 'left' ? parent.height : parent.width;
        const scale = getScale(parentSize, props.maxValue, props.position, props.scale);
        // const color = '#979ca8';
        const color = 'red';
        return (
          <svg width={parent.width} height={parent.height}>
            {props.position === 'left' ? (
              <AxisLeft
                scale={scale}
                left={34}
                tickLabelProps={() => ({
                  textAnchor: 'start', fontSize: 10, fill: color, dx: '-26px', dy: '0.25em',
                })}
                stroke={color}
                strokeWidth={2}
                tickStroke={color}
                numTicks={3}
                hideAxisLine={props.hideAxisLine}
                tickFormat={props.tickFormat}
                tickValues={props.loading ? [] : props.tickValues}
                hideTicks
                hideZero
              />
            ) : (
              <AxisBottom
                scale={scale}
                tickLabelProps={() => ({
                  textAnchor: 'middle', fontSize: 10, fill: color, dy: '-0.25em',
                })}
                stroke={color}
                strokeWidth={2}
                tickStroke={color}
                numTicks={6}
                hideAxisLine={props.hideAxisLine}
                tickFormat={props.tickFormat}
                tickValues={props.loading ? [] : props.tickValues}
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
  loading: false,
  scale: undefined,
  tickFormat: d => d,
  tickValues: undefined,
};

NumericalAxis.propTypes = {
  hideAxisLine: PropTypes.bool,
  loading: PropTypes.bool,
  maxValue: PropTypes.number.isRequired,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
  scale: PropTypes.func,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default NumericalAxis;
