import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import {
  Bars, CategoricalAxis, NumericalAxis, Responsive,
} from 'tuktuktwo';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Bar Charts are used to display numerical values.
 */
const BarChart = (props) => {
  const barWeight = 10;
  const labels = props.data.map(row => row.label);
  const maxValue = Math.max(...props.data.map(row => Math.max(...row.values)));
  const header = (
    <Header
      header={props.header}
      description={props.description}
      colors={props.colorScheme.categorical}
      legend={props.legend}
    />
  );
  const chart = (
    <Responsive>
      {parent => (
        <svg width="100%" height={parent.height} shapeRendering="crispEdges">
          {props.direction === 'horizontal' ? (
            <CategoricalAxis
              tickLabels={labels}
              orientation="left"
              showTickLabels={!props.loading}
              parentSize={parent}
            />
          ) : (
            <NumericalAxis
              maxValue={maxValue}
              orientation="left"
              showGrid={!props.loading}
              showTickLabels={!props.loading}
              parentSize={parent}
            />
          )}
          {props.direction === 'horizontal' ? (
            <NumericalAxis
              maxValue={maxValue}
              orientation="bottom"
              showGrid={!props.loading}
              showTickLabels={!props.loading}
              parentSize={parent}
            />
          ) : (
            <CategoricalAxis
              tickLabels={labels}
              orientation="bottom"
              showTickLabels={!props.loading}
              parentSize={parent}
            />
          )}
          {!props.loading && (props.legend.length > 1 ? (
            undefined
          ) : (
            <Bars
              barWeight={barWeight}
              color={props.colorScheme.categorical[0]}
              left={props.direction === 'horizontal' ? 102 : 36}
              maxValue={maxValue}
              values={props.data.map(row => row.values[0])}
              direction={props.direction}
              parentSize={parent}
            />
          ))}
        </svg>
      )}
    </Responsive>
  );
  const chartOverlay = (
    <ChartOverlay>
      <Loader type="inline" />
    </ChartOverlay>
  );
  return (
    <ChartContainer
      header={header}
      chart={chart}
      chartOverlay={props.loading && chartOverlay}
    />
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'vertical',
  loading: false,
};

BarChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  /**
   * Sets the chart data. Type: [ { label: string (required), values: [number] (required) } ]
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  /**
   * Sets the description.
   */
  description: PropTypes.string,
  /**
   * Sets the bar direction.
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the header.
   */
  header: PropTypes.string,
  /**
    * Sets the legend. Type: [ string ]
    */
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
};

export default BarChart;
