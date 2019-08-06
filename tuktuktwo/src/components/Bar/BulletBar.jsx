import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Bar } from '@vx/shape';
import Responsive from '../Misc/Responsive';
import './bar.css';

const BulletBar = props => (
  <div styleName={classNames({
    verticalBar: props.direction === 'vertical',
    parentDiv: props.direction === 'vertical',
  })}
  >
    <Responsive>
      {parent => (
        props.direction === 'horizontal' ? (
          <div>
            <svg width={parent.width} height={props.barWeight * props.secondaryBarWeightScale}>
              <Bar
                x="0"
                y="0"
                height={props.barWeight * props.secondaryBarWeightScale}
                width={props.secondaryValue * (parent.width / props.maxValue)}
                fill={props.colorScheme.secondary}
              />
              <Bar
                x="0"
                y={(props.barWeight * props.secondaryBarWeightScale) / 4}
                height={props.barWeight}
                width={props.primaryValue * (parent.width / props.maxValue)}
                fill={props.colorScheme.primary}
              />
            </svg>
          </div>
        ) : (
          <div>
            <svg width={props.barWeight} height={parent.height}>
              <Bar
                x="0"
                y={(props.maxValue - props.secondaryValue) * (parent.height / props.maxValue)}
                height={props.secondaryValue * (parent.height / props.maxValue)}
                width={props.barWeight * props.secondaryBarWeightScale}
                fill={props.colorScheme.secondary}
              />
              <Bar
                x={(props.barWeight * props.secondaryBarWeightScale) / 4}
                y={(props.maxValue - props.primaryValue) * (parent.height / props.maxValue)}
                height={props.primaryValue * (parent.height / props.maxValue)}
                width={props.barWeight}
                fill={props.colorScheme.primary}
              />
            </svg>
          </div>
        )
      )}
    </Responsive>
  </div>
);

BulletBar.displayName = 'Bullet Bar';

BulletBar.defaultProps = {
  barWeight: 6,
  secondaryBarWeightScale: 2.5,
  colorScheme: {
    primary: 'var(--blue-700)',
    secondary: 'var(--blue-050)',
  },
  direction: 'horizontal',
};

BulletBar.propTypes = {
  barWeight: PropTypes.number,
  colorScheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  primaryValue: PropTypes.number.isRequired,
  secondaryBarWeightScale: PropTypes.number,
  secondaryValue: PropTypes.number.isRequired,
};

export default BulletBar;
