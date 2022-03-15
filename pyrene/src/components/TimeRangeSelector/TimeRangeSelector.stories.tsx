import React from 'react';
import { Story } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import getTime from 'date-fns/getTime';
import subYears from 'date-fns/subYears';
import subDays from 'date-fns/subDays';
import TimeRangeSelectorComponent, {
  TimeRangeSelectorProps,
} from './TimeRangeSelector';
import Button from '../Button/Button';

const TIMEZONE = 'Europe/Zurich';
const today = new Date();

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function renderRightSection(): JSX.Element {
  return (
    <div style={wrapperStyle}>
      <Button label="Confirm" />
    </div>
  );
}

export default {
  title: 'Components/Form/TimeRangeSelector',
  component: TimeRangeSelectorComponent,
  args: {
    timezone: TIMEZONE,
    from: getTime(subDays(today, 40)),
    to: getTime(subDays(today, 10)),
    upperBound: getTime(today),
    lowerBound: getTime(subYears(today, 1)),
  },
};

const Template: Story<TimeRangeSelectorProps> = ({ onChange, ...args }) => {
  const [, updateArgs] = useArgs();
  const changeTimeRangeValue = (from: number, to: number) =>
    updateArgs({ from, to });
  return (
    <TimeRangeSelectorComponent onChange={changeTimeRangeValue} {...args} />
  );
};

export const TimeRangeSelector = Template.bind({});

export const TimeRangeDisabled = Template.bind({});
TimeRangeDisabled.args = { disabled: true };

export const TimeRangeRightSection = Template.bind({});
TimeRangeRightSection.args = { renderRightSection };
