import React from 'react';
import { TTTestGraph } from 'tuktuktwo';
import Tooltip from '../TimeSeries/Tooltip';

/**
 * Temporary code to display time series features in kitchensink
 */
const TimeSeriesPlayground = () => (
  <TTTestGraph tooltipChildren={Tooltip} />
);

TimeSeriesPlayground.displayName = 'TimeSeriesPlayground';

TimeSeriesPlayground.defaultProps = {};

TimeSeriesPlayground.propTypes = {};

export default TimeSeriesPlayground;
