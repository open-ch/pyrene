import {
  scaleBand as scaleBandVx,
  scaleLinear as scaleLinearVx,
  scaleTime as scaleTimeVx,
} from '@vx/scale';
import chartConstants from './chartConstants';

/**
 * get range depending on the direction
 * @param {number} minRange - min range in px
 * @param {number} maxRange - max range in px
 * @param {string} direction - scale direction (horizontal|vertical)
 */
const getRange = (minRange, maxRange, direction) => (direction === 'horizontal' ? [minRange, maxRange] : [maxRange - minRange, 0]);

/**
 * scale labels with equal spacing
 * @param {number} minRange - min range in px
 * @param {number} maxRange - max range in px
 * @param {array} labels - array of strings
 * @param {string} direction - scale direction (horizontal|vertical)
 */
export const scaleLabels = (minRange, maxRange, labels, direction) => (
  scaleBandVx({
    range: direction === 'horizontal' ? [minRange, maxRange] : [0, maxRange - minRange],
    domain: labels,
  })
);

/**
 * scale value linearly
 * @param {number} minDomain - min value
 * @param {number} maxDomain - max value
 * @param {number} minRange - min range in px
 * @param {number} maxRange - max range in px
 * @param {string} direction - scale direction (horizontal|vertical)
 */
export const scaleLinear = (minDomain, maxDomain, minRange, maxRange, direction) => (
  scaleLinearVx({
    range: getRange(minRange, maxRange, direction),
    domain: [minDomain, maxDomain],
  })
);

/**
 * scale time
 * @param {number} minDomain - min time as number
 * @param {number} maxDomain - max time as number
 * @param {number} minRange - min range in px
 * @param {number} maxRange - max range in px
 * @param {string} direction - scale direction (horizontal|vertical)
 */
export const scaleTime = (minDomain, maxDomain, minRange, maxRange, direction) => (
  scaleTimeVx({
    range: getRange(minRange, maxRange, direction),
    domain: [minDomain, maxDomain],
  })
);

/**
 * scale values linearly with a padding of 16px in scale direction
 * @param {object} parentSize - size object with height and width of parent component
 * @param {number} maxValue - max value
 * @param {string} direction - scale direction (horizontal|vertical)
 */
export const scaleValueInBounds = (parentSize, maxValue, direction) => {
  const minRange = direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginBottom;
  const maxRange = Math.max(chartConstants.minShapeLength, direction === 'horizontal' ? parentSize.width - chartConstants.marginMaxValueToBorder : parentSize.height - chartConstants.marginMaxValueToBorder);
  return scaleLinear(0, maxValue, minRange <= maxRange ? minRange : 0, maxRange, direction);
};

/**
 * get adjusted axis scale when using scaleValueInBounds for values
 * @param {object} parentSize - size object with height and width of parent component
 * @param {number} maxValue - max value
 * @param {string} direction - scale direction (horizontal|vertical)
 */
export const scaleValueAxis = (parentSize, maxValue, direction) => {
  const minRange = direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginBottom;
  const maxRange = Math.max(chartConstants.minShapeLength, direction === 'horizontal' ? parentSize.width : parentSize.height);
  const maxValueAdjusted = direction === 'horizontal' ? maxValue * Math.max(1, (parentSize.width / (parentSize.width - chartConstants.marginMaxValueToBorder))) : maxValue * Math.max(1, (parentSize.height / (parentSize.height - chartConstants.marginMaxValueToBorder)));
  return scaleLinear(0, maxValueAdjusted, minRange <= maxRange ? minRange : 0, maxRange, direction);
};
