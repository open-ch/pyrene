import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AxisLeft, AxisBottom } from '@vx/axis';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';
import './axis.css';

const getScale = (parentSize, labels) => (
  Utils.scaleCategorical(parentSize, labels)
);

const CategoricalAxis = props => (
  <div styleName={classNames({ axisLeft: props.position === 'left', axisLeftWide: props.position === 'left', axisBottom: props.position === 'bottom' })}>
    <Responsive>
      {(parent) => {
        const parentSize = props.position === 'left' ? parent.height : parent.width;
        const scale = getScale(parentSize, props.labels);
        // const color = '#979ca8';
        const color = 'red';
        return (
          <svg width={parent.width} height={parent.height}>
            {props.position === 'left' ? (
              <AxisLeft
                scale={scale}
                left={98}
                tickLabelProps={() => ({
                  textAnchor: 'start', fontSize: 10, fill: color, dx: '-90px', dy: '0.25em',
                })}
                stroke={color}
                strokeWidth={2}
                tickStroke={color}
                numTicks={props.labels.length}
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
                numTicks={props.labels.length}
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

CategoricalAxis.displayName = 'Categorical Axis';

CategoricalAxis.defaultProps = {
  hideAxisLine: false,
  tickFormat: d => d,
  loading: false,
  tickValues: undefined,
};

CategoricalAxis.propTypes = {
  hideAxisLine: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'bottom']).isRequired,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOf(['string', 'number'])),
};

export default CategoricalAxis;
