import React from 'react';
import PropTypes from 'prop-types';
import { ActionBar } from 'pyrene';
import { minZoomRangeReached, getBoundedZoomInRange } from 'tuktuktwo';

/**
 * Checks whether lowerBound or upperBound has been reached, at which point no zoom-out action should be allowed.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}lowerBound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperBound - The latest quaryable ending time point in epoch milliseconds
 * @returns {boolean}
 */
const boundReached = (from, to, lowerBound, upperBound) => !(from > lowerBound && to < upperBound);

/**
 * Executes callback with the new from and to after zooming in.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @param {number}lowerBound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperBound - The latest quaryable ending time point in epoch milliseconds
 * @param onZoom - The callback function
 */
const zoomIn = (from, to, minZoomRange, lowerBound, upperBound, onZoom) => {
  const zoomStep = (to - from) * 0.25;
  const timeShift = Math.floor(zoomStep / 2);

  // Make sure zoom does not exceed bounds
  const boundedTimeRange = getBoundedZoomInRange(from + timeShift, to - timeShift, minZoomRange, lowerBound, upperBound);

  onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

/**
 * Executes callback with the new from and to after zooming out.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}lowerBound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperBound - The latest quaryable ending time point in epoch milliseconds
 * @param onZoom - The callback function
 */
const zoomOut = (from, to, lowerBound, upperBound, onZoom) => {
  const timeRangeAfterZoom = (to - from) / 0.75;
  const timeShift = (timeRangeAfterZoom - (to - from)) / 2;

  // Make sure zoom does not exceed bounds
  const newFrom = Math.max(lowerBound, Math.floor(from - timeShift));
  const newTo = Math.min(upperBound, Math.ceil(to + timeShift));

  onZoom(newFrom, newTo);
};

/**
 * TimeZoomControls consists of zoom-in and zoom-out buttons.
 *
 * Zoom-in: 25% of the current time range from center
 * Zoom-out: 25% of the time range after zooming out from center
 */
const TimeZoomControls = ({
  from,
  to,
  minZoomRange,
  lowerBound,
  upperBound,
  onZoom,
}) => {
  const zoomActions = [
    {
      iconName: 'zoomIn',
      active: !minZoomRangeReached(from, to, minZoomRange),
      onClick: () => zoomIn(from, to, minZoomRange, lowerBound, upperBound, onZoom),
    },
    {
      iconName: 'zoomOut',
      active: !boundReached(from, to, lowerBound, upperBound),
      onClick: () => zoomOut(from, to, lowerBound, upperBound, onZoom),
    },
  ];

  return (
    <ActionBar actions={zoomActions} />
  );
};

TimeZoomControls.displayName = 'TimeZoomControls';

TimeZoomControls.defaultProps = {
  onZoom: () => {},
};

TimeZoomControls.propTypes = {
  from: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  minZoomRange: PropTypes.number.isRequired,
  onZoom: PropTypes.func,
  to: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
};

export default TimeZoomControls;
