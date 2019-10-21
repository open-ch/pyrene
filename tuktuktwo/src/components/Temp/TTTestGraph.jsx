import React from 'react';
import PropTypes from 'prop-types';
import { appleStock } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { withTooltip } from '@vx/tooltip';
import { AreaClosed } from '@vx/shape';
import { Group } from '@vx/group';
import { localPoint } from '@vx/event';
import { extent, max, bisector } from 'd3-array';
import TimeSeriesTooltip from '../Tooltip/TimeSeriesTooltip';

/**
 * Temporary code to display time series features in kitchensink, _must_ be removed removed over time
 */
class TTTestGraph extends React.Component {

  onMouseMove = (event, xScale) => {
    const { x, y } = localPoint(event.target.ownerSVGElement, event);
    const x0 = xScale.invert(x);
    const index = bisector(d => d[0]).left(this.props.data, x0, 1);
    this.props.showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: this.props.data[index - 1],
    });
  };

  // Sample, do not use!
  sampleTimeFormat = (t) => {
    const da = t => new Date(t).toISOString().slice(0, 10);
    const ti = t => new Date(t).toISOString().slice(11, 16);

    if (Array.isArray(t) && t.length === 2) {
      return `${da(t[0])} ${ti(t[0])} - ${ti(t[1])}`;
    }

    if (Number.isInteger(t)) {
      return `${da(t)} ${ti(t)}`;
    }

    return 'n/a';
  };

  render() {
    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80,
    };

    const {
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip,
    } = this.props;

    const xMax = this.props.width - margin.left - margin.right;
    const yMax = this.props.height - margin.top - margin.bottom;

    const xStock = d => d[0];
    const yStock = d => d[1];

    const xScale = scaleLinear({
      range: [0, xMax],
      domain: extent(this.props.data, xStock),
    });

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(this.props.data, yStock)],
    });

    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          <Group top={margin.top} left={margin.left} onMouseMove={e => this.onMouseMove(e, xScale)} onMouseOut={hideTooltip}>
            <AreaClosed
              data={this.props.data}
              x={d => xScale(xStock(d))}
              y={d => yScale(yStock(d))}
              yScale={yScale}
              strokeWidth={1}
              fill="var(--neutral-200)"
            />
          </Group>
        </svg>
        {
          tooltipOpen && (
            <TimeSeriesTooltip
              top={tooltipTop}
              left={tooltipLeft}
              time={[tooltipData[0], tooltipData[0]]}
              data={tooltipData[1]}
              dataLabel="AAPL Stock Price Closing"
              dataColor="var(--neutral-200)"
              children={this.props.tooltipChildren}
              timeFormat={this.sampleTimeFormat}
            />
          )
        }
      </div>
    );
  }

}

TTTestGraph.displayName = 'TTTestGraph';

TTTestGraph.defaultProps = {
  width: 750,
  height: 400,
  data: appleStock.map(o => [new Date(o.date).getTime(), o.close]),
};

TTTestGraph.propTypes = {
  data: PropTypes.array,
  height: PropTypes.number,
  tooltipChildren: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default withTooltip(TTTestGraph);
