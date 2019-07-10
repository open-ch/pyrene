/* eslint-disable import/no-named-default */

import React from 'react';
import ReactDOM from 'react-dom';
import { default as barTableExamples } from './examples/pyrene-graphs/BarTable/BarTable.examples';
import { default as BarTable } from './examples/pyrene-graphs/BarTable/BarTable';

ReactDOM.render(
  <div>
    {barTableExamples.map(example => (
      <BarTable
        columns={example.props.columns}
        data={example.props.data}
        title={example.props.title}
        subtitle={example.props.subtitle}
        colorScheme={example.props.colorScheme}
        legend={example.props.legend}
        relative={example.props.relative}
      />
    ))}
  </div>,
  document.getElementById('root')
);
