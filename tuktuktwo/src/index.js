/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as Bars } from './components/Bar/Bars';
import { default as BarStack } from './components/Bar/BarStack';
import { default as CategoricalAxis } from './components/Axis/CategoricalAxis';
import { default as NumericalAxis } from './components/Axis/NumericalAxis';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as Responsive } from './components/Misc/Responsive';
import { default as TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange } from './components/TimeSeriesZoomable/TimeSeriesZoomable';
import { default as TimeXAxis } from './components/TimeXAxis/TimeXAxis';
import { default as TooltipWrapper } from './components/Tooltip/TooltipWrapper';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  Bars,
  BarStack,
  CategoricalAxis,
  NumericalAxis,
  RelativeBar,
  Responsive,
  TimeSeriesZoomable,
  TimeXAxis,
  TooltipWrapper,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { Bars };
export { BarStack };
export { CategoricalAxis };
export { NumericalAxis };
export { RelativeBar };
export { Responsive };
export { TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange };
export { TimeXAxis };
export { TooltipWrapper };
export { withTooltip } from '@vx/tooltip';
export { localPoint } from '@vx/event';

export { default as chartConstants } from './common/chartConstants';
export { default as scaleUtils } from './common/ScaleUtils';

export default Components;
