import React from 'react';
import PropTypes from 'prop-types';
import {
  Responsive,
  SparkLine as SparkLineTT2,
  localPoint,
  withTooltip,
} from 'tuktuktwo';
import Tooltip from '../Tooltip/Tooltip';
import { INDEX_VALUE } from '../../common/graphConstants';
import colorSchemes from '../../styles/colorSchemes';

const onMouseMove = (event, data, showTooltip, width) => {
  const { x, y } = localPoint(event.target.ownerSVGElement, event);
  const bandwidth = width / data.length;
  const index = Math.floor(x / bandwidth);
  
  showTooltip({
    tooltipLeft: x,
    tooltipTop: y,
    tooltipData: [data[index][INDEX_VALUE]],
  });
};

/**
 * The pure SVG part of the spark line.
 */
const SparkLineSVG = (props) => {
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = props;

  return (
    <Responsive>
      {(parent) => {
        const tooltipDataSeries = tooltipData.map((value) => ({
          dataValue: props.dataFormat(value),
        }));
        return (
          <>
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              <g
                className="hoverArea"
                onMouseMove={(e) => onMouseMove(e, props.dataSeries, showTooltip, parent.width)}
                onMouseOut={hideTooltip}
              >
                <SparkLineTT2
                  colors={props.colorScheme.valueGround}
                  dataSeries={props.dataSeries}
                  height={parent.height}
                  strokeWidth={1}
                  width={parent.width}
                />
              </g>
            </svg>
            {
              tooltipOpen && (
                <Tooltip
                  dataSeries={tooltipDataSeries}
                  left={tooltipLeft} top={tooltipTop}
                  overflow
                />
              )
            }
          </>
        );
      }}
    </Responsive>
  );
};

SparkLineSVG.displayName = 'Spark Line';

SparkLineSVG.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
  tooltipData: [],
  tooltipLeft: 0,
  tooltipTop: 0,
};

SparkLineSVG.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGround: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph, consisting of format function for the y-axis and that for the tooltip.
   */
  dataFormat: PropTypes.func.isRequired,
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  /**
   * The function to hide tooltip provided by the withTooltip enhancer.
   */
  hideTooltip: PropTypes.func.isRequired,
  /**
   * The function to render the proper tooltip provided by the withTooltip enhancer.
   */
  showTooltip: PropTypes.func.isRequired,
  /**
   * The tooltip data prop provided by the withTooltip enhancer.
   */
  tooltipData: PropTypes.arrayOf(PropTypes.number),
  /**
   * The tooltip x-position prop provided by the withTooltip enhancer.
   */
  tooltipLeft: PropTypes.number,
  /**
   * The prop provided by the withTooltip enhancer to decide whether to show the tooltip or not.
   */
  tooltipOpen: PropTypes.bool.isRequired,
  /**
   * The tooltip y-position prop provided by the withTooltip enhancer.
   */
  tooltipTop: PropTypes.number,
};

export default withTooltip(SparkLineSVG);
