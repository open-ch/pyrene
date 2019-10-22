import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Drag } from '@vx/drag';
import { scaleTime } from '@vx/scale';
import TimeZoomUtil from './TimeZoomUtil';

const MARGIN_TOP = 16;
const MARGIN_LEFT = 36;

const TOOLTIP_WIDTH = 267;
const TOOLTIP_HEIGHT = 34;
const TOOLTIP_TEXT_WIDTH = 237;

const MOUSE_TOOLTIP_OFFSET_X = 12;
const MOUSE_TOOLTIP_OFFSET_Y = 17;
const MOUSE_TOOLTIP_TEXT_OFFSET_X = 28;
const MOUSE_TOOLTIP_TEXT_OFFSET_Y = 22;

const TOOLTIP_BG_COLOR = '#454d61';
const TOOLTIP_COLOR = '#ffffff';

let dragStartX = 0;
let dragEndX = 0;
let xScale = null;

/**
 * Callback function when releasing cursor after dragging over an area.
 * @param {number}minZoomRange - The minimum supported zoom range in epoch milliseconds
 * @param {function}onZoom - The callback function
 * @private
 */
const _onDragEnd = (minZoomRange, onZoom) => {
  // Convert drag area to timestamp
  const newFrom = Math.ceil(Math.min(xScale(dragStartX), xScale(dragEndX)));
  const newTo = Math.floor(Math.max(xScale(dragStartX), xScale(dragEndX)));
  const boundedTimeRange = TimeZoomUtil.getBoundedZoomInRange(newFrom, newTo, minZoomRange);

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
  return ((x + dx < MARGIN_LEFT) && Math.abs(dx) > maxWidthLeft) ? maxWidthLeft : Math.abs(dx);
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
  return (x + dx) < MARGIN_LEFT ? MARGIN_LEFT : (x + dx);
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
 * Returns the timezone-aware tooltip data in the correct format.
 * @param {number}x - The initial x-coordinate of the cursor
 * @param {number}dx - The difference between the current and initial x-coordinate of the cursor
 * @param {string}timezone - The current timezone
 * @returns {string}
 * @private
 */
const _getTooltipData = (x, dx, timezone) => {
  const from = Math.ceil(xScale(Math.min(x, x + dx)));
  const to = Math.floor(xScale(Math.max(x, x + dx)));
  return `${moment.tz(from, timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(to, timezone).format('DD.MM.YYYY, HH:mm')}`;
};

/**
 * TimeSeriesZoomable provides the functionality of dragging over an area on a pyrene graph to zoom in the selected time range.
 */
const TimeSeriesZoomable = (props) => {
  const cursorChange = !TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange);

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
    domain: [MARGIN_LEFT, props.width + MARGIN_LEFT],
  });

  return (
    <g style={cursorChange ? { cursor: 'col-resize' } : {}}>
      <Drag
        width={props.width}
        height={props.height}
        onDragStart={({ x, y }) => {
          dragStartX = x;
        }}
        onDragMove={() => {}}
        onDragEnd={({ x, y, dx, dy }) => {
          dragEndX = x + dx;
          _onDragEnd(props.minZoomRange, props.onZoom);
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
          const maxWidthLeft = x - MARGIN_LEFT;
          return (
            <g>
              {/* Draw rectangle */}
              {isDragging && (
                <g>
                  <rect
                    fill="#1d273b"
                    opacity={0.25}
                    width={_getZoomRectWidth(x, dx, maxWidthLeft)}
                    height={props.height}
                    x={_getZoomRectX(x, dx)}
                    y={MARGIN_TOP}
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Display the tooltip */}
                  <svg shapeRendering="geometricPrecision">
                    <g>
                      <rect
                        x={_getTooltipX(x, dx, props.width)}
                        y={_getTooltipY(y, dy, props.height + MARGIN_TOP)}
                        fill={TOOLTIP_BG_COLOR}
                        width={TOOLTIP_WIDTH}
                        height={TOOLTIP_HEIGHT}
                        rx={2}
                        ry={2}
                      />
                      <text
                        x={_getTooltipTextX(x, dx, props.width)}
                        y={_getTooltipTextY(y, dy, props.height + MARGIN_TOP)}
                        fill={TOOLTIP_COLOR}
                        style={{ ...tooltipStyle }}
                      >
                        {_getTooltipData(x, dx, props.timezone)}
                      </text>
                    </g>
                  </svg>
                </g>
              )}
              {/* Define the drawing area for zoom */}
              <rect
                y={MARGIN_TOP}
                x={MARGIN_LEFT}
                fill="transparent"
                width={props.width > 0 ? props.width : 0}
                height={props.height > 0 ? props.height : 0}
                onMouseDown={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragStart}
                onMouseUp={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragEnd}
                onMouseMove={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragMove}
                onTouchStart={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragStart}
                onTouchEnd={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragEnd}
                onTouchMove={TimeZoomUtil.minZoomRangeReached(props.from, props.to, props.minZoomRange) ? () => {} : dragMove}
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
   * Sets the width of the zoomable canvas.
   */
  width: PropTypes.number.isRequired,
  /**
   * Sets the height of the zoomable canvas.
   */
  height: PropTypes.number.isRequired,
  /**
   * Sets the starting time point in epoch milliseconds.
   */
  from: PropTypes.number.isRequired,
  /**
   * Sets the ending time point in epoch milliseconds.
   */
  to: PropTypes.number.isRequired,
  /**
   * Sets the lower bound of the starting time point in epoch milliseconds.
   */
  lowerBound: PropTypes.number.isRequired,
  /**
   * Sets the upper bound of the ending time point in epoch milliseconds.
   */
  upperBound: PropTypes.number.isRequired,
  /**
   * Sets the minimum supported zoom range in epoch milliseconds.
   */
  minZoomRange: PropTypes.number.isRequired,
  /**
   * Sets the callback function for drag to zoom.
   */
  onZoom: PropTypes.func.isRequired,
  /**
   * Sets the time zone.
   */
  timezone: PropTypes.string.isRequired,
};

export default TimeSeriesZoomable;
