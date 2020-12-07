/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from '../components/BarChart/BarChart.examples';
import { default as BarChartTable } from '../components/BarChartTable/BarChartTable.examples';
import { default as SparkLine } from '../components/SparkLine/SparkLine.examples';
import { default as SparkLineChart } from '../components/SparkLineChart/SparkLineChart.examples';
import { default as TimeSeriesBucketChart } from '../components/TimeSeriesBucketChart/TimeSeriesBucketChart.examples';
import { default as TimeSeriesLineChart } from '../components/TimeSeriesLineChart/TimeSeriesLineChart.examples';

import {
  tableData, tableColumns,
  tableDataComparison, tableColumnsComparison,
  tableDataUpDown, tableColumnsUpDown,
  tableDataSecLabel, tableColumnsSecLabel,
} from './tableData';

import {
  applications,
  stacked,
} from './barData';

// Sort alphabetically to find stuff easily
const examples = {
  BarChart,
  BarChartTable,
  SparkLine,
  SparkLineChart,
  TimeSeriesBucketChart,
  TimeSeriesLineChart,
};

export default examples;

export const exampleData = {
  applications,
  stacked,
  tableData: { data: tableData, columns: tableColumns },
  tableDataComparison: { data: tableDataComparison, columns: tableColumnsComparison },
  tableDataUpDown: { data: tableDataUpDown, columns: tableColumnsUpDown },
  tableDataSecLabel: { data: tableDataSecLabel, columns: tableColumnsSecLabel },
};
