/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as BarChart } from './components/BarChart/BarChart';
import { default as BarChartTable } from './components/BarChartTable/BarChartTable';
import { default as TimeSeriesBucketGraph } from './components/TimeSeriesBucketGraph/TimeSeriesBucketGraph';
import { default as TimeSeriesBucketGraphDemo } from './components/TimeSeriesBucketGraph/TimeSeriesBucketGraphDemo';

// Sort alphabetically to find stuff easily
const Components = {
  BarChart,
  BarChartTable,
  TimeSeriesBucketGraph,
  TimeSeriesBucketGraphDemo,
};

// Sort alphabetically to find stuff easily
export { BarChart };
export { BarChartTable };
export { TimeSeriesBucketGraph };
export { TimeSeriesBucketGraphDemo };

export default Components;
