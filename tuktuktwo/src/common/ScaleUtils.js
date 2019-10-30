import { scaleBand, scaleLinear } from '@vx/scale';

export default class ScaleUtils {

  static scaleCategorical(size, labels) {
    return scaleBand({
      rangeRound: [0, size],
      domain: labels,
    });
  }

  static scaleLinear(size, maxValue, direction) {
    return scaleLinear({
      range: direction === 'horizontal' ? [0, size] : [size, 0],
      domain: [0, maxValue],
    });
  }

  static scaleCustomLinear(minDomain, maxDomain, minRange, maxRange, direction) {
    return scaleLinear({
      range: direction === 'horizontal' ? [minRange, maxRange] : [maxRange, minRange],
      domain: [minDomain, maxDomain],
    });
  }
}
