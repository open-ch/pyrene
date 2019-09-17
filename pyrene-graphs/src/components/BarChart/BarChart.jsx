import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Axis, Bar } from 'tuktuktwo/dist/tuktuktwo';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

const BarChart = (props) => {
  const maxValue = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.value.accessor)));
  const barWeight = 10;
  const barChart = (row, accessor) => (
    <Bar
      barWeight={barWeight}
      color={props.colorScheme[0]}
      maxValue={maxValue}
      value={getValueWithAccessor(row, accessor)}
      direction={props.direction}
    />
  );
  const labels = props.data.map(row => getValueWithAccessor(row, props.columns.label.accessor));
  return (
    <div styleName="container">
      <Header
        header={props.header}
        description={props.description}
        colorScheme={props.colorScheme}
      />
      <div styleName="columnContainer">
        <div styleName="axisLeft">
          <Axis
            labels={props.direction === 'horizontal' ? labels : []}
            maxValue={props.direction === 'vertical' && maxValue}
            position="left"
          />
        </div>
        <div styleName="rowContainer">
          <div styleName={classNames('barsContainer', { horizontalContainer: props.direction === 'horizontal' })}>
            {props.data.map(row => (
              <div styleName="barContainer">
                {barChart(row, props.columns.value.accessor)}
              </div>
            ))}
          </div>
          <div styleName="axisBottom">
            <Axis
              labels={props.direction === 'vertical' ? labels : []}
              maxValue={props.direction === 'horizontal' && maxValue}
              position="bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.colorSchemeDefault.sequential,
  direction: 'horizontal',
};

BarChart.propTypes = {
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  columns: PropTypes.shape({
    label: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
    value: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  header: PropTypes.string,
};

export default BarChart;
