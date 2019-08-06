import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene/dist/pyrene.dev';
import { Bar, BulletBar } from 'tuktuktwo/dist/tuktuktwo.dev';
import Title from '../Title/Title';
import './comparisonChartTable.css';

function getId(title, bullet) {
  return title.trim().toLowerCase() + (bullet ? '_bullet' : '');
}

function getValueWithAccessor(row, accessor) {
  return (typeof accessor === 'string' ? row[accessor] : accessor(row));
}

const ComparisonChartTable = (props) => {
  const maxValueCurrent = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.currentValue.accessor)));
  const maxValuePrevious = Math.max(...props.data.map(dataRow => getValueWithAccessor(dataRow, props.columns.previousValue.accessor)));
  const maxValue = Math.max(maxValueCurrent, maxValuePrevious);
  const barWeight = 6;
  const colorScheme = { primary: props.colorScheme.current, secondary: props.colorScheme.previous };
  const cellRenderCallBack = row => (props.bullet ? (
    <BulletBar
      barWeight={barWeight}
      colorScheme={colorScheme}
      maxValue={maxValue}
      primaryValue={getValueWithAccessor(row, props.columns.currentValue.accessor)}
      secondaryValue={getValueWithAccessor(row, props.columns.previousValue.accessor)}
    />
  ) : (
    <div>
      <Bar
        key={getId(`${props.columns.currentValue.title}_bar_current`, props.bullet)}
        barWeight={barWeight}
        color={props.colorScheme.current}
        maxValue={maxValue}
        value={getValueWithAccessor(row, props.columns.currentValue.accessor)}
      />
      <Bar
        key={getId(`${props.columns.previousValue.title}_bar_previous`, props.bullet)}
        barWeight={barWeight}
        color={props.colorScheme.previous}
        maxValue={maxValue}
        value={getValueWithAccessor(row, props.columns.previousValue.accessor)}
      />
    </div>
  ));
  const columnsTable = [
    {
      id: getId(props.columns.label.title, props.bullet),
      headerName: props.columns.label.title,
      accessor: props.columns.label.accessor,
    },
    {
      id: getId(`${props.columns.currentValue.title}_bar`, props.bullet),
      headerName: props.columns.currentValue.title,
      accessor: '',
      cellRenderCallback: cellRenderCallBack,
    },
    {
      id: getId(props.columns.currentValue.title, props.bullet),
      accessor: props.columns.currentValue.accessor,
      cellRenderCallback: props.columns.currentValue.formatter ? row => props.columns.currentValue.formatter(row.value) : null,
    },
    {
      id: getId(props.columns.previousValue.title, props.bullet),
      headerName: props.columns.previousValue.title,
      accessor: props.columns.previousValue.accessor,
      cellRenderCallback: props.columns.previousValue.formatter ? row => props.columns.previousValue.formatter(row.value) : null,
    },
  ];
  return (
    <div styleName="container">
      <Title
        title={props.title}
        subtitle={props.subtitle}
        legend={[
          { label: props.legend.currentLabel, colorKey: 'primary' },
          { label: props.legend.previousLabel, colorKey: 'secondary' },
        ]}
        colorScheme={colorScheme}
      />
      <SimpleTable
        columns={columnsTable}
        data={props.data.sort((a, b) => (getValueWithAccessor(b, props.columns.currentValue.accessor) - getValueWithAccessor(a, props.columns.currentValue.accessor)))}
      />
    </div>
  );
};

ComparisonChartTable.displayName = 'Comparison Chart Table';

ComparisonChartTable.category = 'Chart';

ComparisonChartTable.defaultProps = {
  title: '',
  subtitle: '',
  colorScheme: {
    current: 'var(--blue-700)',
    previous: 'var(--blue-050)',
  },
  bullet: false,
  legend: [],
};

ComparisonChartTable.propTypes = {
  colorScheme: PropTypes.shape({
    current: PropTypes.string.isRequired,
    previous: PropTypes.string,
  }),
  columns: PropTypes.shape({
    currentValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }),
    label: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
    previousValue: PropTypes.shape({
      accessor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]).isRequired,
      formatter: PropTypes.func,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legend: PropTypes.arrayOf(PropTypes.shape({
    colorKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  bullet: PropTypes.bool,// eslint-disable-line
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default ComparisonChartTable;
