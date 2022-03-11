import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import BarChart from './BarChart';

import { applications, stacked } from '../../examples/barData';
import { getSITickValue, getSIUnit } from '../../common/Formats';
import colorSchemes from '../../styles/colorSchemes';

type BarChartProps = ComponentProps<typeof BarChart>;

export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
} as Meta;

const Template: Story<BarChartProps> = (args) => (
  <BarChart
    {...args}
    colorScheme={args.colorScheme?.categorical ? args.colorScheme : colorSchemes.colorSchemeDefault}
  />
);

const VerticalTemplate: Story<BarChartProps> = (args) => {
    const data = applications.data.map((d) => ({
      label: d.label,
      data: d.data.map((e) => e * 100),
    }));
    return (
      <BarChart
        data={data}
        tickFormat={(value) => getSITickValue(value, data)}
        title="Applications"
        description="Optional description and explanation on how to read the chart"
        legend={applications.legend}
        direction={args.direction}
        unit={getSIUnit(data, 'B')}
      />
    );
};

const HorizontalTemplate: Story<BarChartProps> = (args) => (
  <BarChart
    {...args}
    colorScheme={args.colorScheme?.categorical ? args.colorScheme : colorSchemes.colorSchemeDefault}
  />
);

const StackedVerticalTemplate: Story<BarChartProps> = (args) => (
  <BarChart
    {...args}
    colorScheme={args.colorScheme?.categorical ? args.colorScheme : colorSchemes.colorSchemeDefault}
  />
);

const StackedHorizontalTemplate: Story<BarChartProps> = (args) => (
  <BarChart
    {...args}
    colorScheme={args.colorScheme?.categorical ? args.colorScheme : colorSchemes.colorSchemeDefault}
  />
);

export const Simple = Template.bind({});

Simple.args = {
  data: applications.data,
  error: 'There was an error while loading data.',
  title: 'Top Applications by Volume',
  description: 'A vertical bar chart',
  legend: applications.legend,
  tickFormat: (value: number) => getSITickValue(value, applications.data),
  tooltipFormat: (d: any) => d,
  unit: getSIUnit(applications.data, 'B'),
};

export const VerticalBarChart = VerticalTemplate.bind({});
VerticalBarChart.args = {
  data: applications.data,
  tickFormat: (value: number) => getSITickValue(value, applications.data),
  title: "Applications",
  description: "Optional description and explanation on how to read the chart",
  legend: applications.legend,
  direction: "vertical",
  unit: getSIUnit(applications.data, 'B'),

};

export const HorizontalBarChart = HorizontalTemplate.bind({});
HorizontalBarChart.args = {
  data: applications.data,
  title: "Applications",
  description: "Optional description and explanation on how to read the chart",
  legend: applications.legend,
  direction: "horizontal",
};

export const VerticalStackedBarChart = StackedVerticalTemplate.bind({});
VerticalStackedBarChart.args = {
  data: stacked.data,
  title: "Vertical Stacked Bar Chart",
  description: "Optional description and explanation on how to read the chart",
  legend: stacked.legend,
  direction: "vertical",
};

export const HorizontalStackedChart = StackedHorizontalTemplate.bind({});
HorizontalStackedChart. args ={
  data: stacked.data,
  title: "Horizontal Stacked Bar Chart",
  description: "Optional description and explanation on how to read the chart",
  legend: stacked.legend,
  direction: "horizontal",
};
