import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  tableData, tableColumns,
  tableDataUpDown, tableColumnsUpDown,
  tableDataComparison, tableColumnsComparison,
  tableDataSecLabel, tableColumnsSecLabel,
} from '../../examples/tableData';
import colorSchemes from '../../styles/colorSchemes';
import BarChartTable from './BarChartTable';

type BarChartTableProps = ComponentProps<typeof BarChartTable>;

export default {
  title: 'Components/Chart/BarChartTable',
  component: BarChartTable,
} as Meta;

const Template: Story<BarChartTableProps> = (args) => (
  <BarChartTable {...args}/>
);

export const barChartTable = Template.bind({});
barChartTable.storyName = 'Bar Chart Table';
barChartTable.args = {
  actions: [
    {
      label: 'Application',
      onClick: (rowData: any) => alert(rowData.application), // eslint-disable-line no-alert
    },
    {
      label: 'Volume',
      onClick: (rowData: any) => alert(rowData.volume), // eslint-disable-line no-alert
    },
  ],
  data: tableData,
  columns: tableColumns,
  type: 'bar',
  title: 'Applications',
  description: 'Optional description and explanation on how to read the chart',
  onRowDoubleClick: (row: any) => alert(row.volume), // eslint-disable-line no-alert
  colorScheme: colorSchemes.colorSchemeDefault,
  displayedRows: 10,
};

export const barChart = Template.bind({});
barChart.args = {
  data: tableData,
  columns: {
    label: tableColumns.label,
    primaryValue: tableColumns.primaryValue,
  },
  title: "Applications",
  onRowDoubleClick: (row: any) => alert(row.value),
  type: "bar",
};

barChart.parameters = {
  docs: {
    description: {
      story: 'A simple table with one label and one value, which is additionally rendered as bar chart.'
    }
  }
};

export const BarChartWithTwoValues = Template.bind({});
BarChartWithTwoValues.args = {
  data: tableData,
  columns: tableColumns,
  title: "Applications",
  onRowDoubleClick: (row: any) => alert(row.value),
  type: "bar",
};

BarChartWithTwoValues.parameters = {
  docs: {
    description: {
      story: 'A simple table with one label and two values. The primary value is additionally rendered as bar chart.'
    }
  }
};

export const ButterflyChart = Template.bind({});
ButterflyChart.args = {
  data: tableDataUpDown,
  columns: tableColumnsUpDown,
  title: "ISP Lines",
  description: "Optional description and explanation on how to read the chart",
  onRowDoubleClick: (row: any) => alert(row.value),
  type: "butterfly"
};

ButterflyChart.parameters = {
  docs: {
    description: {
      story: 'A simple table with one label and two values. The primary value is additionally rendered as butterfly chart.'
    }
  }
};

export const ComparisonBarChart = Template.bind({});
ComparisonBarChart.args = {
  data: tableDataComparison,
  columns: tableColumnsComparison,
  title: "Top Applications by Volume",
  description: "Optional description and explanation on how to read the chart",
  onRowDoubleClick: (row: any) => alert(row.value),
  type: "comparison",
};

ComparisonBarChart.parameters = {
  docs: {
    description: {
      story: 'A simple table with one label and two values, which are additionally rendered as comparison chart.'
    }
  }
};

export const BarChartWithSecondaryLabel = Template.bind({});
BarChartWithSecondaryLabel.args = {
  data: tableDataSecLabel,
  columns: tableColumnsSecLabel,
  title: "Applications",
  description: "Optional description and explanation on how to read the chart",
  type: "bar",
};

BarChartWithSecondaryLabel.parameters = {
  docs: {
    description: {
      story: 'A simple bar chart with a secondary Label'
    }
  }
};
