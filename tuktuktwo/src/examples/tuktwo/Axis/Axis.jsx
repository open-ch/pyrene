import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from '@vx/scale';
import { AxisBottom } from '@vx/axis';
import Responsive from '../Misc/Responsive';
import '../utils.css';

const Axis = props => (
  <div styleName="parentDiv">
    <Responsive>
      {parent => (
        <svg width={parent.width} height={parent.height}>
          <AxisBottom
            top={0}
            left={4}
            label={props.label}
            scale={scaleLinear({
              range: [0, 18],
            })}
            tickValues={[...Array(61).keys()]}
            tickLabelProps={(tickValue, index) => ({ fontSize: 10, writingMode: 'tb' })}
          />
        </svg>
      )}
    </Responsive>
  </div>
);

Axis.displayName = 'Axis';

Axis.defaultProps = {
  label: '',
};

Axis.propTypes = {
  label: PropTypes.string,
};

export default Axis;
