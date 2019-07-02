
import React from 'react';
import ReactDOM from 'react-dom';
import BarTable from './examples/BarTable/BarTable';
import examples from './examples/BarTable/BarTable.examples';

ReactDOM.render(
  <div>
    {BarTable(examples.props)}
  </div>,
  document.getElementById('root')
);
