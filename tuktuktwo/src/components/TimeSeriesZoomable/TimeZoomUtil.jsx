/**
 * TimeZoomUtil provides a number of utility functions for zooming in / out a time range.
 *
 * minZoomRangeReached: Checks whether minimum zoom range has been reached
 * maxZoomRangeReached: Checks whether max zoom range has been reached
 * getBoundedZoomInRange: Returns a safely bounded time range after a zoom-in action
 * zoomInByStep: Zooms in from center 25% of the current time range and executes callback
 * zoomOutByStep: Zooms out from center 25% of the time range after zooming out and executes callback
 */
const TimeZoomUtil = {
  minZoomRangeReached: (from, to, minZoomRange) => to - from === minZoomRange,

  maxZoomRangeReached: (from, to, lowerbound, upperbound) => !(from > lowerbound && to < upperbound),

  getBoundedZoomInRange: (from, to, minZoomRange, lowerBound, upperBound) => {
    const boundedTimeRange = {
      from: from,
      to: to,
    };

    // Make sure the zoomed in time range does not exceed minimum allowed zoom range
    if (to - from < minZoomRange) {
      const zoomOverflow = minZoomRange - (to - from);
      const fromShift = Math.round(zoomOverflow / 2);
      const toShift = zoomOverflow - fromShift;
      // Extend from and to in a boundary-aware way
      if (from - fromShift < lowerBound) {
        boundedTimeRange.from = lowerBound;
        const boundedFromShift = from - lowerBound;
        boundedTimeRange.to = to + (zoomOverflow - boundedFromShift);
      } else if (to + toShift > upperBound) {
        boundedTimeRange.to = upperBound;
        const boundedToShift = upperBound - to;
        boundedTimeRange.from = from - (zoomOverflow - boundedToShift);
      } else {
        boundedTimeRange.from = from - fromShift;
        boundedTimeRange.to = to + (zoomOverflow - fromShift);
      }
    }

    return boundedTimeRange;
  },

  zoomInByStep: (from, to, minZoomRange, lowerBound, upperBound, onZoomCallback) => {
    const zoomStep = (to - from) * 0.25;
    const timeShift = Math.floor(zoomStep / 2);

    // Make sure zoom does not exceed bounds
    const boundedTimeRange = TimeZoomUtil.getBoundedZoomInRange(from + timeShift, to - timeShift, minZoomRange, lowerBound, upperBound);

    onZoomCallback(boundedTimeRange.from, boundedTimeRange.to);
  },

  zoomOutByStep: (from, to, lowerBound, upperBound, onZoomCallback) => {
    const timeRangeAfterZoom = (to - from) / 0.75;
    const timeShift = (timeRangeAfterZoom - (to - from)) / 2;

    // Make sure zoom does not exceed bounds
    const newFrom = (Math.floor(from - timeShift) >= lowerBound) ? Math.floor(from - timeShift) : lowerBound;
    const newTo = (Math.ceil(to + timeShift) <= upperBound) ? Math.ceil(to + timeShift) : upperBound;

    onZoomCallback(newFrom, newTo);
  },

};

export default TimeZoomUtil;
