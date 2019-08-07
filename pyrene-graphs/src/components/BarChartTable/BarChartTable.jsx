import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene/dist/pyrene';
import { Bar, BulletBar, RelativeBar } from 'tuktuktwo/dist/tuktuktwo';
import Title from '../Title/Title';
import './barChartTable.css';
import colorSchemes from '../../styles/colorSchemes';

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
  const maxValuePrimary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.primaryValue.accessor)));
  const maxValueSecondary = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.secondaryValue.accessor)));
  const maxValue = Math.max(maxValuePrimary, maxValueSecondary);
  const barWeight = 6;
  const barChart = (row) => {
    const defaultBar = (
      <RelativeBar
        barWeight={barWeight}
        colorScheme={props.colorScheme}
        maxValue={maxValuePrimary}
        value={row.value}
        parentLength={150}
      />
    );
    switch (props.type) {
      case 'bar':
        return defaultBar;
      case 'comparison':
        return (
          <div>
            <Bar
              key={getId(`${props.columns.primaryValue.title}_bar_current`)}
              barWeight={barWeight}
              color={props.colorScheme[0]}
              maxValue={maxValue}
              value={getValueWithAccessor(row, props.columns.primaryValue.accessor)}
              parentLength={150}
            />
            <Bar
              key={getId(`${props.columns.secondaryValue.title}_bar_previous`)}
              barWeight={barWeight}
              color={props.colorScheme[1]}
              maxValue={maxValue}
              value={getValueWithAccessor(row, props.columns.secondaryValue.accessor)}
              parentLength={150}
            />
          </div>
        );
      case 'bullet':
        return (
          <BulletBar
            barWeight={barWeight}
            colorScheme={props.colorScheme}
            maxValue={maxValue}
            primaryValue={getValueWithAccessor(row, props.columns.primaryValue.accessor)}
            secondaryValue={getValueWithAccessor(row, props.columns.secondaryValue.accessor)}
            parentLength={150}
          />
        );
      default:
        return defaultBar;
    }
  };
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
        legend={[props.columns.primaryValue.title, props.columns.secondaryValue.title]}
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
  colorScheme: colorSchemes.blue,
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
  type: PropTypes.oneOf(['bar', 'comparison', 'bullet']),
};

export default BarChartTable;
