/* Color Scheme Default */

/* Chart / 1 */
const chart1Default = '#044BA2'; // Chart / 1
const chart1Swatch80Default = '#366FB5'; // Chart / 1-80
const chart1Swatch60Default = '#6893C7'; // Chart / 1-60
const chart1Swatch40Default = '#9BB7DA'; // Chart / 1-40
const chart1Swatch20Default = '#CDDBEC'; // Chart / 1-20
const chart1Swatch10Default = '#E5EDF5'; // Chart / 1-10
const chart1Swatch05Default = '#F2F6FA'; // Chart / 1-05

/* Chart / 2 */
const chart2Default = '#EFDC60'; // Chart / 2

/* Chart / 3 */
const chart3Default = '#4CD4C6'; // Chart / 3

/* Chart / 4 */
const chart4Default = '#2488D4'; // Chart / 4

/* Chart / 5 */
const chart5Default = '#81DB81'; // Chart / 5

const colorSchemeDefault = {
  categorical: [
    chart1Default,
    chart2Default,
    chart3Default,
    chart4Default,
    chart5Default,
  ],
  comparison: [
    chart1Default,
    chart1Swatch40Default,
  ],
  sequential: [
    chart1Default,
    chart1Swatch80Default,
    chart1Swatch60Default,
    chart1Swatch40Default,
    chart1Swatch20Default,
    chart1Swatch10Default,
    chart1Swatch05Default,
  ],
  valueGround: [
    chart1Default,
    chart1Swatch10Default,
  ],
};

const colorSchemes = {
  colorSchemeDefault,
};

export default colorSchemes;
