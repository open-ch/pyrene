/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as BarStack } from './components/Bar/BarStack';
import { default as CategoricalAxis } from './components/Axis/CategoricalAxis';
import { default as Grid } from './components/Grid/Grid';
import { default as NumericalAxis } from './components/Axis/NumericalAxis';
import { default as RelativeBar } from './components/Bar/RelativeBar';
import { default as Responsive } from './components/Misc/Responsive';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  BarStack,
  CategoricalAxis,
  Grid,
  NumericalAxis,
  RelativeBar,
  Responsive,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { BarStack };
export { CategoricalAxis };
export { Grid };
export { NumericalAxis };
export { RelativeBar };
export { Responsive };

export default Components;
