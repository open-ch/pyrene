import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene/dist/pyrene.dev';
import { RelativeBar } from 'tuktuktwo/dist/tuktuktwo.dev';
import Title from '../Title/Title';
import './barChartTable.css';

function getId(title) {
  return title.trim().toLowerCase();
}

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

/**
 * Bar Chart Tables are used to display tabular data without the overhead of pagination, sorting and filtering.
 * The primaryValue is automatically being sorted in descending order and then displayed as a bar chart.
 */
const BarChartTable = (props) => {
  const maxValue = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const barWeight = 6;
  const barChart = row => (
    <RelativeBar
      barWeight={barWeight}
      colorScheme={props.colorScheme}
      maxValue={maxValue}
      value={row.value}
      parentLength={150}
    />
  );
  const columnsTable = [
    {
      id: getId(props.columns.label.title),
      headerName: props.columns.label.title,
      accessor: props.columns.label.accessor,
    },
    {
      id: getId(`${props.columns.primaryValue.title}_bar`),
      headerName: props.columns.primaryValue.title,
      accessor: props.columns.primaryValue.accessor,
      cellRenderCallback: barChart,
    },
    {
      id: getId(props.columns.primaryValue.title),
      accessor: props.columns.primaryValue.accessor,
      cellRenderCallback: props.columns.primaryValue.formatter ? row => props.columns.primaryValue.formatter(row.value) : null,
    },
    {
      id: getId(props.columns.secondaryValue.title),
      headerName: props.columns.secondaryValue.title,
      accessor: props.columns.secondaryValue.accessor,
      cellRenderCallback: props.columns.secondaryValue.formatter ? row => props.columns.secondaryValue.formatter(row.value) : null,
    },
  ];
  return (
    <div styleName="container">
      <Title
        title={props.title}
        subtitle={props.subtitle}
        legend={props.legend}
        colorScheme={props.colorScheme}
      />
      <SimpleTable
        columns={columnsTable}
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
  colorScheme: {
    primary: 'var(--blue-700)',
    secondary: 'var(--blue-050)',
  },
  legend: [],
};

BarChartTable.propTypes = {
  /**
   * Sets the colors of the bar chart. Type: { primary: string (required), secondary: string }
   */
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }),
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
    }),
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
   * Sets the Table data displayed in the rows. It gets sorted automatically by primaryValue. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the legend. Type: [{ colorKey: string (required), secondary: string }]
   */
  legend: PropTypes.arrayOf(PropTypes.shape({
    colorKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  /**
   * Sets the subtitle.
   */
  subtitle: PropTypes.string,
  /**
   * Sets the title.
   */
  title: PropTypes.string,
};

export default BarChartTable;
