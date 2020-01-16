/* eslint-disable react/display-name */
import React from 'react';
import { BarChart } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { getSITickValue, getSIUnit } from 'pyrene-graphs/src/common/Formats';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

const barChartHowTo = [{
  title: 'Vertical Bar Chart',
  description: 'Vertical Bar Chart with one value and formatted tick labels',
  component: () => {
    const data = exampleData.applications.data.map((d) => ({
      label: d.label,
      data: d.data.map((e) => e * 100),
    }));
    return (
      <BarChart
        data={data}
        tickFormat={(value) => getSITickValue(value, data)}
        title="Applications"
        description="Optional description and explanation on how to read the chart"
        legend={exampleData.applications.legend}
        direction="vertical"
        unit={getSIUnit(data, 'B')}
      />
    );
  },
}, {
  title: 'Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with one value',
  component: () => (
    <BarChart
      data={exampleData.applications.data}
      title="Applications"
      description="Optional description and explanation on how to read the chart"
      legend={exampleData.applications.legend}
      direction="horizontal"
    />
  ),
}, {
  title: 'Stacked Vertical Bar Chart',
  description: 'Vertical Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.stacked.data}
      title="Vertical Stacked Bar Chart"
      description="Optional description and explanation on how to read the chart"
      legend={exampleData.stacked.legend}
      direction="vertical"
    />
  ),
}, {
  title: 'Stacked Horizontal Bar Chart',
  description: 'Horizontal Bar Chart with multiple values',
  component: () => (
    <BarChart
      data={exampleData.stacked.data}
      title="Horizontal Stacked Bar Chart"
      description="Optional description and explanation on how to read the chart"
      legend={exampleData.stacked.legend}
      direction="horizontal"
    />
  ),
}];

export default barChartHowTo;
