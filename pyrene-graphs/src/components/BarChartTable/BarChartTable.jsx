import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene';
import { Bar, RelativeBar } from 'tuktuktwo';
import Header from '../Header/Header';
import './barChartTable.css';
import colorSchemes from '../../styles/colorSchemes';

function getId(title) {
  return title.trim().toLowerCase();
}

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

function getProcessedColumnsAndLegend(props, colorScheme) {
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = props.columns.secondaryValue ? Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor))) : maxValuePrimary;
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const barWeight = 6;
  const barWeightSecondaryComparison = 4;
  const defaultBarChart = row => (
    <RelativeBar
      barWeight={barWeight}
      colorScheme={colorScheme}
      maxValue={maxValuePrimary}
      value={row.value}
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
            color={colorScheme[0]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.primaryValue.accessor)}
          />
          <Bar
            key={getId(`${props.columns.secondaryValue.title}_bar_previous`)}
            barWeight={barWeightSecondaryComparison}
            color={colorScheme[1]}
            maxValue={maxValue}
            value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)}
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
    accessor: props.columns.label.accessor,
    cellRenderCallback: props.columns.label.linkAccessor ? row => (
      <a
        styleName="labelLink"
        href={getValueWithAccessor(row, props.columns.label.linkAccessor)}
      >
        {row.value}
      </a>
    ) : row => row.value,
    align: 'left',
  };
  const columnPrimaryValue = {
    id: getId(props.columns.primaryValue.title),
    accessor: props.columns.primaryValue.accessor,
    cellRenderCallback: props.columns.primaryValue.formatter ? row => props.columns.primaryValue.formatter(row.value) : null,
    align: 'right',
    width: '90px',
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
    align: 'right',
    width: '90px',
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
                colorScheme={colorScheme}
                maxValue={maxValuePrimary}
                value={getValueWithAccessor(row, props.columns.primaryValue.accessor)}
                mirrored
              />
              <div styleName="verticalLine" />
              <RelativeBar
                barWeight={barWeight}
                colorScheme={colorScheme}
                maxValue={maxValueSecondary}
                value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)}
              />
            </div>
          ),
          align: 'center',
        },
        {
          id: getId(props.columns.secondaryValue.title),
          accessor: props.columns.secondaryValue.accessor,
          cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
          align: 'right',
          width: '90px',
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
  let colorScheme = props.colorScheme;
  if (!(colorScheme.length > 0)) colorScheme = (props.type === 'comparison' ? colorSchemes.currentPrevious : colorSchemes.valueGround);
  const columnsAndLegend = getProcessedColumnsAndLegend(props, colorScheme);
  const description = props.type === 'bar' ? '' : props.description;
  return (
    <div styleName="container">
      <Header
        header={props.header}
        description={description}
        legend={columnsAndLegend.legend}
        colorScheme={colorScheme}
      />
      <SimpleTable
        columns={columnsAndLegend.columns}
        data={props.data.sort((a, b) => (getValueWithAccessor(b, props.columns.primaryValue.accessor) - getValueWithAccessor(a, props.columns.primaryValue.accessor)))}
        onRowDoubleClick={props.onRowDoubleClick}
      />
    </div>
  );
};

BarChartTable.displayName = 'Bar Chart Table';

BarChartTable.defaultProps = {
  colorScheme: [],
  description: '',
  onRowDoubleClick: () => {},
  type: 'bar',
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: [ string ]
   */
  colorScheme: PropTypes.arrayOf(PropTypes.string),
  /**
   * Sets the Table columns.
   * Type: { label: { accessor: string or func (required), linkAccessor: string or func, title: string (required) }, primaryValue: { accessor: string or func (required), formatter: func, title: string (required) }, secondaryValue: { accessor: string or func (required), formatter: func, title: string (required) }}
   */
  columns: PropTypes.shape({
    label: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      linkAccessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
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
   * Sets the description.
   */
  description: PropTypes.string,
  /**
   * Sets the header.
   */
  header: PropTypes.string.isRequired,
  /**
   * Called when the user double clicks on a row.
   */
  onRowDoubleClick: PropTypes.func,
  /**
   * Sets the overall style according to the bar chart type.
   */
  type: PropTypes.oneOf(['bar', 'comparison', 'butterfly']),
};

export default BarChartTable;
