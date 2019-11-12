import React from 'react';
import PropTypes from 'prop-types';
import { Drag } from '@vx/drag';
import { Group } from '@vx/group';
import { scaleTime } from '@vx/scale';
import chartConstants from '../../common/chartConstants';

let dragStartX = 0;
let dragEndX = 0;
let xScale = null;

/**
 * Checks whether the minimum supported zoom range has been reached.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @returns {boolean}
 */
export const minZoomRangeReached = (from, to, minZoomRange) => to - from === minZoomRange;

/**
 * Gets the new, bounded time range after a zoom-in action.
 * @param {number}from - The starting point of the time range in epoch milliseconds
 * @param {number}to - The ending point of the time range in epoch milliseconds
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @param {number}lowerBound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperBound - The latest quaryable ending time point in epoch milliseconds
 * @returns {{from: {number}, to: {number}}}
 */
export const getBoundedZoomInRange = (from, to, minZoomRange, lowerBound, upperBound) => {
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
};

/**
 * Callback function when releasing cursor after dragging over an area.
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @param {number}lowerBound - The oldest queryable starting time point in epoch milliseconds
 * @param {number}upperBound - The latest quaryable ending time point in epoch milliseconds
 * @param {function}onZoom - The callback function
 */
const onDragEnd = (minZoomRange, lowerBound, upperBound, onZoom) => {
  // Convert drag area to timestamp
  const newFrom = Math.ceil(Math.min(xScale(dragStartX), xScale(dragEndX)));
  const newTo = Math.floor(Math.max(xScale(dragStartX), xScale(dragEndX)));
  const boundedTimeRange = getBoundedZoomInRange(newFrom, newTo, minZoomRange, lowerBound, upperBound);

  // Execute callback
  onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

/**
 * Returns the width of the zoom rectangle box.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @param {number}maxWidthLeft - The difference between left border of the zoom canvas and the initial cursor x-coordinate
 * @returns {number}
 */
const getZoomRectWidth = (x, dx, maxWidthLeft) => (((x + dx < chartConstants.marginLeftNumerical) && Math.abs(dx) > maxWidthLeft) ? maxWidthLeft : Math.abs(dx));

/**
 * Returns the x-coordinate of the left side of the rectangle box.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @returns {number}
 */
const getZoomRectX = (x, dx) => {
  if (dx > 0) {
    return x;
  }
  // When drag direction is leftward
  return (x + dx) < chartConstants.marginLeftNumerical ? chartConstants.marginLeftNumerical : (x + dx);
};

/**
 * TimeSeriesZoomable provides the functionality of dragging over an area on a pyrene graph to zoom in the selected time range.
 */
const TimeSeriesZoomable = (props) => {
  const zoomAreaWidth = props.width - chartConstants.marginLeftNumerical;
  const zoomAreaHeight = props.height - chartConstants.marginBottom;
  const canZoom = !minZoomRangeReached(props.from, props.to, props.minZoomRange);

  xScale = scaleTime({
    range: [props.from, props.to],
    domain: [chartConstants.marginLeftNumerical, props.width],
  });

  return (
    <g style={canZoom ? { cursor: 'col-resize' } : {}}>
      <Drag
        width={zoomAreaWidth}
        height={zoomAreaHeight}
        onDragStart={({ x }) => {
          dragStartX = x;
        }}
        onDragMove={() => {}}
        onDragEnd={({ x, dx }) => {
          dragEndX = x + dx;
          onDragEnd(props.minZoomRange, props.lowerBound, props.upperBound, props.onZoom);
        }}
        resetOnStart
      >
        {({
          x,
          dx,
          isDragging,
          dragStart,
          dragEnd,
          dragMove,
        }) => {
          const maxWidthLeft = x - chartConstants.marginLeftNumerical;
          return (
            <Group>
              {/* Draw rectangle */}
              {isDragging && (
                <rect
                  fill={props.color}
                  opacity={0.25}
                  width={getZoomRectWidth(x, dx, maxWidthLeft)}
                  height={zoomAreaHeight}
                  x={getZoomRectX(x, dx)}
                  y={0}
                  style={{ pointerEvents: 'none' }}
                />
              )}
              {/* Define the drawing area for zoom */}
              <rect
                className="dragArea"
                y={0}
                x={chartConstants.marginLeftNumerical}
                fill="transparent"
                width={zoomAreaWidth > 0 ? zoomAreaWidth : 0}
                height={zoomAreaHeight > 0 ? zoomAreaHeight : 0}
                onMouseDown={canZoom ? dragStart : () => {}}
                onMouseUp={canZoom ? dragEnd : () => {}}
                onMouseMove={canZoom ? dragMove : () => {}}
                onTouchStart={canZoom ? dragStart : () => {}}
                onTouchEnd={canZoom ? dragEnd : () => {}}
                onTouchMove={canZoom ? dragMove : () => {}}
              />
            </Group>
          );
        }}
      </Drag>
    </g>
  );
};

TimeSeriesZoomable.displayName = 'TimeSeriesZoomable';

TimeSeriesZoomable.propTypes = {
  /**
   * Sets the color of the zoom rectangle.
   */
  color: PropTypes.string.isRequired,
  /**
   * Sets the starting time point in epoch milliseconds.
   */
  from: PropTypes.number.isRequired,
  /**
   * Sets the height of the zoomable canvas.
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the lower bound of the starting time point in epoch milliseconds.
   */
  lowerBound: PropTypes.number.isRequired,
  /**
   * Sets the minimum supported zoom range in epoch milliseconds.
   */
  minZoomRange: PropTypes.number.isRequired,
  /**
   * Sets the callback function for drag to zoom.
   */
  onZoom: PropTypes.func.isRequired,
  /**
   * Sets the ending time point in epoch milliseconds.
   */
  to: PropTypes.number.isRequired,
  /**
   * Sets the upper bound of the ending time point in epoch milliseconds.
   */
  upperBound: PropTypes.number.isRequired,
  /**
   * Sets the width of the zoomable canvas.
   */
  width: PropTypes.number.isRequired,
};

export default TimeSeriesZoomable;
