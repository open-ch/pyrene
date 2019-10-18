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
    const tooltip = props => (
      <div className={styles.tooltip}>
        <div className={styles.timeTitle}>{prps.timeFormat(props.time)}</div>
        <div className={styles.dataRow}>
          <div>{TimeSeriesTooltip.seriesIndicatorCircle(props.dataColor)}</div>
          <div className={styles.dataLabel}>{props.dataLabel}</div>
          <div className={styles.data}>{props.data}</div>
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
