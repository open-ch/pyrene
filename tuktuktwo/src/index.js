/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as TooltipWrapper } from './components/Tooltip/TooltipWrapper';


// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  RelativeBar,
  TooltipWrapper,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { RelativeBar };
export { TooltipWrapper };
export { withTooltip } from '@vx/tooltip';

export default Components;
