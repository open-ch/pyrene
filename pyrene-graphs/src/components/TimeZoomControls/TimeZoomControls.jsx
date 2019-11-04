import React from 'react';
import PropTypes from 'prop-types';
import { ActionBar } from 'pyrene';
import { minZoomRangeReached, getBoundedZoomInRange } from 'tuktuktwo';

/**
 * Checks whether lowerbound or upperbound has been reached, at which point no zoom-out action should be allowed.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}lowerbound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperbound - The latest quaryable ending time point in epoch milliseconds
 * @returns {boolean}
 */
const boundReached = (from, to, lowerbound, upperbound) => !(from > lowerbound && to < upperbound);

/**
 * Executes callback with the new from and to after zooming in.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @param {number}lowerbound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperbound - The latest quaryable ending time point in epoch milliseconds
 * @param onZoom - The callback function
 */
const zoomIn = (from, to, minZoomRange, lowerbound, upperbound, onZoom) => {
  const zoomStep = (to - from) * 0.25;
  const timeShift = Math.floor(zoomStep / 2);

  // Make sure zoom does not exceed bounds
  const boundedTimeRange = getBoundedZoomInRange(from + timeShift, to - timeShift, minZoomRange, lowerbound, upperbound);

  onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

/**
 * Executes callback with the new from and to after zooming out.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}lowerbound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperbound - The latest quaryable ending time point in epoch milliseconds
 * @param onZoom - The callback function
 */
const zoomOut = (from, to, lowerbound, upperbound, onZoom) => {
  const timeRangeAfterZoom = (to - from) / 0.75;
  const timeShift = (timeRangeAfterZoom - (to - from)) / 2;

  // Make sure zoom does not exceed bounds
  const newFrom = Math.max(lowerbound, Math.floor(from - timeShift));
  const newTo = Math.min(upperbound, Math.ceil(to + timeShift));

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
  lowerbound,
  upperbound,
  onZoom,
}) => {
  const zoomActions = [
    {
      iconName: 'zoomIn',
      active: !minZoomRangeReached(from, to, minZoomRange),
      onClick: () => zoomIn(from, to, minZoomRange, lowerbound, upperbound, onZoom),
    },
    {
      iconName: 'zoomOut',
      active: !boundReached(from, to, lowerbound, upperbound),
      onClick: () => zoomOut(from, to, lowerbound, upperbound, onZoom),
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
  lowerbound: PropTypes.number.isRequired,
  minZoomRange: PropTypes.number.isRequired,
  onZoom: PropTypes.func,
  to: PropTypes.number.isRequired,
  upperbound: PropTypes.number.isRequired,
};

export default TimeZoomControls;
