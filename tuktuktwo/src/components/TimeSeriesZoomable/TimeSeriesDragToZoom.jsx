import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Drag } from '@vx/drag';
import { scaleTime } from '@vx/scale';
import { checkZoomInBound, minZoomRangeReached } from './ZoomUtil';
import './timeSeriesZoomable.css';

const MARGIN_TOP = 16;
const MARGIN_LEFT = 36;
const MOUSE_TOOLTIP_OFFSET_X = 12;
const MOUSE_TOOLTIP_OFFSET_Y = 17;
const MOUSE_TOOLTIP_TEXT_OFFSET_X = 28;
const MOUSE_TOOLTIP_TEXT_OFFSET_Y = 22;
const TOOLTIP_WIDTH = 267;
const TOOLTIP_HEIGHT = 34;
const TOOLTIP_TEXT_WIDTH = 237;
const TOOLTIP_BG_COLOR = '#454d61';
const TOOLTIP_COLOR = '#ffffff';

let dragStartX = 0;
let dragEndX = 0;
let xScale = null;

const _onDragEnd = (props) => {
  // Convert drag area to timestamp
  const newFrom = Math.ceil(Math.min(xScale(dragStartX), xScale(dragEndX)));
  const newTo = Math.floor(Math.max(xScale(dragStartX), xScale(dragEndX)));
  const boundedTimeRange = checkZoomInBound(newFrom, newTo, props.minZoomRange);

  // Execute callback
  props.onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

const _getZoomWidth = (x, dx, maxWidthLeft) => {
  return ((x + dx < MARGIN_LEFT) && Math.abs(dx) > maxWidthLeft) ? maxWidthLeft : Math.abs(dx);
};

const _getZoomX = (x, dx) => {
  if (dx > 0) {
    return x;
  }
  return (x + dx) < MARGIN_LEFT ? MARGIN_LEFT : (x + dx);
};

const _getTooltipX = (x, dx, maxWidth) => {
  if (x + dx + MOUSE_TOOLTIP_OFFSET_X + TOOLTIP_WIDTH > maxWidth) {
    return x + dx - MOUSE_TOOLTIP_OFFSET_X - TOOLTIP_WIDTH;
  }
  return x + dx + MOUSE_TOOLTIP_OFFSET_X;
};

const _getTooltipTextX = (x, dx, maxWidth) => {
  if (x + dx + MOUSE_TOOLTIP_OFFSET_X + TOOLTIP_WIDTH > maxWidth) {
    return x + dx - MOUSE_TOOLTIP_TEXT_OFFSET_X - TOOLTIP_TEXT_WIDTH;
  }
  return x + dx + MOUSE_TOOLTIP_TEXT_OFFSET_X;
};

const _getTooltipY = (y, dy, maxHeight) => {
  if (y + dy + MOUSE_TOOLTIP_OFFSET_Y > maxHeight) {
    return 2 * maxHeight - 3 * MOUSE_TOOLTIP_OFFSET_Y - y - dy;
  }
  return Math.abs(y + dy - MOUSE_TOOLTIP_OFFSET_Y);
};

const _getTooltipTextY = (y, dy, maxHeight) => {
  if (y + dy + MOUSE_TOOLTIP_OFFSET_Y > maxHeight) {
    return 2 * maxHeight - 3 * MOUSE_TOOLTIP_OFFSET_Y - y - dy + MOUSE_TOOLTIP_TEXT_OFFSET_Y;
  }
  return Math.abs(y + dy - MOUSE_TOOLTIP_OFFSET_Y) + MOUSE_TOOLTIP_TEXT_OFFSET_Y;
};

const _getTooltipData = (x, dx, timezone) => {
  const from = Math.ceil(xScale(Math.min(x, x + dx)));
  const to = Math.floor(xScale(Math.max(x, x + dx)));
  return `${moment.tz(from, timezone).format('DD.MM.YYYY, HH:mm')} - ${moment.tz(to, timezone).format('DD.MM.YYYY, HH:mm')}`;
};

const TimeSeriesDragToZoom = (props) => {
  const cursorStyle = (minZoomRangeReached(props) ? '' : 'dragArea');

  xScale = scaleTime({
    range: [props.from, props.to],
    domain: [MARGIN_LEFT, props.width + MARGIN_LEFT],
  });

  return (
    <g styleName={cursorStyle}>
      <Drag
        width={props.width}
        height={props.height}
        onDragStart={({ x, y }) => {
          dragStartX = x;
        }}
        onDragMove={({ x, y, dx, dy }) => {
          // Display tooltip
        }}
        onDragEnd={({ x, y, dx, dy }) => {
          dragEndX = x + dx;
          _onDragEnd(props);
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
                    width={_getZoomWidth(x, dx, maxWidthLeft)}
                    height={props.height}
                    x={_getZoomX(x, dx)}
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
                        styleName="tooltipText"
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
                onMouseDown={minZoomRangeReached(props) ? () => {} : dragStart}
                onMouseUp={minZoomRangeReached(props) ? () => {} : dragEnd}
                onMouseMove={minZoomRangeReached(props) ? () => {} : dragMove}
                onTouchStart={minZoomRangeReached(props) ? () => {} : dragStart}
                onTouchEnd={minZoomRangeReached(props) ? () => {} : dragEnd}
                onTouchMove={minZoomRangeReached(props) ? () => {} : dragMove}
              />
            </g>
          );
        }}
      </Drag>
    </g>
  );
};

TimeSeriesDragToZoom.displayName = 'TimeSeriesDragToZoom';

TimeSeriesDragToZoom.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
  minZoomRange: PropTypes.number.isRequired,
  onZoom: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default TimeSeriesDragToZoom;
