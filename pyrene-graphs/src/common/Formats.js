const Formats = {
  /**
   * A replacement for d3.formatPrefix drom d3 version 3.x
   * Unfortunately I was unable to find an easy way to implement value formatting
   * using version 4. It is possible to get something like '400M' using d3.formatPrefix
   * or to determine the scale using d3.precisionPrefix but then we would still need
   * some parsing and substring replacements when building the y axis or tooltips.
   *
   * @param value
   * @returns {*}
   */
  getSIPrefixAndScale: (value) => {
    if (value > 1e+15) {
      return { prefix: 'P', scale: 1e+15 };
    }
    if (value > 1e+12) {
      return { prefix: 'T', scale: 1e+12 };
    }
    if (value > 1e+9) {
      return { prefix: 'G', scale: 1e+9 };
    }
    if (value > 1e+6) {
      return { prefix: 'M', scale: 1e+6 };
    }
    if (value > 1e+3) {
      return { prefix: 'K', scale: 1e+3 };
    }

    return { prefix: '', scale: 1 };
  },
};

export default Formats;
