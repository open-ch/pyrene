import React from 'react';
import PropTypes from 'prop-types';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const data = appleStock;

const width = 750;
const height = 400;

const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const x = d => new Date(d.date); // d.date is unix timestamps
const y = d => d.close;

data.map(y);

const xScale = scaleTime({
  range: [0, xMax],
  domain: extent(data, x),
});

const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});

const AreaClosedCustom = props => (
  <svg width={width} height={height}>
    <defs>
      <LinearGradient
        from="#fbc2eb"
        to="#a6c1ee"
        id="gradient"
      />
    </defs>
    <Group top={margin.top} left={margin.left}>
      <AxisLeft
        scale={yScale}
        top={0}
        left={0}
        label="Close Price ($)"
        stroke="#1b1a1e"
        tickTextFill="#1b1a1e"
      />
      <AxisBottom
        scale={xScale}
        top={yMax}
        label="Years"
        stroke="#1b1a1e"
        tickTextFill="#1b1a1e"
      />
      <AreaClosed
        data={data}
        // https://stackoverflow.com/a/53861665
        yScale={yScale}
        x={d => xScale(x(d))}
        y={d => yScale(y(d))}
        fill={props.fillColor}
      />
    </Group>
  </svg>
);

AreaClosedCustom.defaultProps = {
  fillColor: 'blue',
};

AreaClosedCustom.propTypes = {
  /**
   * Color of the closed area.
   */
  fillColor: PropTypes.string,
};

export default AreaClosedCustom;
