import React from 'react';
import chartConstants from '../../common/chartConstants';

export const getTickLabelLeftProps = (marginLeft, tickLabelColor) => () => ({
  fontSize: 10, fill: tickLabelColor, fontFamily: 'AvenirNext', textAnchor: 'start', dy: '0.325em', dx: -marginLeft,
});

export const getTickLabelBottomProps = (tickLabelColor) => () => ({
  textAnchor: 'middle', fontSize: 10, fontFamily: 'AvenirNext', fill: tickLabelColor, dy: '-0.25em',
});

export const getTickComponent = (marginLeft) => ({ formattedValue, ...tickLabelProps }) => (
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
