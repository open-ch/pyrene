/* eslint-disable import/no-named-default */

import React from 'react';
import ReactDOM from 'react-dom';
import { default as BarTableExample } from './examples/pyrene-graphs/BarTable/BarTable.examples';
import { default as BarTable } from './examples/pyrene-graphs/BarTable/BarTable';

ReactDOM.render(
  <div>
    <BarTable
      columns={BarTableExample.props.columns}
      data={BarTableExample.props.data}
      title="Bar Table"
      subtitle={BarTableExample.props.subtitle}
      colorScheme={BarTableExample.props.colorScheme}
    />
    <BarTable
      columns={BarTableExample.props.columns}
      data={BarTableExample.props.data}
      title="Relative Bar Table"
      subtitle={BarTableExample.props.subtitle}
      colorScheme={BarTableExample.props.colorScheme}
      relative
    />
  </div>,
  document.getElementById('root')
);
