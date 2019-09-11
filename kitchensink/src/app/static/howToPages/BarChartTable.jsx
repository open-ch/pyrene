/* eslint-disable react/display-name */
import React from 'react';
import { BarChartTable } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

const barChartTableHowTo = [{
  title: 'Bar Chart',
  description: 'A simple table with one column as a bar chart',
  component: () => (
    <BarChartTable
      data={exampleData.tableData.data}
      columns={exampleData.tableData.columns}
      header="Application"
      onRowDoubleClick={row => alert(row.value)}
      type="bar"
    />
  ),
}, {
  title: 'Butterfly Chart',
  description: 'A simple table with one column as a butterfly chart',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataUpDown.data}
      columns={exampleData.tableDataUpDown.columns}
      header="ISP Lines"
      description="Optional description and explanation on how to read the chart"
      onRowDoubleClick={row => alert(row.value)}
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
      header="Top Applications by Volume"
      description="Optional description and explanation on how to read the chart"
      onRowDoubleClick={row => alert(row.value)}
      type="comparison"
    />
  ),
}];

export default barChartTableHowTo;
