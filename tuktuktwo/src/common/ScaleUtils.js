import { scaleBand, scaleLinear } from '@vx/scale';

export default class ScaleUtils {

  static scaleOrdinal(minRange, maxRange, labels) {
    return scaleBand({
      range: [minRange, maxRange],
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
