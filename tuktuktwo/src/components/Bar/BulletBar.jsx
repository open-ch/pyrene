import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@vx/shape';

const BulletBar = props => (
  props.direction === 'horizontal' ? (
    <div>
      <svg width={props.parentLength} height={props.barWeight * props.secondaryBarWeightScale}>
        <Bar
          x="0"
          y="0"
          height={props.barWeight * props.secondaryBarWeightScale}
          width={props.secondaryValue * (props.parentLength / props.maxValue)}
          fill={props.colorScheme[1]}
        />
        <Bar
          x="0"
          y={(props.barWeight * props.secondaryBarWeightScale) / 4}
          height={props.barWeight}
          width={props.primaryValue * (props.parentLength / props.maxValue)}
          fill={props.colorScheme[0]}
        />
      </svg>
    </div>
  ) : (
    <div>
      <svg width={props.barWeight} height={props.parentLength}>
        <Bar
          x="0"
          y={(props.maxValue - props.secondaryValue) * (props.parentLength / props.maxValue)}
          height={props.secondaryValue * (props.parentLength / props.maxValue)}
          width={props.barWeight * props.secondaryBarWeightScale}
          fill={props.colorScheme[1]}
        />
        <Bar
          x={(props.barWeight * props.secondaryBarWeightScale) / 4}
          y={(props.maxValue - props.primaryValue) * (props.parentLength / props.maxValue)}
          height={props.primaryValue * (props.parentLength / props.maxValue)}
          width={props.barWeight}
          fill={props.colorScheme[0]}
        />
      </svg>
    </div>
  )
);

BulletBar.displayName = 'Bullet Bar';

BulletBar.defaultProps = {
  barWeight: 6,
  secondaryBarWeightScale: 2.5,
  colorScheme: [
    'var(--blue-700)',
    'var(--blue-050)',
  ],
  direction: 'horizontal',
  parentLength: 150,
};

BulletBar.propTypes = {
  barWeight: PropTypes.number,
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  parentLength: PropTypes.number,
  primaryValue: PropTypes.number.isRequired,
  secondaryBarWeightScale: PropTypes.number,
  secondaryValue: PropTypes.number.isRequired,
};

export default BulletBar;
