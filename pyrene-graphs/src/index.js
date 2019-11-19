/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from './components/BarChart/BarChart';
import { default as BarChartTable } from './components/BarChartTable/BarChartTable';
import { default as SparkLineChart } from './components/SparkLineChart/SparkLineChart';
import { default as TimeSeriesBucketGraph } from './components/TimeSeriesBucketGraph/TimeSeriesBucketGraph';

// Sort alphabetically to find stuff easily
const Components = {
  BarChart,
  BarChartTable,
  SparkLineChart,
  TimeSeriesBucketGraph,
};

// Sort alphabetically to find stuff easily
export { BarChart };
export { BarChartTable };
export { SparkLineChart };
export { TimeSeriesBucketGraph };

export default Components;
