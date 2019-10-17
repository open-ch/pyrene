import { scaleBand, scaleLinear } from '@vx/scale';

export default class Utils {

  static chartHeight = 320;

  static scaleCategorical(parentSize, labels) {
    return scaleBand({
      rangeRound: [0, parentSize],
      domain: labels,
    });
  }

  static scaleLinear(parentSize, maxValue, direction) {
    return scaleLinear({
      range: direction === 'horizontal' ? [0, parentSize] : [parentSize, 0],
      domain: [0, maxValue],
    });
  }

}
