/* eslint-disable react/display-name */
import React from 'react';
import { BarChart } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

const barChartHowTo = [{
  title: 'Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with one value',
  component: () => (
    <BarChart
      data={exampleData.applications}
      header="Applications"
      description="Optional description and explanation on how to read the chart"
      legend={['Volume']}
    />
  ),
}, {
  title: 'Vertical Bar Chart',
  description: 'Vertical Bar Chart with one value',
  component: () => (
    <BarChart
      data={exampleData.applications}
      header="Applications"
      description="Optional description and explanation on how to read the chart"
      legend={['Volume']}
      direction="vertical"
    />
  ),
}, {
  title: 'Stacked Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.nsmSensors}
      header="Network Security Monitoring"
      description="Optional description and explanation on how to read the chart"
      legend={['high', 'moderate', 'low']}
    />
  ),
}, {
  title: 'Stacked Vertical Bar Chart',
  description: 'Vertical Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.nsmSensors}
      header="Network Security Monitoring"
      description="Optional description and explanation on how to read the chart"
      legend={['high', 'moderate', 'low']}
      direction="vertical"
    />
  ),
}];

export default barChartHowTo;
