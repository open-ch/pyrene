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

export const scaleValueInBounds = (parentSize, maxValue, direction) => {
  const minRange = direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginBottom;
  const maxRange = Math.max(chartConstants.minShapeLength, direction === 'horizontal' ? parentSize.width - chartConstants.marginMaxValueToBorder : parentSize.height - chartConstants.marginMaxValueToBorder);
  return scaleLinear(0, maxValue, minRange <= maxRange ? minRange : 0, maxRange, direction);
};

export const scaleValueAxis = (parentSize, maxValue, direction) => {
  const minRange = direction === 'horizontal' ? chartConstants.marginLeftCategorical : chartConstants.marginBottom;
  const maxRange = Math.max(chartConstants.minShapeLength, direction === 'horizontal' ? parentSize.width : parentSize.height);
  const maxValueAdjusted = direction === 'horizontal' ? maxValue * Math.max(1, (parentSize.width / (parentSize.width - chartConstants.marginMaxValueToBorder))) : maxValue * Math.max(1, (parentSize.height / (parentSize.height - chartConstants.marginMaxValueToBorder)));
  return scaleLinear(0, maxValueAdjusted, minRange <= maxRange ? minRange : 0, maxRange, direction);
};
