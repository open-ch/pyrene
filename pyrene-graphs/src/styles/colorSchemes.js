/* Chart / 1 */
const chart1 = '#044BA2'; // Chart / 1
const chart1Swatch80 = '#366FB5'; // Chart / 1-80
const chart1Swatch60 = '#6893C7'; // Chart / 1-60
const chart1Swatch40 = '#9BB7DA'; // Chart / 1-40
const chart1Swatch20 = '#CDDBEC'; // Chart / 1-20
const chart1Swatch10 = '#E5EDF5'; // Chart / 1-10
const chart1Swatch05 = '#F2F6FA'; // Chart / 1-05

/* Chart / 2 */
const chart2 = '#EFDC60'; // Chart / 2

/* Chart / 3 */
const chart3 = '#4CD4C6'; // Chart / 3

/* Chart / 4 */
const chart4 = '#2488D4'; // Chart / 4

/* Chart / 5 */
const chart5 = '#81DB81'; // Chart / 5

const categorical = [
  chart1,
  chart2,
  chart3,
  chart4,
  chart5,
];

const sequential = [
  chart1,
  chart1Swatch80,
  chart1Swatch60,
  chart1Swatch40,
  chart1Swatch20,
  chart1Swatch10,
  chart1Swatch05,
];

const comparison = [
  chart1,
  chart1Swatch40,
];

const valueGround = [
  chart1,
  chart1Swatch10,
];

const colorSchemes = {
  categorical,
  sequential,
  comparison,
  valueGround,
};

export default colorSchemes;
