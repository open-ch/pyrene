import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BarStackHorizontal, BarStack } from '@vx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import Responsive from '../Misc/Responsive';
import './bar.css';

const RelativeBar = props => (
  <div styleName={classNames({
    verticalBar: props.direction === 'vertical',
    parentDiv: props.direction === 'vertical',
  })}
  >
    <Responsive>
      {(parent) => {
        const keys = [
          'value',
          'rest',
        ];
        const data = [{
          value: props.value,
          rest: props.maxValue - props.value,
          y: 0,
        },
        ];
        const color = scaleOrdinal({
          domain: keys,
          range: [props.colorScheme.primary, props.colorScheme.secondary],
        });
        const valueScale = scaleLinear({
          domain: props.direction === 'horizontal' ? [0, props.maxValue] : [props.maxValue, 0],
          rangeRound: [0, props.direction === 'horizontal' ? parent.width : parent.height],
        });
        const weightScale = scaleBand({
        });
        return (
          props.direction === 'horizontal' ? (
            <svg width={parent.width} height={props.barWeight}>
              <BarStackHorizontal
                y={d => d}
                height={props.barWeight}
                data={data}
                keys={keys}
                xScale={valueScale}
                yScale={weightScale}
                color={color}
              />
            </svg>
          ) : (
            <svg width={props.barWeight} height={parent.height}>
              <BarStack
                x={d => d}
                width={props.barWeight}
                data={data}
                keys={keys}
                xScale={weightScale}
                yScale={valueScale}
                color={color}
              />
            </svg>
          )
        );
      }}
    </Responsive>
  </div>
);

RelativeBar.displayName = 'Relative Bar';

RelativeBar.defaultProps = {
  barWeight: 18,
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
  direction: 'horizontal',
};

RelativeBar.propTypes = {
  barWeight: PropTypes.number,
  colorScheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default RelativeBar;
