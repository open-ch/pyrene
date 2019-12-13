import React from 'react';
import PropTypes from 'prop-types';
import { Responsive } from 'tuktuktwo';
import SparkLineSVG from './SparkLineSVG';
import colorSchemes from '../../styles/colorSchemes';
import './sparkLine.css';

/**
 * Spark Lines are used to display data series and can be embedded in another context such as in tables.
 */
const SparkLine = (props) => (
  <div styleName="container">
    <div styleName="chart">
      <Responsive>
        {(parent) => (
          <SparkLineSVG
            colorScheme={props.colorScheme}
            dataFormat={props.dataFormat}
            dataSeries={props.dataSeries}
            height={parent.height}
            width={parent.width}
          />
        )}
      </Responsive>
    </div>
  </div>
);

SparkLine.displayName = 'Spark Line';

SparkLine.defaultProps = {
  colorScheme: colorSchemes.colorSchemeDefault,
};

SparkLine.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    valueGroundLight: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the data formatting functions for the graph.
   */
  dataFormat: PropTypes.func.isRequired,
  /**
   * Sets the data series as an array of data. Each data item contains a timestamp and a value.
   */
  dataSeries: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default SparkLine;
