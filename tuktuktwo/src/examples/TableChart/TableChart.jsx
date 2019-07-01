import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from '@vx/shape';
import './tableChart.css';

/* eslint-disable react/display-name, no-nested-ternary */

const title = 'Table Chart';
const header = [
  'Name',
  'Age',
  'Age',
];
const rows = [
  {
    key: 'Meredith Carney',
    value: 53,
  },
  {
    key: 'Savage Weeks',
    value: 21,
  },
  {
    key: 'Henry Ford',
    value: 76,
  },
];

// Define the graph dimensions and margins
const rowHeight = 10;
const graphWidth = Math.max(...rows.map(row => row.value));

const TableChart = props => (
  <div>
    {title && (
      <div styleName="tableTitle">
        {title}
      </div>
    )}
    <table xmlns="http://www.w3.org/1999/xhtml" styleName="tableBody">
      <tbody>
        <tr styleName="tableRow">
          {header.length > 0 && header.map(column => (
            <th styleName="tableCellValue">
              {column}
            </th>
          ))}
        </tr>
        {rows.length > 0 && rows.map(row => (
          <tr styleName="tableRow"
            key={row.key}
          >
            <td styleName="tableCellKey">
              {row.key}
            </td>
            <td styleName="tableCellValue">
              {row.value}
            </td>
            <td>
              <svg width={graphWidth} height={rowHeight}>
                <Bar
                  x={0}
                  y={0}
                  height={rowHeight}
                  width={row.value}
                  fill={props.fillColor}
                />
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TableChart.defaultProps = {
  fillColor: 'blue',
};

TableChart.propTypes = {
  /**
   * Color of the closed area.
   */
  fillColor: PropTypes.string,
};

export default TableChart;
