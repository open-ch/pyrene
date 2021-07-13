import React, { useState, FunctionComponent } from 'react';
import clsx from 'clsx';
import addMilliseconds from 'date-fns/addMilliseconds';
import subMilliseconds from 'date-fns/subMilliseconds';
import getTime from 'date-fns/getTime';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import Popover from '../Popover/Popover';
import PresetTimeRanges from '../TimeRangeSelector/PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from '../TimeRangeSelector/TimeRangeNavigationBar/TimeRangeNavigationBar';
import DatePickerMultiple from '../DatePickerMultiple/DatePickerMultiple';
import PRESET_TIME_RANGES, { TimeRange } from '../TimeRangeSelector/TimeRangeSelectorDefaultProps';
import stylesTimeRangeSelector from '../TimeRangeSelector/timeRangeSelector.css';
import styles from './datePickerRangeSelector.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerRangeSelectorProps {
  from: number,
  to: number,
  timezone: string,
  disabled?: boolean,
  dateOnly?: boolean,
  renderRightSection?: () => JSX.Element,
  presetTimeRanges?: Array<TimeRange>,
  lowerBound: number,
  upperBound: number,
  onChange: (newFrom: number, newTo: number) => void,
}

const DatePickerRangeSelector: FunctionComponent<DatePickerRangeSelectorProps> = ({
  lowerBound,
  upperBound,
  renderRightSection,
  dateOnly = false,
  disabled = false,
  presetTimeRanges = PRESET_TIME_RANGES,
  timezone,
  from,
  to,
  onChange,
}: DatePickerRangeSelectorProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>(presetTimeRanges[0]);

  const backClickHandler = () => {
    const fromDiff = subMilliseconds(from, timeRange.durationInMs);
    const toDiff = subMilliseconds(to, timeRange.durationInMs);

    const newFrom = Math.max(getTime(fromDiff), lowerBound);

    // Keep the selected timespan duration if we reach a bound
    const newTo = differenceInMilliseconds(toDiff, newFrom) < timeRange.durationInMs
      ? addMilliseconds(newFrom, timeRange.durationInMs)
      : toDiff;

    onChange(newFrom, Math.min(getTime(newTo), upperBound));
  };

  const nextClickHandler = () => {
    const fromDiff = addMilliseconds(from, timeRange.durationInMs);
    const toDiff = addMilliseconds(to, timeRange.durationInMs);

    const newTo = Math.min(getTime(toDiff), upperBound);

    // Keep the selected timespan duration if we reach a bound
    const newFrom = differenceInMilliseconds(newTo, fromDiff) < timeRange.durationInMs
      ? addMilliseconds(newTo, timeRange.durationInMs)
      : fromDiff;

    onChange(Math.max(getTime(newFrom), lowerBound), newTo);
  };

  const timeDurationClickHandlder = (newFrom: number, newTo: number, newUpperBound: number, durationInMs: number, presetId: string) => {
    setTimeRange(presetTimeRanges.find((preset) => preset.id === presetId) as TimeRange);
    onChange(newFrom, newTo);
  };

  return (
    <div className={clsx(stylesTimeRangeSelector.timeRangeSelector, { [stylesTimeRangeSelector.disabled]: disabled })}>
      <div className={stylesTimeRangeSelector['timeRangeSelector--left']}>
        <PresetTimeRanges
          disabled={disabled}
          lowerBound={lowerBound}
          onInteract={timeDurationClickHandlder}
          currentTimeRangeType={timeRange.id}
          presetTimeRanges={presetTimeRanges}
          upperBound={upperBound}
          timezone={timezone}
        />
      </div>
      <Popover
        displayPopover={isCalendarVisible}
        align="start"
        onClickOutside={() => setIsCalendarVisible(false)}
        preferredPosition={['bottom']}
        renderPopoverContent={() => (
          <div className={styles.DatePickerMultipleWrapper}>
            <DatePickerMultiple
              timezone={timezone}
              dateOnly={dateOnly}
              from={from}
              to={to}
              onChange={onChange}
              lowerBound={lowerBound}
              upperBound={upperBound}
              autoFocus
            />
          </div>
        )}
      >
        <div className={stylesTimeRangeSelector['timeRangeSelector--center']}>
          <TimeRangeNavigationBar
            disabled={disabled}
            to={to}
            from={from}
            lowerBound={lowerBound}
            onNavigateBack={backClickHandler}
            onNavigateForward={nextClickHandler}
            upperBound={upperBound}
            timezone={timezone}
            onClick={() => setIsCalendarVisible((prevState) => !prevState)}
          />
        </div>
      </Popover>
      <div className={clsx(stylesTimeRangeSelector['timeRangeSelector--right'], { [stylesTimeRangeSelector.disabled]: disabled })}>
        {renderRightSection?.()}
      </div>
    </div>
  );
};

DatePickerRangeSelector.displayName = 'DatePickerRangeSelector';

export default DatePickerRangeSelector;
