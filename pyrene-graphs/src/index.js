/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */
import 'tuktuktwo/dist/tuktuktwo.css';

// Sort alphabetically to find stuff easily
import { default as BarChart } from './components/BarChart/BarChart';
import { default as BarChartTable } from './components/BarChartTable/BarChartTable';

// Sort alphabetically to find stuff easily
const Components = {
  BarChart,
  BarChartTable,
};

// Sort alphabetically to find stuff easily
export { BarChart };
export { BarChartTable };

export default Components;
