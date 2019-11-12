import { scaleBand, scaleLinear } from '@vx/scale';

export default class ScaleUtils {

  static scaleOrdinal(size, labels) {
    return scaleBand({
      rangeRound: [0, size],
      domain: labels,
    });
  }

  static scaleLinear(size, maxValue, direction) {
    return this.scaleCustomLinear(
      0, maxValue, 0, size, direction,
    );
  }

  static scaleCustomLinear(minDomain, maxDomain, minRange, maxRange, direction) {
    return scaleLinear({
      range: direction === 'horizontal' ? [minRange, maxRange] : [maxRange, minRange],
      domain: [minDomain, maxDomain],
    });
  }

}
