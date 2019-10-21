/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as TimeSeriesTooltip } from './components/Tooltip/TimeSeriesTooltip';
import { default as TimeSeriesTooltipLegendItem } from './components/Tooltip/TimeSeriesTooltipLegendItem';
import { default as TTTestGraph } from './components/Temp/TTTestGraph';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  RelativeBar,
  TimeSeriesTooltip,
  TimeSeriesTooltipLegendItem,
  TTTestGraph,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { RelativeBar };
export { TimeSeriesTooltip };
export { TimeSeriesTooltipLegendItem };
export { TTTestGraph };

export default Components;
