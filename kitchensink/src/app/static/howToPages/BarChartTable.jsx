/* eslint-disable react/display-name */
import React from 'react';
import { BarChartTable } from 'pyrene-graphs/dist/pyrene-graphs.dev';
import { exampleData } from 'pyrene-graphs/dist/pyrene-graphs.examples';

/* eslint-disable no-alert */

const barChartTableHowTo = [{
  title: 'Bar Chart',
  description: 'A simple table with one label and one value, which is additionally rendered as bar chart.',
  component: () => (
    <BarChartTable
      data={exampleData.tableData.data}
      columns={{
        label: exampleData.tableData.columns.label,
        primaryValue: exampleData.tableData.columns.primaryValue,
      }}
      title="Applications"
      onRowDoubleClick={(row) => alert(row.value)}
      type="bar"
    />
  ),
}, {
  title: 'Bar Chart with two values',
  description: 'A simple table with one label and two values. The primary value is additionally rendered as bar chart.',
  component: () => (
    <BarChartTable
      data={exampleData.tableData.data}
      columns={exampleData.tableData.columns}
      title="Applications"
      onRowDoubleClick={(row) => alert(row.value)}
      type="bar"
    />
  ),
}, {
  title: 'Butterfly Chart',
  description: 'A simple table with one label and two values. The primary value is additionally rendered as butterfly chart.',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataUpDown.data}
      columns={exampleData.tableDataUpDown.columns}
      title="ISP Lines"
      description="Optional description and explanation on how to read the chart"
      onRowDoubleClick={(row) => alert(row.value)}
      type="butterfly"
    />
  ),
}, {
  title: 'Comparison Bar Chart',
  description: 'A simple table with one label and two values, which are additionally rendered as comparison chart.',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataComparison.data}
      columns={exampleData.tableDataComparison.columns}
      title="Top Applications by Volume"
      description="Optional description and explanation on how to read the chart"
      onRowDoubleClick={(row) => alert(row.value)}
      type="comparison"
    />
  ),
}, {
  title: 'Bar Chart with secondary label',
  description: 'A simple bar chart with a secondary Label',
  component: () => (
    <BarChartTable
      data={exampleData.tableDataSecLabel.data}
      columns={exampleData.tableDataSecLabel.columns}
      title="Applications"
      description="Optional description and explanation on how to read the chart"
      type="bar"
    />
  ),
}];

export default barChartTableHowTo;
