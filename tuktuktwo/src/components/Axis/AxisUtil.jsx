/* eslint-disable react/display-name, react/prop-types */
import React from 'react';

/**
 * Get props for left tick label
 * @param {number} marginLeft - left margin
 * @param {string} tickLabelColor - tick label color
 */
export const getTickLabelLeftProps = (marginLeft, tickLabelColor) => () => ({
  fontSize: 11, fill: tickLabelColor, fontFamily: 'FiraGO', textAnchor: 'start', dy: '0.325em', dx: -marginLeft,
});

/**
 * Get props for bottom tick label
 * @param {string} tickLabelColor - tick label color
 */
export const getTickLabelBottomProps = (tickLabelColor) => () => ({
  textAnchor: 'middle', fontSize: 11, fontFamily: 'FiraGO', fill: tickLabelColor, dy: '-0.25em',
});

/**
 * Get left tick label with a padding of 4px on the right
 * @param {number} marginLeft - left margin
 */
export const getPaddedTickLabelLeft = (marginLeft) => ({ formattedValue, ...tickLabelProps }) => {
  const tickLabelHeight = 14;
  const tickLabelPadding = 4;
  return (
    <svg width={marginLeft - tickLabelPadding} height={tickLabelHeight} x={tickLabelProps.dx} y={tickLabelProps.y - tickLabelHeight / 2} dy={tickLabelProps.dy} overflow="hidden">
      <text
        fontSize={tickLabelProps.fontSize}
        fill={tickLabelProps.fill}
        fontFamily={tickLabelProps.fontFamily}
        textAnchor={tickLabelProps.textAnchor}
        y={tickLabelHeight / 2}
        dy={tickLabelProps.dy}
      >
        {formattedValue}
      </text>
    </svg>
  );
};
