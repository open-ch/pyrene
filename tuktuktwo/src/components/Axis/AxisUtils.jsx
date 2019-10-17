import React from 'react';
import Utils from '../../Utils';

export default class AxisUtils {

  static axisLeftCategorical = 102;

  static axisLeftNumerical = 36;

  static getPaddedTickComponent = (tickProps, axisWidth) => {
    const pathId = `textPath_${Utils.randomString(8)}`;
    return (
      <g>
        <defs>
          <clipPath id={pathId}>
            <rect width={axisWidth - 2} height={14} {...tickProps} />
          </clipPath>
        </defs>
        <text clipPath={`url(#${pathId})`} {...{
          ...tickProps, y: tickProps.y + 7,
        }}
        >
          {tickProps.formattedValue}
        </text>
      </g>
    );
  };

}
