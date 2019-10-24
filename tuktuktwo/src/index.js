/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as TimeSeriesTooltipWrapper } from './components/Tooltip/TimeSeriesTooltipWrapper';
import { default as TTTestGraph } from './components/Temp/TTTestGraph';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  RelativeBar,
  TimeSeriesTooltipWrapper,
  TTTestGraph,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { RelativeBar };
export { TimeSeriesTooltipWrapper };
export { TTTestGraph };

export default Components;
