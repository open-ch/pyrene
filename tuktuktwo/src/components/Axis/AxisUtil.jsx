import React from 'react';
import chartConstants from '../../common/chartConstants';

/**
 * Get props for left tick label
 * @param {number} marginLeft - left margin
 * @param {string} tickLabelColor - tick label color
 */
export const getTickLabelLeftProps = (marginLeft, tickLabelColor) => () => ({
  fontSize: 10, fill: tickLabelColor, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.325em', dx: -marginLeft,
});

/**
 * Get props for bottom tick label
 * @param {string} tickLabelColor - tick label color
 */
export const getTickLabelBottomProps = (tickLabelColor) => () => ({
  textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickLabelColor, dy: '-0.25em',
});

/**
 * Get left tick label with a padding of 4px on the right
 * @param {number} marginLeft - left margin
 */
export const getPaddedTickLabelLeft = (marginLeft) => ({ formattedValue, ...tickLabelProps }) => (
  <svg width={marginLeft - chartConstants.tickLabelPadding} height={chartConstants.tickLabelLeftHeight} x={tickLabelProps.dx} y={tickLabelProps.y - chartConstants.tickLabelLeftHeight / 2} dy={tickLabelProps.dy} overflow="hidden">
    <text
      fontSize={tickLabelProps.fontSize}
      fill={tickLabelProps.fill}
      fontFamily={tickLabelProps.fontFamily}
      textAnchor={tickLabelProps.textAnchor}
      y={chartConstants.tickLabelLeftHeight / 2}
      dy={tickLabelProps.dy}
    >
      {formattedValue}
    </text>
  </svg>
);
