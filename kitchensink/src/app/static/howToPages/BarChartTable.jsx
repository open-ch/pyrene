/* eslint-disable react/display-name */
import React from 'react';
import { BarChartTable } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

const barChartTableHowTo = [{
  title: 'Butterfly Chart',
  description: 'A simple table with one column as a butterfly chart',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataComparison.data}
      columns={exampleData.tableDataComparison.columns}
      title="Top Applications by Volume"
      subtitle="Additional Information"
      type="butterfly"
    />
  ),
}, {
  title: 'Comparison Bar Chart',
  description: 'A simple table with one column as a comparison bar chart',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataComparison.data}
      columns={exampleData.tableDataComparison.columns}
      title="Top Applications by Volume"
      subtitle="Additional Information"
      type="comparison"
    />
  ),
}, {
  title: 'Bullet Chart',
  description: 'A simple table with one column as a bullet chart',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataComparison.data}
      columns={exampleData.tableDataComparison.columns}
      title="Top Applications by Volume"
      subtitle="Additional Information"
      type="bullet"
    />
  ),
}];

export default barChartTableHowTo;
