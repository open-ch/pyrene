import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTable } from 'pyrene/dist/pyrene.dev';
import { Bar, RelativeBar } from 'tuktuktwo/dist/tuktuktwo.dev';
import Title from '../Title/Title';
import './barTable.css';

const BarTable = (props) => {
  const graphColumn = props.columns.filter(column => column.graph)[0];
  const columnsNew = props.columns;
  if (graphColumn) {
    const maxValue = Math.max(...props.data.map(dataRow => (typeof graphColumn.accessor === 'string' ? dataRow[graphColumn.accessor] : graphColumn.accessor(dataRow))));
    const cellRenderCallback = row => (props.relative ? (
      <RelativeBar
        barWeight={props.barWeight}
        colorScheme={props.colorScheme}
        maxValue={maxValue}
        value={row.value}
      />
    ) : (
      <Bar
        barWeight={props.barWeight}
        color={props.colorScheme.primary}
        maxValue={maxValue}
        value={row.value}
      />
    ));
    props.columns.map(column => (column.graph ? (columnsNew.filter(columnNew => columnNew.id === column.id)[0].cellRenderCallback = cellRenderCallback) : column).graph);
  }
  return (
    <div styleName="container">
      <Title
        title={props.title}
        subtitle={props.subtitle}
        legend={props.legend}
        colorScheme={props.colorScheme}
      />
      <SimpleTable
        columns={columnsNew}
        data={props.data}
      />
    </div>
  );
};

BarTable.displayName = 'Bar Table';

BarTable.category = 'Chart';

BarTable.defaultProps = {
  title: '',
  subtitle: '',
  colorScheme: {
    primary: 'var(--blue-700)',
    secondary: 'var(--blue-050)',
  },
  barWeight: 6,
  relative: false,
  legend: [],
};

BarTable.propTypes = {
  barWeight: PropTypes.number, // eslint-disable-line
  colorScheme: PropTypes.object, // eslint-disable-line
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legend: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  relative: PropTypes.bool,// eslint-disable-line
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BarTable;
