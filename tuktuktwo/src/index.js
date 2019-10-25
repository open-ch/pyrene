/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as Bars } from './components/Bar/Bars';
import { default as CategoricalAxis } from './components/Axis/CategoricalAxis';
import { default as NumericalAxis } from './components/Axis/NumericalAxis';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as Responsive } from './components/Misc/Responsive';
import { default as TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange } from './components/TimeSeriesZoomable/TimeSeriesZoomable';
import { default as TimeXAxis } from './components/TimeXAxis/TimeXAxis';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  Bars,
  CategoricalAxis,
  NumericalAxis,
  RelativeBar,
  Responsive,
  TimeSeriesZoomable,
  TimeXAxis,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { Bars };
export { CategoricalAxis };
export { NumericalAxis };
export { RelativeBar };
export { Responsive };
export { TimeSeriesZoomable, minZoomRangeReached, getBoundedZoomInRange };
export { TimeXAxis };

export default Components;
