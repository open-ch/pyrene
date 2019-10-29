/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from '../components/BarChart/BarChart.examples';
import { default as BarChartTable } from '../components/BarChartTable/BarChartTable.examples';
import { default as TimeSeriesBucketGraph } from '../components/TimeSeriesBucketGraph/TimeSeriesBucketGraph.examples';
import { default as TimeSeriesPlaygroundWithTooltip } from '../components/TimeSeriesPlayground/TimeSeriesPlaygroundWithTooltip.examples';

import {
  tableData, tableColumns,
  tableDataComparison, tableColumnsComparison,
  tableDataUpDown, tableColumnsUpDown,
  tableDataSecLabel, tableColumnsSecLabel,
} from './tableData';

import {
  applications,
  nsmSensors,
} from './barData';

import { downloadedVolumes } from './timeSeriesData';

// Sort alphabetically to find stuff easily
const examples = {
  BarChart,
  BarChartTable,
  TimeSeriesBucketGraph,
  TimeSeriesPlaygroundWithTooltip,
};

export default examples;

export const exampleData = {
  applications,
  downloadedVolumes,
  nsmSensors,
  tableData: { data: tableData, columns: tableColumns },
  tableDataComparison: { data: tableDataComparison, columns: tableColumnsComparison },
  tableDataUpDown: { data: tableDataUpDown, columns: tableColumnsUpDown },
  tableDataSecLabel: { data: tableDataSecLabel, columns: tableColumnsSecLabel },
};
