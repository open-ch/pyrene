import React from 'react';
import { TTTestGraph, TimeSeriesTooltip } from 'tuktuktwo';
import styles from './timeseriesplayground.css';

/**
 * Temporary code to display time series features in kitchensink
 */
export default class TimeSeriesPlayground extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    /*
      This needs to be ported into the actual graph in pyrene-graphs
     */
    const tooltip = prps => (
      <div className={styles.tooltip}>
        <div className={styles.title}>{prps.timeFormat(prps.time)}</div>
        <div className={styles.dataLine}>
          <div>{TimeSeriesTooltip.seriesIndicatorCircle(prps.dataColor)}</div>
          <div className={styles.dataLabel}>{prps.dataLabel}</div>
          <div className={styles.data}>{prps.data}</div>
        </div>
      </div>
    );

    return (
      <TTTestGraph tooltipChildren={tooltip}/>
    )
  }
}

TimeSeriesPlayground.displayName = 'TimeSeriesPlayground';

TimeSeriesPlayground.defaultProps = {
};

TimeSeriesPlayground.propTypes = {
};
