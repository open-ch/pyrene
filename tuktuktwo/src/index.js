/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as Bars } from './components/Bar/Bars';
import { default as BarStack } from './components/Bar/BarStack';
import { default as CategoricalAxis } from './components/Axis/CategoricalAxis';
import { default as Circle } from './components/Circle/Circle';
import { default as NumericalAxis } from './components/Axis/NumericalAxis';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as Responsive } from './components/Misc/Responsive';
import { default as SparkLine } from './components/Line/SparkLine';
import { default as TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange } from './components/TimeSeriesZoomable/TimeSeriesZoomable';
import { default as TimeXAxis } from './components/Axis/TimeXAxis';
import { default as TooltipWrapper } from './components/Tooltip/TooltipWrapper';
import { default as VerticalLine } from './components/Line/VerticalLine';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  Bars,
  BarStack,
  CategoricalAxis,
  Circle,
  NumericalAxis,
  RelativeBar,
  Responsive,
  SparkLine,
  TimeSeriesZoomable,
  TimeXAxis,
  TooltipWrapper,
  VerticalLine,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { Bars };
export { BarStack };
export { CategoricalAxis };
export { Circle };
export { NumericalAxis };
export { RelativeBar };
export { Responsive };
export { SparkLine };
export { TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange };
export { TimeXAxis };
export { TooltipWrapper };
export { VerticalLine };
export { withTooltip } from '@vx/tooltip';
export { localPoint } from '@vx/event';

export { default as chartConstants } from './common/chartConstants';

export default Components;
