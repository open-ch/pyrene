import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@vx/shape';

const BulletBar = props => (
  props.direction === 'horizontal' ? (
    <div>
      <svg width={props.parentLength} height={props.barWeightSecondary} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
        <Bar
          x="0"
          y="0"
          height={props.barWeightSecondary}
          width={props.secondaryValue * (props.parentLength / props.maxValue)}
          fill={props.colorScheme[1]}
        />
        <Bar
          x="0"
          y={props.barWeightSecondary / 2 - props.barWeight / 2}
          height={props.barWeight}
          width={props.primaryValue * (props.parentLength / props.maxValue)}
          fill={props.colorScheme[0]}
        />
      </svg>
    </div>
  ) : (
    <div>
      <svg width={props.barWeight} height={props.parentLength} transform={props.mirrored ? 'rotate(180 0 0)' : undefined}>
        <Bar
          x="0"
          y={(props.maxValue - props.secondaryValue) * (props.parentLength / props.maxValue)}
          height={props.secondaryValue * (props.parentLength / props.maxValue)}
          width={props.barWeightSecondary}
          fill={props.colorScheme[1]}
        />
        <Bar
          x={props.barWeightSecondary / 2 - props.barWeight / 2}
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
  barWeightSecondary: 16,
  direction: 'horizontal',
  parentLength: 150,
  mirrored: false,
};

BulletBar.propTypes = {
  barWeight: PropTypes.number,
  barWeightSecondary: PropTypes.number,
  colorScheme: PropTypes.arrayOf(PropTypes.string).isRequired,
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  mirrored: PropTypes.bool,
  parentLength: PropTypes.number,
  primaryValue: PropTypes.number.isRequired,
  secondaryValue: PropTypes.number.isRequired,
};

export default BulletBar;
