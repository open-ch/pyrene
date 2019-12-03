import React from 'react';
import PropTypes from 'prop-types';
import { SparkLine as SparkLineTT2, Responsive } from 'tuktuktwo';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLine.css';

/**
 * Spark Lines are used to display data series and can be embedded in another context such as in tables.
 */
const SparkLine = (props) => {
  return (
    <div styleName="container">
      <div styleName="chart">
        <Responsive>
          {(parent) => (
            <svg width="100%" height={parent.height} shapeRendering="crispEdges">
              <SparkLineTT2
                colors={props.colorScheme.valueGround}
                dataSeries={props.dataSeries}
                height={parent.height}
                strokeWidth={1}
                width={parent.width}
              />
            </svg>
          )}
        </Responsive>
      </div>
    </div>
  );
};

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
};

SparkLine.propTypes = {
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
};

export default SparkLine;
