import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@vx/shape';
import SimpleTable from './SimpleTable';
// import './tableChart.css';

const rowHeight = 10;

const BarTable = (props) => {
  props.cellRenderCallback = (row, column) => {
    const scaleFactor = column.cellRenderCallback.width / Math.max(...props.data.map(dataRow => dataRow[column.id]));
    return (
      <div width={column.cellRenderCallback.width}>
        <svg width={column.cellRenderCallback.width} height={rowHeight}>
          <Bar
            x={0}
            y={0}
            height={rowHeight}
            width={row[column.id] * scaleFactor}
            fill={column.cellRenderCallback.fillColor}
          />
        </svg>
      </div>
    );
  };
  return (SimpleTable(props));
};

BarTable.displayName = 'Bar Table';

BarTable.defaultProps = {
  title: '',
  cellRenderCallback: value => value,
};

BarTable.propTypes = {
  /**
  * Defines how the cell should get rendered
  */
  cellRenderCallback: PropTypes.func,
  /**
   * Color of the closed area.
   */
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the title.
   */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  /**
   * Sets the Table data displayed in the rows. Type: JSON
   */
  title: PropTypes.string, // eslint-disable-line react/forbid-prop-types

};

export default BarTable;
