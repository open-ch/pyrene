import {
  scaleBand as scaleBandVx,
  scaleLinear as scaleLinearVx,
  scaleTime as scaleTimeVx,
} from '@vx/scale';
import chartConstants from './chartConstants';

const getRange = (minRange, maxRange, direction) => (direction === 'horizontal' ? [minRange, maxRange] : [maxRange - minRange, 0]);

export const scaleLabels = (minRange, maxRange, labels, direction) => (
  scaleBandVx({
    range: direction === 'horizontal' ? [minRange, maxRange] : [0, maxRange - minRange],
    domain: labels,
  })
);

export const scaleLinear = (minDomain, maxDomain, minRange, maxRange, direction) => (
  scaleLinearVx({
    range: getRange(minRange, maxRange, direction),
    domain: [minDomain, maxDomain],
  })
);

export const scaleTime = (minDomain, maxDomain, minRange, maxRange, direction) => (
  scaleTimeVx({
    range: getRange(minRange, maxRange, direction),
    domain: [minDomain, maxDomain],
  })
);

export const scaleValueInBounds = (parentSize, maxValue, direction) => (
  direction === 'horizontal' ? scaleLinear(0, maxValue, chartConstants.marginLeftCategorical, Math.max(0, parentSize.width - chartConstants.marginMaxValueToBorder), direction) : scaleLinear(0, maxValue, chartConstants.marginBottom, Math.max(0, parentSize.height - chartConstants.marginMaxValueToBorder), direction)
);

export const scaleValueAxis = (parentSize, maxValue, direction) => {
  const maxValueAdjusted = direction === 'horizontal' ? maxValue * (parentSize.width / (parentSize.width - chartConstants.marginMaxValueToBorder)) : maxValue * (parentSize.height / (parentSize.height - chartConstants.marginMaxValueToBorder));
  return direction === 'horizontal' ? scaleLinear(0, maxValueAdjusted, chartConstants.marginLeftCategorical, Math.max(0, parentSize.width), direction) : scaleLinear(0, maxValueAdjusted, chartConstants.marginBottom, Math.max(0, parentSize.height), direction);
};
