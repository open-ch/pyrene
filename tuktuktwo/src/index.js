/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-default */

// Sort alphabetically to find stuff easily
import { default as Bar } from './components/Bar/Bar';
import { default as RelativeBar } from './components/Bar/RelativeBar';

// Sort alphabetically to find stuff easily
const Components = {
  Bar,
  RelativeBar,
};

// Sort alphabetically to find stuff easily
export { Bar };
export { RelativeBar };

export default Components;
