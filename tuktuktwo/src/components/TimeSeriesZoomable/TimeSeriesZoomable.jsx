import React from 'react';
import PropTypes from 'prop-types';
import { Drag } from '@vx/drag';
import { scaleTime } from '@vx/scale';
import chartConstants from '../../common/chartConstants';

const TOOLTIP_WIDTH = 267;
const TOOLTIP_HEIGHT = 34;
const TOOLTIP_TEXT_WIDTH = 237;

const MOUSE_TOOLTIP_OFFSET_X = 12;
const MOUSE_TOOLTIP_OFFSET_Y = 17;
const MOUSE_TOOLTIP_TEXT_OFFSET_X = 28;
const MOUSE_TOOLTIP_TEXT_OFFSET_Y = 22;

let dragStartX = 0;
let dragEndX = 0;
let xScale = null;

export const minZoomRangeReached = (from, to, minZoomRange) => to - from === minZoomRange;

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
 * @param {number}lowerBound - The lower bound of the time range in epoch milliseconds
 * @param {number}upperBound - The upper bound of the time range in epoch milliseconds
 * @param {function}onZoom - The callback function
 * @private
 */
const _onDragEnd = (minZoomRange, lowerBound, upperBound, onZoom) => {
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
 * @private
 */
const _getZoomRectWidth = (x, dx, maxWidthLeft) => {
  return ((x + dx < chartConstants.marginLeftNumerical) && Math.abs(dx) > maxWidthLeft) ? maxWidthLeft : Math.abs(dx);
};

/**
 * Returns the x-coordinate of the left side of the rectangle box.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @returns {number}
 * @private
 */
const _getZoomRectX = (x, dx) => {
  if (dx > 0) {
    return x;
  }
  // When drag direction is leftward
  return (x + dx) < chartConstants.marginLeftNumerical ? chartConstants.marginLeftNumerical : (x + dx);
};

/**
 * Returns the x-coordinate of the tooltip box.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @param {number}maxWidth - The width of the TimeSeriesZoomable canvas
 * @returns {number}
 * @private
 */
const _getTooltipX = (x, dx, maxWidth) => {
  if (x + dx + MOUSE_TOOLTIP_OFFSET_X + TOOLTIP_WIDTH > maxWidth) {
    return x + dx - MOUSE_TOOLTIP_OFFSET_X - TOOLTIP_WIDTH;
  }
  return x + dx + MOUSE_TOOLTIP_OFFSET_X;
};

/**
 * Returns the y-coordinate of the tooltip box.
 * @param {number}y - The initial y-coordinate of the cursor
 * @param {number}dy - The difference between the current and initial y-coordinate of the cursor
 * @param {number}maxHeight - The height of the TimeSeriesZoomable canvas
 * @returns {number}
 * @private
 */
const _getTooltipY = (y, dy, maxHeight) => {
  if (y + dy + MOUSE_TOOLTIP_OFFSET_Y > maxHeight) {
    return 2 * maxHeight - 3 * MOUSE_TOOLTIP_OFFSET_Y - y - dy;
  }
  return Math.abs(y + dy - MOUSE_TOOLTIP_OFFSET_Y);
};

/**
 * Returns the x-coordinate of the tooltip text.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @param {number}maxWidth - The width of the TimeSeriesZoomable canvas
 * @returns {number}
 * @private
 */
const _getTooltipTextX = (x, dx, maxWidth) => {
  if (x + dx + MOUSE_TOOLTIP_OFFSET_X + TOOLTIP_WIDTH > maxWidth) {
    return x + dx - MOUSE_TOOLTIP_TEXT_OFFSET_X - TOOLTIP_TEXT_WIDTH;
  }
  return x + dx + MOUSE_TOOLTIP_TEXT_OFFSET_X;
};

/**
 * Returns the y-coordinate of the tooltip text.
 * @param {number}y - The initial y-coordinate of the cursor
 * @param {number}dy - The difference between the current and initial y-coordinate of the cursor
 * @param {number}maxHeight - The height of the TimeSeriesZoomable canvas
 * @returns {number}
 * @private
 */
const _getTooltipTextY = (y, dy, maxHeight) => {
  if (y + dy + MOUSE_TOOLTIP_OFFSET_Y > maxHeight) {
    return 2 * maxHeight - 3 * MOUSE_TOOLTIP_OFFSET_Y - y - dy + MOUSE_TOOLTIP_TEXT_OFFSET_Y;
  }
  return Math.abs(y + dy - MOUSE_TOOLTIP_OFFSET_Y) + MOUSE_TOOLTIP_TEXT_OFFSET_Y;
};

/**
 * Returns the tooltip data in the correct format.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @param {function}tooltipFormat - The formatting function
 * @returns {string}
 * @private
 */
const _getTooltipData = (x, dx, tooltipFormat) => {
  const from = Math.ceil(xScale(Math.min(x, x + dx)));
  const to = Math.floor(xScale(Math.max(x, x + dx)));
  return tooltipFormat(from, to);
};

/**
 * TimeSeriesZoomable provides the functionality of dragging over an area on a pyrene graph to zoom in the selected time range.
 */
const TimeSeriesZoomable = (props) => {
  const zoomAreaWidth = props.width - chartConstants.marginLeftNumerical;
  const zoomAreaHeight = props.height - chartConstants.marginBottom;
  const canZoom = !minZoomRangeReached(props.from, props.to, props.minZoomRange);

  const tooltipStyle = {
    width: 237,
    height: 18,
    fontWeight: 600,
    fontSize: 13,
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
  };

  xScale = scaleTime({
    range: [props.from, props.to],
    domain: [chartConstants.marginLeftNumerical, props.width],
  });

  return (
    <g style={canZoom ? { cursor: 'col-resize' } : {}}>
      <Drag
        width={zoomAreaWidth}
        height={zoomAreaHeight}
        onDragStart={({ x, y }) => {
          dragStartX = x;
        }}
        onDragMove={() => {}}
        onDragEnd={({ x, y, dx, dy }) => {
          dragEndX = x + dx;
          _onDragEnd(props.minZoomRange, props.lowerBound, props.upperBound, props.onZoom);
        }}
        resetOnStart
      >
        {({
          x,
          y,
          dx,
          dy,
          isDragging,
          dragStart,
          dragEnd,
          dragMove,
        }) => {
          const maxWidthLeft = x - chartConstants.marginLeftNumerical;
          return (
            <g>
              {/* Draw rectangle */}
              {isDragging && (
                <g>
                  <rect
                    fill={props.color.background}
                    opacity={0.25}
                    width={_getZoomRectWidth(x, dx, maxWidthLeft)}
                    height={zoomAreaHeight}
                    x={_getZoomRectX(x, dx)}
                    y={0}
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Display the tooltip */}
                  <g>
                    <rect
                      shapeRendering="geometricPrecision"
                      x={_getTooltipX(x, dx, zoomAreaWidth)}
                      y={_getTooltipY(y, dy, zoomAreaHeight)}
                      fill={props.color.foreground}
                      width={TOOLTIP_WIDTH}
                      height={TOOLTIP_HEIGHT}
                      rx={2}
                      ry={2}
                    />
                    <text
                      x={_getTooltipTextX(x, dx, zoomAreaWidth)}
                      y={_getTooltipTextY(y, dy, zoomAreaHeight)}
                      fill={props.color.text}
                      style={{ ...tooltipStyle }}
                    >
                      {_getTooltipData(x, dx, props.tooltipFormat)}
                    </text>
                  </g>
                </g>
              )}
              {/* Define the drawing area for zoom */}
              <rect
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
            </g>
          );
        }}
      </Drag>
    </g>
  );
};

TimeSeriesZoomable.displayName = 'TimeSeriesZoomable';

TimeSeriesZoomable.propTypes = {
  /**
   * Sets the background color and text color of the zoom rectangle and tooltip.
   */
  color: PropTypes.shape({
    background: PropTypes.string,
    foreground: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
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
   * Sets the formatting function for the time range displayed in zoom tootlip.
   */
  tooltipFormat: PropTypes.func.isRequired,
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
