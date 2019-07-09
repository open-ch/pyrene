/* eslint-disable import/no-named-default */

import React from 'react';
import ReactDOM from 'react-dom';
import { default as BarTableExample } from './examples/BarTable/pyrene-graphs/BarTable.examples';
import { default as BarTable } from './examples/BarTable/pyrene-graphs/BarTable';

ReactDOM.render(
  <div>
    <BarTable
      columns={BarTableExample.props.columns}
      data={BarTableExample.props.data}
      title={BarTableExample.props.title}
      colorScheme={BarTableExample.props.colorScheme}
    />
  </div>,
  document.getElementById('root')
);
