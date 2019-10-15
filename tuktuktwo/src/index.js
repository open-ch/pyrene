/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as Responsive } from './components/Misc/Responsive';
import { default as TimeSeriesDragToZoom } from './components/TimeSeriesZoomable/TimeSeriesDragToZoom';
import { default as TimeSeriesZoomButtons } from './components/TimeSeriesZoomable/TimeSeriesZoomButtons';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  RelativeBar,
  Responsive,
  TimeSeriesDragToZoom,
  TimeSeriesZoomButtons,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { RelativeBar };
export { Responsive };
export { TimeSeriesDragToZoom };
export { TimeSeriesZoomButtons };

export default Components;
