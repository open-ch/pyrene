import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import {
  Bars, BarStack, CategoricalAxis, NumericalAxis, Responsive,
} from 'tuktuktwo';
import ChartContainer from '../ChartContainer/ChartContainer';
import ChartOverlay from '../ChartOverlay/ChartOverlay';
import Header from '../Header/Header';
import colorConstants from '../../styles/colorConstants';
import colorSchemes from '../../styles/colorSchemes';

/**
 * Bar Charts are used to display numerical values.
 */
const BarChart = (props) => {
  const barWeight = 10;
  const labels = props.data.map((row) => row.label);
  const maxValue = Math.max(...props.data.map((row) => Math.max(...row.values)));
  const header = (
    <Header
      title={props.title}
      description={props.description}
      colors={props.colorScheme.categorical}
      legend={props.legend}
    />
  );
  const chart = (
    <Responsive>
      {(parent) => {
        const sharedAxisProps = {
          height: parent.height,
          width: parent.width,
          showTickLabels: !props.loading,
          strokeColor: colorConstants.strokeColor,
          tickLabelColor: colorConstants.tickLabelColor,
        };
        return (
          <svg width="100%" height={parent.height} shapeRendering="crispEdges">
            {props.direction === 'horizontal' ? (
              <CategoricalAxis
                height={sharedAxisProps.height}
                width={sharedAxisProps.width}
                showTickLabels={sharedAxisProps.showTickLabels}
                strokeColor={sharedAxisProps.strokeColor}
                tickLabelColor={sharedAxisProps.tickLabelColor}
                tickLabels={labels}
                orientation="left"
              />
            ) : (
              <NumericalAxis
                height={sharedAxisProps.height}
                width={sharedAxisProps.width}
                showTickLabels={sharedAxisProps.showTickLabels}
                strokeColor={sharedAxisProps.strokeColor}
                tickLabelColor={sharedAxisProps.tickLabelColor}
                maxValue={maxValue}
                orientation="left"
                showGrid={!props.loading}
                tickFormat={props.tickFormatNumerical}
              />
            )}
            {props.direction === 'horizontal' ? (
              <NumericalAxis
                height={sharedAxisProps.height}
                width={sharedAxisProps.width}
                showTickLabels={sharedAxisProps.showTickLabels}
                strokeColor={sharedAxisProps.strokeColor}
                tickLabelColor={sharedAxisProps.tickLabelColor}
                maxValue={maxValue}
                orientation="bottom"
                showGrid={!props.loading}
                tickFormat={props.tickFormatNumerical}
              />
            ) : (
              <CategoricalAxis
                height={sharedAxisProps.height}
                width={sharedAxisProps.width}
                showTickLabels={sharedAxisProps.showTickLabels}
                strokeColor={sharedAxisProps.strokeColor}
                tickLabelColor={sharedAxisProps.tickLabelColor}
                tickLabels={labels}
                orientation="bottom"
              />
            )}
            {!props.loading && (props.legend.length > 1 ? (
              <BarStack
                barWeight={barWeight}
                colors={props.colorScheme.categorical}
                height={parent.height}
                keys={props.legend}
                data={props.data}
                direction={props.direction}
                width={parent.width}
              />
            ) : (
              <Bars
                barWeight={barWeight}
                color={props.colorScheme.categorical[0]}
                height={parent.height}
                maxValue={maxValue}
                values={props.data.map((row) => row.values[0])}
                direction={props.direction}
                width={parent.width}
              />
            ))}
          </svg>
        );
      }}
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
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'vertical',
  loading: false,
  tickFormatNumerical: (d) => d,
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
    * Sets the legend. Type: [ string ]
    */
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
    * If set, a loader is shown instead of axis tick labels, grid and bars.
    */
  loading: PropTypes.bool,
  /**
   * Set function to format the tick labels of the NumericalAxis.
   */
  tickFormatNumerical: PropTypes.func,
  /**
   * Sets the title.
   */
  title: PropTypes.string.isRequired,
};

export default BarChart;
