import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'pyrene';
import {
  Bars, CategoricalAxis, NumericalAxis, Responsive,
} from 'tuktuktwo';
import GraphContainer from '../GraphContainer/GraphContainer';
import GraphOverlay from '../GraphOverlay/GraphOverlay';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

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
  const graph = (
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
  const graphOverlay = (
    <GraphOverlay>
      <Loader type="inline" />
    </GraphOverlay>
  );
  return (
    <GraphContainer
      header={header}
      graph={graph}
      graphOverlay={props.loading && graphOverlay}
    />
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault,
  direction: 'horizontal',
  loading: false,
};

BarChart.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { categorical: [ string ] (required) }
   */
  colorScheme: PropTypes.shape({
    categorical: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  description: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  header: PropTypes.string,
  legend: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
};

export default BarChart;
