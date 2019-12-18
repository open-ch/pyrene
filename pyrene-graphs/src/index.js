/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from './components/BarChart/BarChart';
import { default as BarChartTable } from './components/BarChartTable/BarChartTable';
import { default as SparkLine } from './components/SparkLine/SparkLine';
import { default as SparkLineChart } from './components/SparkLineChart/SparkLineChart';
import { default as TimeSeriesBucketChart } from './components/TimeSeriesBucketChart/TimeSeriesBucketChart';
import { default as TimeSeriesLineChart } from './components/TimeSeriesLineChart/TimeSeriesLineChart';

// Sort alphabetically to find stuff easily
const Components = {
  BarChart,
  BarChartTable,
  SparkLine,
  SparkLineChart,
  TimeSeriesBucketChart,
  TimeSeriesLineChart,
};

// Sort alphabetically to find stuff easily
export { BarChart };
export { BarChartTable };
export { SparkLine };
export { SparkLineChart };
export { TimeSeriesBucketChart };
export { TimeSeriesLineChart };

export { INDEX_START_TS, INDEX_VALUE } from './common/chartConstants';

export default Components;
