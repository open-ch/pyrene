import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './tooltip.css';

/**
 * Time series Tooltip Legend Item
 */
const TooltipLegendItem = ({ dataValue, dataColor, dataLabel }) => (
  <div className={styles.dataRow}>
    {dataColor && (
      <svg height="16" width="16">
        <circle cx="8" cy="8" r="3.5" stroke="white" strokeWidth="1" fill={dataColor} />
      </svg>
    )}
    {dataLabel && (
      <div className={styles.dataLabel}>{dataLabel}</div>
    )}
    <div className={classNames({ [styles.data]: dataColor || dataLabel, [styles.dataOnly]: !dataColor && !dataLabel })}>{dataValue}</div>
  </div>
);

TooltipLegendItem.displayName = 'TooltipLegendItem';

TooltipLegendItem.defaultProps = {
  dataColor: '',
  dataLabel: '',
};

TooltipLegendItem.propTypes = {
  dataColor: PropTypes.string,
  dataLabel: PropTypes.string,
  dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TooltipLegendItem;
