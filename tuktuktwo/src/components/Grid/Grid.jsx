import React from 'react';
import PropTypes from 'prop-types';
import { GridColumns, GridRows } from '@vx/grid';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';

const Grid = props => (
  <Responsive>
    {(parent) => {
      const parentSize = props.direction === 'horizontal' ? parent.width : parent.height;
      const color = '#979ca8';
      return (
        <svg width={parent.width} height={parent.height}>
          {props.direction === 'vertical' ? (
            <GridRows
              scale={Utils.scaleLinear(parentSize, props.maxValue, props.direction)}
              stroke={color}
              strokeWidth={0.5}
              width={parent.width}
              height={parent.height}
              numTicks={3}
            />
          ) : (
            <GridColumns
              scale={Utils.scaleLinear(parentSize, props.maxValue, props.direction)}
              stroke={color}
              strokeWidth={0.5}
              width={parent.width}
              height={parent.height}
              numTicks={6}
            />
          )}
        </svg>
      );
    }}
  </Responsive>
);

Grid.displayName = 'Grid';

Grid.defaultProps = {
  maxValue: 0,
};

Grid.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  maxValue: PropTypes.number,
};

export default Grid;
