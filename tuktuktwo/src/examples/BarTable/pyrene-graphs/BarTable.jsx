import React from 'react';
import PropTypes from 'prop-types';
import SimpleTable from '../pyrene/SimpleTable';
import Bar from '../tuktwo/Bar';
import getBy from '../pyrene/TableUtils';

const BarTable = (props) => {
  const graphColumn = props.columns.filter(column => column.graph)[0];
  const columnsNew = props.columns;
  if (graphColumn) {
    const cellRenderCallback = row => (
      <Bar
        barHeight={props.barHeight}
        color={props.colorScheme.primary}
        maxValue={Math.max(...props.data.map(dataRow => (typeof graphColumn.accessor === 'string' ? getBy(dataRow, graphColumn.accessor) : graphColumn.accessor(dataRow))))}
        value={row.value}
      />
    );
    props.columns.map(column => (column.graph ? (columnsNew.filter(columnNew => columnNew.id === column.id)[0].cellRenderCallback = cellRenderCallback) : column).graph);
  }
  return (
    <SimpleTable
      columns={columnsNew}
      data={props.data}
      title={props.title}
    />
  );
};

BarTable.displayName = 'Bar Table';

BarTable.defaultProps = {
  title: '',
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
  barHeight: 18,
};

BarTable.propTypes = {
  barHeight: PropTypes.number, // eslint-disable-line
  colorScheme: PropTypes.object, // eslint-disable-line
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
};

export default BarTable;
