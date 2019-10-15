import React from 'react';
import PropTypes from 'prop-types';
import { Drag } from '@vx/drag';
import { scaleTime } from '@vx/scale';
import { checkZoomInBound } from './TimeSeriesZoomButtons';
import './timeSeriesZoomable.css';

const MARGIN_LEFT = 36;

let dragStartX = 0;
let dragEndX = 0;

const _onDragEnd = (props) => {
  // Convert drag area to timestamp
  const xScale = scaleTime({
    range: [props.from, props.to],
    domain: [MARGIN_LEFT, props.width + MARGIN_LEFT],
  });

  const newFrom = Math.ceil(Math.min(xScale(dragStartX), xScale(dragEndX)));
  const newTo = Math.floor(Math.max(xScale(dragStartX), xScale(dragEndX)));
  const boundedTimeRange = checkZoomInBound(newFrom, newTo, props.minZoomRange);

  // Execute callback
  props.onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

const _minZoomRangeReached = props => props.to - props.from === props.minZoomRange

const TimeSeriesDragToZoom = (props) => {
  return (
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
        return (
          <g>
            {isDragging && (
              <rect
                fill="#1d273b"
                opacity={0.25}
                width={Math.abs(dx)}
                height={props.height}
                x={dx > 0 ? x : x + dx}
                y={0}
                style={{ pointerEvents: 'none' }}
              />
            )}
            <rect
              x={MARGIN_LEFT}
              fill="transparent"
              width={props.width > 0 ? props.width : 0}
              height={props.height > 0 ? props.height : 0}
              onMouseDown={_minZoomRangeReached(props) ? () => {} : dragStart}
              onMouseUp={_minZoomRangeReached(props) ? () => {} : dragEnd}
              onMouseMove={_minZoomRangeReached(props) ? () => {} : dragMove}
              onTouchStart={_minZoomRangeReached(props) ? () => {} : dragStart}
              onTouchEnd={_minZoomRangeReached(props) ? () => {} : dragEnd}
              onTouchMove={_minZoomRangeReached(props) ? () => {} : dragMove}
            />
          </g>
        );
      }}
    </Drag>
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
};

export default TimeSeriesDragToZoom;
