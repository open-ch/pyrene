import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Bar as VxBar } from '@vx/shape';
import Responsive from '../Misc/Responsive';
import './bar.css';

const Bar = props => (
  <div styleName={classNames({
    verticalBar: props.direction === 'vertical',
    parentDiv: props.direction === 'vertical',
  })}
  >
    <Responsive>
      {parent => (
        props.direction === 'horizontal' ? (
          <svg width={parent.width} height={props.barWeight}>
            <VxBar
              x="0"
              y="0"
              height={props.barWeight}
              width={props.value * (parent.width / props.maxValue)}
              fill={props.color}
            />
          </svg>
        ) : (
          <svg width={props.barWeight} height={parent.height}>
            <VxBar
              x="0"
              y={(props.maxValue - props.value) * (parent.height / props.maxValue)}
              height={props.value * (parent.height / props.maxValue)}
              width={props.barWeight}
              fill={props.color}
            />
          </svg>
        )
      )}
    </Responsive>
  </div>
);

Bar.displayName = 'Bar';

Bar.defaultProps = {
  barWeight: 6,
  color: 'var(--blue-700)',
  direction: 'horizontal',
};

Bar.propTypes = {
  barWeight: PropTypes.number,
  color: PropTypes.string,
  direction: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bar;
