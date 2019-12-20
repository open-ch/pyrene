import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'tuktuktwo';
import TooltipLegendItem from './TooltipLegendItem';
import styles from './tooltip.css';

/**
 * Tooltip
 */
const Tooltip = ({
  data, label, left, top, overflow,
}) => (
  <TooltipWrapper left={left} top={top} overflow={overflow}>
    <div className={styles.tooltip}>
      <div className={styles.label}>{label}</div>
      {
        data.map((e) => <TooltipLegendItem key={e.dataLabel ? e.dataLabel : e.dataValue} dataColor={e.dataColor} dataLabel={e.dataLabel} dataValue={e.dataValue} />)
      }
    </div>
  </TooltipWrapper>
);

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  data: [],
  label: '',
  overflow: false,
};

Tooltip.propTypes = {

  data: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The color of the data series
     */
    dataColor: PropTypes.string,

    /**
     * The label of the data series
     */
    dataLabel: PropTypes.string,

    /**
     * The actual value of the data series
     */
    dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })),

  /**
   * The label of the data series
   */
  label: PropTypes.string,

  /**
   * Sets the left absolute position, controlled by VX
   */
  left: PropTypes.number.isRequired,

  /**
   * If set, allows the tooltip to overflow its parent's boundaries. Otherwise will flip left/right and bottom/up to stay in the boundaries.
   */
  overflow: PropTypes.bool,

  /**
   * Sets the top absolute position, controlled by VX
   */
  top: PropTypes.number.isRequired,
};

export default Tooltip;
