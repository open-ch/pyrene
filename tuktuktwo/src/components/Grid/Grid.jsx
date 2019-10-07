import React from 'react';
import PropTypes from 'prop-types';
import { GridColumns, GridRows } from '@vx/grid';
import Responsive from '../Misc/Responsive';
import Utils from '../../Utils';
import './grid.css';

const Grid = props => (
  <div styleName="grid">
    <Responsive>
      {(parent) => {
        const parentSize = props.direction === 'horizontal' ? parent.width : parent.height;
        const color = '#e1e3e8';
        return (
          <svg width={parent.width} height={parent.height} shapeRendering="crispEdges">
            {props.direction === 'vertical' ? (
              <GridRows
                scale={Utils.scaleLinear(parentSize, props.maxValue, props.direction)}
                stroke={color}
                width={parent.width}
                height={parent.height}
                numTicks={5}
              />
            ) : (
              <GridColumns
                left={1}
                scale={Utils.scaleLinear(parentSize, props.maxValue, props.direction)}
                stroke={color}
                width={parent.width}
                height={parent.height}
                numTicks={7}
              />
            )}
          </svg>
        );
      }}
    </Responsive>
  </div>
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
