import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './timeSeriesZoomable.css';
import { checkZoomInBound, minZoomRangeReached, zoomBoundReached } from './ZoomUtil';

const _onZoomIn = (props) => {
  const zoomedInTimeRange = (props.to - props.from) * 0.25;
  const timeDiff = Math.floor(zoomedInTimeRange / 2);

  // Make sure zoom does not exceed bounds
  const boundedTimeRange = checkZoomInBound(props.from + timeDiff, props.to - timeDiff, props.minZoomRange);

  // Execute callback
  props.onZoom(boundedTimeRange.from, boundedTimeRange.to);
};

const _onZoomOut = (props) => {
  const zoomedOutTimeRange = (props.to - props.from) / 0.75;
  const zoomDiff = (zoomedOutTimeRange - (props.to - props.from)) / 2;

  // Make sure zoom does not exceed bounds
  const newFrom = (Math.floor(props.from - zoomDiff) >= props.lowerBound) ? Math.floor(props.from - zoomDiff) : props.lowerBound;
  const newTo = (Math.ceil(props.to + zoomDiff) <= props.upperBound) ? Math.ceil(props.to + zoomDiff) : props.upperBound;

  // Execute callback
  props.onZoom(newFrom, newTo);
};

const TimeSeriesZoomButtons = (props) => {
  // Very complicated check here
  const zoomInBtnState = minZoomRangeReached(props) ? '' : 'activeBtn';
  const zoomOutBtnState = zoomBoundReached(props) ? '' : 'activeBtn';
  return (
    <div styleName="zoomControls">
      <div styleName={classNames('zoomBtn', zoomInBtnState)} onClick={() => _onZoomIn(props)}>
        <div styleName="leftIconContainer">
          {props.renderZoomInBtn()}
        </div>
      </div>
      <div styleName={classNames('zoomBtn', zoomOutBtnState)} onClick={() => _onZoomOut(props)}>
        <div styleName="rightIconContainer">
          {props.renderZoomOutBtn()}
        </div>
      </div>
    </div>
  );
};

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
