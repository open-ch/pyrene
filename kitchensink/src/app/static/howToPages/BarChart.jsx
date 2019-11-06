/* eslint-disable react/display-name */
import React from 'react';
import { BarChart } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

const legendStacked = ['Incident', 'Emergency', 'Maintenance', 'Change', 'Installation'];

const barChartHowTo = [{
  title: 'Vertical Bar Chart',
  description: 'Vertical Bar Chart with one value and formatted tick labels',
  component: () => (
    <BarChart
      data={exampleData.applications.map((d) => ({
        label: d.label,
        values: d.values.map((e) => e * 100),
      }))}
      title="Applications"
      description="Optional description and explanation on how to read the chart"
      legend={['Volume']}
      direction="vertical"
      tickFormatNumerical={(d) => (parseFloat(d) >= 100000 ? `${parseFloat(d) / 1000}k` : d)}
    />
  ),
}, {
  title: 'Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with one value',
  component: () => (
    <BarChart
      data={exampleData.applications}
      title="Applications"
      description="Optional description and explanation on how to read the chart"
      legend={['Volume']}
      direction="horizontal"
    />
  ),
}, {
  title: 'Stacked Vertical Bar Chart',
  description: 'Vertical Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.stacked}
      title="Vertical Stacked Bar Chart"
      description="Optional description and explanation on how to read the chart"
      legend={legendStacked}
      direction="vertical"
    />
  ),
}, {
  title: 'Stacked Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.stacked}
      title="Horizontal Stacked Bar Chart"
      description="Optional description and explanation on how to read the chart"
      legend={legendStacked}
      direction="horizontal"
    />
  ),
}];

export default barChartHowTo;
