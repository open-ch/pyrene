import React from 'react';
import { TTTestGraph, TimeSeriesTooltipLegendItem } from 'tuktuktwo';
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
        <div className={styles.timeTitle}>{props.timeFormat(props.time)}</div>
        <TimeSeriesTooltipLegendItem className={styles.dataRow} color={props.dataColor}
          dataLabel={props.dataLabel} dataLabelClassName={styles.dataLabel}
          dataValue={props.data} dataValueClassName={styles.data}/>
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
