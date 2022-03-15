import React, { useEffect } from 'react';
import { useArgs } from '@storybook/client-api';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import dedent from 'ts-dedent';
import DateTimePicker, { DateTimePickerProps } from './DateTimePicker';
import { convertToZoneTime } from '../../utils/DateUtils';

export default {
  title: 'Components/Form/DateTimePicker',
  component: DateTimePicker,
} as Meta;

const defaultTimezone = 'Europe/Zurich';

// Disabling the following controls because of the way Storybook handles a Date prop
// https://github.com/storybookjs/storybook/issues/11822
const disabledArgs = {
  startDate: { table: { disable: true } },
  endDate: { table: { disable: true } },
  openDate: { table: { disable: true } },
};

/**
 * This is just for storybook, it is to see the selected values
 * in the Actions tab.
 */
interface DateRangeProps extends DateTimePickerProps {
  onRangeChange: (from: Date, to: Date) => void
}

const storyWrapper = (SimpleStory: any, { args }: any) => <div style={{ height: 400 }}><SimpleStory {...args} /></div>;

const Template: Story<DateTimePickerProps> = (args) => (
  <div>
    <DateTimePicker {...args} />
  </div>
);

const FromToTemplate: Story<DateRangeProps> = (args) => {
  const [, updateArgs] = useArgs();

  useEffect(() => {
    if (args.startDate && args.endDate) {
      args.onRangeChange(args.startDate, args.endDate);
    }
  }, [args]);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <DateTimePicker
              {...args}
              label="From"
              onChange={(value) => (value && updateArgs({ startDate: convertToZoneTime(new Date(value), args.timeZone || defaultTimezone) }))}
              timeStamp={args.startDate?.getTime()}
              selectsStart
            />
          </td>
          <td>
            <DateTimePicker
              {...args}
              label="To"
              onChange={(value) => (value && updateArgs({ endDate: convertToZoneTime(new Date(value), args.timeZone || defaultTimezone) }))}
              timeStamp={args.endDate?.getTime()}
              selectsEnd
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const SimpleDateTime = Template.bind({});
SimpleDateTime.parameters = {
  docs: {
    prepareForInline: storyWrapper,
  },
};
SimpleDateTime.argTypes = disabledArgs;

export const MinAndMaxDateTime = Template.bind({});
MinAndMaxDateTime.args = {
  dateOnly: true,
  minDateTime: 946684740000,
  maxDateTime: 1809631860000,
};
MinAndMaxDateTime.parameters = {
  docs: {
    prepareForInline: storyWrapper,
    description: {
      story: `Maximum date: ${new Date(1809631860000).toString()},  Minimum date: ${new Date(946684740000).toString()}`,
    },
  },
};
MinAndMaxDateTime.argTypes = disabledArgs;

export const MaxAndLocaleDateTime = Template.bind({});
MaxAndLocaleDateTime.args = {
  locale: 'us',
  maxDateTime: 1809631860000,
  timeStamp: 946684740000,
};
MaxAndLocaleDateTime.parameters = {
  docs: {
    prepareForInline: storyWrapper,
    description: {
      story: `Maximum date: ${new Date(1809631860000).toString()} and US locale.`,
    },
  },
};
MaxAndLocaleDateTime.argTypes = disabledArgs;

export const InvalidTimezoneDateTime = Template.bind({});
InvalidTimezoneDateTime.args = {
  disabled: true,
  timeZone: 'America/New_Yamk',
};
InvalidTimezoneDateTime.parameters = {
  docs: {
    prepareForInline: storyWrapper,
    description: {
      story: 'Invalid timezone',
    },
  },
};
InvalidTimezoneDateTime.argTypes = disabledArgs;

export const DateRange = FromToTemplate.bind({});
DateRange.args = {
  dateOnly: false,
  minDateTime: 0,
  maxDateTime: 10236782323493,
  timeZone: defaultTimezone,
  onRangeChange: (from, to) => action('Range')(from, to),
};
DateRange.parameters = {
  docs: {
    prepareForInline: storyWrapper,
    description: {
      story: dedent`
        <br>
        #### How to implement

        - Import the \`DateTimePicker\` component.
        - Create your state hooks for storing the Start Date (From) and End Date (To).
        - \`selectsStart\` and \`selectsEnd\` are props that should be set. They activate the highlighting of range days in the calendar dropdown. Visit this&nbsp;
          <a href="https://reactdatepicker.com/#example-date-range" target="_blank">link</a>
          &nbsp;for more information on this.

        `,
    },
  },
};
DateRange.argTypes = {
  ...disabledArgs,
  label: { table: { disable: true } },
};
