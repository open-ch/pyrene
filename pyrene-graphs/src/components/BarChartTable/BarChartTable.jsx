import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene';
import { Bar, RelativeBar } from 'tuktuktwo';
import Title from '../Title/Title';
import './barChartTable.css';
import colorSchemes from '../../styles/colorSchemes';

function getId(title) {
  return title.trim().toLowerCase();
}

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

function getProcessedColumnsAndLegend(props) {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const barWeight = 6;
  const barWeightSecondaryComparison = 4;
  const parentLength = 150;
  const parentLengthButterfly = 118;
  const defaultBarChart = row => (
    <RelativeBar
      barWeight={barWeight}
      colorScheme={props.colorScheme}
      maxValue={maxValuePrimary}
      value={row.value}
      parentLength={parentLength}
    />
  );
  let barChart;
  let legend = [props.columns.primaryValue.title];
  if (props.columns.secondaryValue) legend.push(props.columns.secondaryValue.title);
  switch (props.type) {
    case 'bar':
      barChart = defaultBarChart;
      legend = [];
      break;
    case 'comparison':
      barChart = row => ( // eslint-disable-line react/display-name
        <div styleName="comparisonContainer">
          <Bar
            key={getId(`${props.columns.primaryValue.title}_bar_current`)}
            barWeight={barWeight}
            color={props.colorScheme[0]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.primaryValue.accessor)}
            parentLength={parentLength}
          />
          <Bar
            key={getId(`${props.columns.secondaryValue.title}_bar_previous`)}
            barWeight={barWeightSecondaryComparison}
            color={props.colorScheme[1]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)}
            parentLength={parentLength}
          />
        </div>
      );
      break;
    case 'butterfly':
      legend = [];
      break;
    default:
      barChart = defaultBarChart;
      break;
  }
  const columnLabel = {
    id: getId(props.columns.label.title),
    headerName: props.columns.label.title,
    accessor: props.columns.label.accessor,
  };
  const columnPrimaryValue = {
    id: getId(props.columns.primaryValue.title),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: props.columns.primaryValue.formatter ? row => props.columns.primaryValue.formatter(row.value) : null,
  };
  const columnPrimaryBarChart = {
    id: getId(`${props.columns.primaryValue.title}_bar`),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: barChart,
  };
  const columnSecondaryValue = props.columns.secondaryValue ? {
    id: getId(props.columns.secondaryValue.title),
    accessor: props.columns.secondaryValue.accessor,
    cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
    headerName: props.columns.secondaryValue.title,
  } : {};
  let columns;
  const columnsTable = [
    columnLabel,
    { ...columnPrimaryBarChart, headerName: props.columns.primaryValue.title },
    columnPrimaryValue,
  ];
  if (props.columns.secondaryValue) columnsTable.push(columnSecondaryValue);
  switch (props.type) {
    case 'bar':
      columns = columnsTable;
      break;
    case 'comparison':
      columns = [
        columnLabel,
        { ...columnPrimaryValue, headerName: props.columns.primaryValue.title },
        columnPrimaryBarChart,
        columnSecondaryValue,
      ];
      break;
    case 'butterfly':
      columns = [
        columnLabel,
        columnPrimaryValue,
        {
          id: getId(`${props.columns.primaryValue.title}_bar_left`),
          headerName: props.columns.primaryValue.title + props.columns.secondaryValue.title,
          accessor: props.columns.primaryValue.accessor,
          cellRenderCallback: row => ( // eslint-disable-line react/display-name
            <div styleName="butterflyContainer">
              <RelativeBar
                barWeight={barWeight}
                colorScheme={props.colorScheme}
                maxValue={maxValue}
                value={row.value}
                parentLength={parentLengthButterfly}
                mirrored
              />
              <div styleName="verticalLine" />
              <RelativeBar
                barWeight={barWeight}
                colorScheme={props.colorScheme}
                maxValue={maxValue}
                value={row.value}
                parentLength={parentLengthButterfly}
              />
            </div>
          ),
        },
        {
          id: getId(props.columns.secondaryValue.title),
          accessor: props.columns.secondaryValue.accessor,
          cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
        },
      ];
      break;
    default:
      columns = columnsTable;
      break;
  }
  return { columns: columns, legend: legend };
}

/**
 * Bar Chart Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 * The primaryValue is automatically being sorted in descending order and then displayed as a bar chart.
 */
const BarChartTable = (props) => {
  const columnsAndLegend = getProcessedColumnsAndLegend(props);
  return (
    <div styleName="container">
      <Title
        title={props.title}
        subtitle={props.subtitle}
        legend={columnsAndLegend.legend}
        colorScheme={props.colorScheme}
      />
      <SimpleTable
        columns={columnsAndLegend.columns}
        data={props.data.sort((a, b) => (getValueWithAccessor(b, props.columns.primaryValue.accessor) - getValueWithAccessor(a, props.columns.primaryValue.accessor)))}
      />
    </div>
  );
};

BarChartTable.displayName = 'Bar Chart Table';

BarChartTable.category = 'Chart';

BarChartTable.defaultProps = {
  title: '',
  subtitle: '',
  colorScheme: colorSchemes.general,
  type: 'bar',
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), title: string (required) }, primaryValue: { accessor: string or func (required), formatter: func, title: string (required) }, secondaryValue: { accessor: string or func (required), formatter: func, title: string (required) }}
   */
  columns: PropTypes.shape({
    label: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
    primaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }).isRequired,
    secondaryValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  /**
   * Sets the Table data displayed in the rows. It gets sorted automatically by primaryValue. Type: [ JSON ]
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Sets the subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * Sets the title.
   */
  title: PropTypes.string,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};

export default BarChartTable;
