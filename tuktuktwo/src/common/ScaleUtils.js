import { scaleBand, scaleLinear } from '@vx/scale';

export default class ScaleUtils {

  static scaleCustomBand(domainValues, minRange, maxRange, paddingInner, paddingOuter) {
    return scaleBand({
      range: [minRange, maxRange],
      domain: domainValues,
      paddingInner: paddingInner,
      paddingOuter: paddingOuter,
    });
  }

  static scaleCustomLinear(minDomain, maxDomain, minRange, maxRange, direction) {
    return scaleLinear({
      range: direction === 'horizontal' ? [minRange, maxRange] : [maxRange, minRange],
      domain: [minDomain, maxDomain],
    });
  }

  static scaleLinear(size, maxValue, direction) {
    return this.scaleCustomLinear(
      0, maxValue, 0, size, direction,
    );
  }

  static scaleOrdinal(size, labels) {
    return this.scaleCustomBand(labels, 0, size, 0, 0);
  }

}
