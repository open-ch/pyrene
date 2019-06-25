
import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './examples/barChart';
import AreaClosedCustom from './examples/AreaClosed';

ReactDOM.render(
  <div>
    <BarChart />
    <AreaClosedCustom fillColor="red" />
  </div>,
  document.getElementById('root')
);
