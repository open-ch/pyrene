import React from 'react';
import PropTypes from 'prop-types';
import './timeSeriesZoomable.css';

export const checkZoomInBound = (from, to, minZoomRange) => {
  const boundedTimeRange = {
    from: from,
    to: to,
  };
  if (to - from < minZoomRange) {
    const timeRangeOverflow = minZoomRange - (to - from);
    const fromCompensation = Math.round(timeRangeOverflow / 2);
    boundedTimeRange.from = from - fromCompensation;
    boundedTimeRange.to = to + (timeRangeOverflow - fromCompensation);
  }
  return boundedTimeRange;
};

const _onZoomIn = (props) => {
  const zoomedInTimeRange = (props.to - props.from) * 0.25;
  const timeDiff = Math.floor(zoomedInTimeRange / 2);

  // Make sure zoom does not exceed bounds
  const boundedTimeRange = checkZoomInBound(props.from + timeDiff, props.to - timeDiff, props.minZoomRange);

  // Execute callback
  props.onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

const _onZoomOut = (props) => {
  const zoomedInTimeRange = (props.to - props.from) * 0.25;
  const zoomDiff = Math.floor(zoomedInTimeRange / 2);

  // Make sure zoom does not exceed bounds
  const newFrom = (props.from - zoomDiff >= props.lowerBound) ? (props.from - zoomDiff) : props.lowerBound;
  const newTo = (props.to + zoomDiff <= props.upperBound) ? (props.to + zoomDiff) : props.upperBound;

  // Execute callback
  props.onZoom(newFrom, newTo);
};

const TimeSeriesZoomButtons = props => (
  <div styleName="zoomControls">
    <div styleName="zoomBtn" onClick={() => _onZoomIn(props)}>
      <div styleName="leftIconContainer">
        {props.renderZoomInBtn()}
      </div>
    </div>
    <div styleName="zoomBtn" onClick={() => _onZoomOut(props)}>
      <div styleName="rightIconContainer">
        {props.renderZoomOutBtn()}
      </div>
    </div>
  </div>
);

TimeSeriesZoomButtons.displayName = 'TimeSeriesZoomButtons';

TimeSeriesZoomButtons.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  lowerBound: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
  minZoomRange: PropTypes.number.isRequired,
  onZoom: PropTypes.func.isRequired,
  renderZoomInBtn: PropTypes.func.isRequired,
  renderZoomOutBtn: PropTypes.func.isRequired,
};

export default TimeSeriesZoomButtons;
