/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from '../components/BarChart/BarChart.examples';
import { default as BarChartTable } from '../components/BarChartTable/BarChartTable.examples';

import {
  tableData,
  tableColumns,
  tableDataComparison,
  tableColumnsComparison,
  tableDataUpDown,
  tableColumnsUpDown,
} from './tableData';

// Sort alphabetically to find stuff easily
const examples = {
  BarChart,
  BarChartTable,
};

export default examples;

export const exampleData = {
  tableData: { data: tableData, columns: tableColumns },
  tableDataComparison: { data: tableDataComparison, columns: tableColumnsComparison },
  tableDataUpDown: { data: tableDataUpDown, columns: tableColumnsUpDown },
};
