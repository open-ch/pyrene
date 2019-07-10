/* eslint-disable import/no-named-default */

import React from 'react';
import ReactDOM from 'react-dom';
import { default as barTableExamples } from './examples/pyrene-graphs/BarTable/BarTable.examples';
import { default as barChartExamples } from './examples/pyrene-graphs/BarChart/BarChart.examples';
import { default as BarTable } from './examples/pyrene-graphs/BarTable/BarTable';
import { default as BarChart } from './examples/pyrene-graphs/BarChart/BarChart';

ReactDOM.render(
  <div style={{ padding: '20px' }}>
    {barTableExamples.map(example => (
      <BarTable
        key={example.props.title}
        columns={example.props.columns}
        data={example.props.data}
        title={example.props.title}
        subtitle={example.props.subtitle}
        colorScheme={example.props.colorScheme}
        legend={example.props.legend}
        relative={example.props.relative}
      />
    ))}
    {barChartExamples.map(example => (
      <BarChart
        key={example.props.title}
        keys={example.props.columns}
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
