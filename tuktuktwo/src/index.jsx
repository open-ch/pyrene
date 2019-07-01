
import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from './examples/barChart';
import AreaClosedCustom from './examples/AreaClosed';
import TableChart from './examples/TableChart/TableChart';

ReactDOM.render(
  <div>
    {/* <BarChart />
    <AreaClosedCustom fillColor="red" /> */}
    <TableChart />
  </div>,
  document.getElementById('root')
);
