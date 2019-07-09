import React from 'react';
import PropTypes from 'prop-types';
import SimpleTable from '../pyrene/SimpleTable';
import Bar from '../tuktwo/Bar';
import getBy from '../pyrene/TableUtils';

export default class BarTable extends React.Component {

  render() {
    const graphColumn = this.props.columns.filter(column => column.graph)[0];
    const simpleTableProps = {
      columns: this.props.columns,
      data: this.props.data,
      title: this.props.title,
    };
    if (graphColumn) {
      const cellRenderCallback = (row) => {
        const barProps = {
          barHeight: this.props.barHeight,
          color: this.props.colorScheme.primary,
          maxBarWidth: this.props.maxBarWidth,
          maxValue: Math.max(...this.props.data.map(dataRow => (typeof graphColumn.accessor === 'string' ? getBy(dataRow, graphColumn.accessor) : graphColumn.accessor(dataRow)))),
          value: row.value,
        };
        return Bar(barProps);
      };
      const columnsNew = this.props.columns;
      this.props.columns.map(column => (column.graph ? (columnsNew.filter(columnNew => columnNew.id === column.id)[0].cellRenderCallback = cellRenderCallback) : column).graph);
      simpleTableProps.columns = columnsNew;
    }
    return SimpleTable(simpleTableProps);
  }

}

BarTable.displayName = 'Bar Table';

BarTable.defaultProps = {
  title: '',
  colorScheme: {
    primary: 'blue',
    secondary: 'lightblue',
  },
  maxBarWidth: 250,
  barHeight: 10,
};

BarTable.propTypes = {
  barHeight: PropTypes.number,
  colorScheme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  maxBarWidth: PropTypes.number,
  title: PropTypes.string,
};
