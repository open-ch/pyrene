import React from 'react';
import PropTypes from 'prop-types';
import SimpleTable from '../pyrene/SimpleTable';
import Bar from '../tuktwo/Bar/Bar';
import RelativeBar from '../tuktwo/Bar/RelativeBar';
import Title from '../tuktwo/Title/Title';
import getBy from '../pyrene/TableUtils';

const BarTable = (props) => {
  const graphColumn = props.columns.filter(column => column.graph)[0];
  const columnsNew = props.columns;
  if (graphColumn) {
    const maxValue = Math.max(...props.data.map(dataRow => (typeof graphColumn.accessor === 'string' ? getBy(dataRow, graphColumn.accessor) : graphColumn.accessor(dataRow))));
    const cellRenderCallback = row => (props.relative ? (
      <RelativeBar
        barHeight={props.barHeight}
        colorScheme={props.colorScheme}
        maxValue={maxValue}
        value={row.value}
      />
    ) : (
      <Bar
        barHeight={props.barHeight}
        color={props.colorScheme.primary}
        maxValue={maxValue}
        value={row.value}
      />
    ));
    props.columns.map(column => (column.graph ? (columnsNew.filter(columnNew => columnNew.id === column.id)[0].cellRenderCallback = cellRenderCallback) : column).graph);
  }
  return (
    <div>
      <Title
        title={props.title}
        subtitle={props.subtitle}
      />
      <SimpleTable
        columns={columnsNew}
        data={props.data}
      />
    </div>
  );
};

BarTable.displayName = 'Bar Table';

BarTable.defaultProps = {
  title: '',
  subtitle: '',
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
  barHeight: 18,
  relative: false,
};

BarTable.propTypes = {
  barHeight: PropTypes.number, // eslint-disable-line
  colorScheme: PropTypes.object, // eslint-disable-line
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  relative: PropTypes.bool, // eslint-disable-line
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default BarTable;
