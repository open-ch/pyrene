/* eslint-disable import/no-named-default */

import React from 'react';
import ReactDOM from 'react-dom';
import { default as barExamples } from './examples/Bar.examples';
import { default as Bar } from './components/Bar/Bar';

const maxValue = Math.max(...barExamples);

ReactDOM.render(
  <div style={{ padding: '20px' }}>
    {barExamples.map(value => (
      <Bar
        value={value}
        maxValue={maxValue}
      />
    ))}
  </div>,
  document.getElementById('root')
);
