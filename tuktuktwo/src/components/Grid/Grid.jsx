import React from 'react';
import PropTypes from 'prop-types';
import { GridColumns, GridRows } from '@vx/grid';
import Utils from '../../Utils';

const Grid = (props) => {
  const color = '#e1e3e8';
  return props.direction === 'horizontal' ? (
    <GridColumns
      left={props.left}
      scale={Utils.scaleLinear(props.parentSize.width, props.maxValue, props.direction)}
      stroke={color}
      width={props.parentSize.width}
      height={props.parentSize.height}
      numTicks={7}
    />
  ) : (
    <GridRows
      left={props.left}
      scale={Utils.scaleLinear(props.parentSize.height, props.maxValue, props.direction)}
      stroke={color}
      width={props.parentSize.width}
      height={props.parentSize.height}
      numTicks={5}
    />
  );
};

Grid.displayName = 'Grid';

Grid.defaultProps = {
  left: 0,
  maxValue: 0,
};

Grid.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  left: PropTypes.number,
  maxValue: PropTypes.number,
  /**
   * Sets the parentSize, which is used to calculate the bar length.
   */
  parentSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};

export default Grid;
