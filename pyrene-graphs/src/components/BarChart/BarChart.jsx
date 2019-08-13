import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Bar, RelativeBar } from 'tuktuktwo/dist/tuktuktwo.dev';
import Header from '../Header/Header';
import './barChart.css';
import colorSchemes from '../../styles/colorSchemes';

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

const BarChart = (props) => {
  const maxValue = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.value.accessor)));
  const barWeight = 6;
  const parentLength = 150;
  const colorSchemeRelative = [props.colorScheme[0], props.colorScheme.slice(-1)[0]];
  const barChart = (row, accessor) => (props.relative ? (
    <RelativeBar
      barWeight={barWeight}
      colorScheme={colorSchemeRelative}
      maxValue={maxValue}
      value={getValueWithAccessor(row, accessor)}
      direction={props.direction}
      parentLength={parentLength}
    />
  ) : (
    <Bar
      barWeight={barWeight}
      color={props.colorScheme[0]}
      maxValue={maxValue}
      value={getValueWithAccessor(row, accessor)}
      direction={props.direction}
      parentLength={parentLength}
    />
  ));
  return (
    <div styleName="container">
      <Header
        header={props.header}
        description={props.description}
        legend={[props.columns.value.title]}
        colorScheme={colorSchemeRelative}
      />
      <div styleName={classNames('chartContainer', { verticalContainer: props.direction === 'vertical' })}>
        {props.data.map(row => (
          <div>
            {barChart(row, props.columns.value.accessor)}
          </div>
        ))}
      </div>
    </div>
  );
};

BarChart.displayName = 'Bar Chart';

BarChart.defaultProps = {
  header: '',
  description: '',
  colorScheme: colorSchemes.sequential,
  relative: false,
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
  relative: PropTypes.bool, // eslint-disable-line
};

export default BarChart;
