import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story, Meta } from '@storybook/react';
import CalendarSelector, { CalendarDateSelectorProps, DEFAULT_TIME_UNITS } from './CalendarDateSelector';
import { DayMonthYear } from './CalendarDateSelectorUtils';

export default {
  title: 'Components/Other/CalendarSelector',
  component: CalendarSelector,
} as Meta;

const Template: Story<CalendarDateSelectorProps> = (args) => {
  const [, updateArgs] = useArgs();

  const props = {
    ...args,
    onChange: (val: DayMonthYear, timeUnit: string) => updateArgs({ value: val, timeUnit: timeUnit }),
  };

  return (
    <div>
      <CalendarSelector {...props} />
    </div>
  );
};

export const Calendar = Template.bind({});

Calendar.args = {
  value: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
  timeUnit: 'month',
  timeUnits: DEFAULT_TIME_UNITS,
};
