import React, { FunctionComponent } from 'react';
import CalendarDateSelectorDropdown from './CalendarDateSelectorDropdown';
import {
  canNavigateBackward,
  canNavigateForward,
  DateTypes,
  DateTime,
  DayMonthYear,
  getCurrentDate,
  handleDateChange,
} from './CalendarDateSelectorUtils';

import styles from './calendarDateSelector.css';
import ArrowSelector from '../TimeRangeSelector/TimeRangeNavigationBar/ArrowSelector/ArrowSelector';
import DateHelper from './DateHelper';

interface CalendarDateSelectorProps {
  isLoading?: boolean,
  lowerBound?: DayMonthYear,
  onChange?: (newDate: DayMonthYear, unit: DateTime['timeunitOption']) => void,
  renderRightSection?: () => React.ReactNode,
  timeUnit: DateTime['timeunitOption'],
  timeUnits?: DateTime['timeunitOptions'],
  upperBound?: DayMonthYear,
  value?: DayMonthYear,
}

/**
 * Component for selecting a timeUnit and a range forwards and backwards.
 *
 * 'onChange({ year: number, month: number | undefined, day: number | undefined }, timeUnit)' callback function can be registered via props, to handle range changes.
 *
 * Time units are defined as follows:
 * year, month, day
 */

const DEFAULT_LOWER_BOUND = {
  year: 2015,
  month: 1,
  day: 1,
};

const DEFAULT_TIME_UNITS = [
  DateTypes.day,
  DateTypes.month,
  DateTypes.year,
];

const CalendarDateSelector: FunctionComponent<CalendarDateSelectorProps> = ({
  timeUnit,
  onChange,
  renderRightSection,
  isLoading = false,
  lowerBound = DEFAULT_LOWER_BOUND,
  upperBound = getCurrentDate(),
  timeUnits = DEFAULT_TIME_UNITS,
  value = {
    ...getCurrentDate(),
  },
}: CalendarDateSelectorProps) => {

  const onNavigate = (value: DayMonthYear, direction: -1 | 1) => {
    const newDate = handleDateChange(value, direction, timeUnit);
    onChange?.(newDate, timeUnit);
  };

  const onSelect = (timeUnit: DateTime['timeunitOption']) => {
    onChange?.(value, timeUnit);
  };

  return (
    <div className={styles.timeUnitSelector}>
      <div className={styles['timeUnitSelector--left']}>
        <CalendarDateSelectorDropdown
          timeUnits={timeUnits}
          timeUnit={timeUnit}
          onSelect={onSelect}
          disabled={isLoading}
        />
      </div>
      <div className={styles['timeUnitSelector--center']}>
        <ArrowSelector
          label={DateHelper.formatTimeRangeText(value, timeUnit)}
          onNavigateForward={() => onNavigate(value, 1)}
          backInactive={isLoading || !canNavigateBackward(value, lowerBound, timeUnit)}
          forwardInactive={isLoading || !canNavigateForward(value, upperBound, timeUnit)}
          onNavigateBack={() => onNavigate(value, -1)}
          disabled={isLoading}
          innerWidth={136}
        />
      </div>
      <div className={styles['timeUnitSelector--right']}>
        {renderRightSection?.()}
      </div>
    </div>
  );

}

CalendarDateSelector.displayName = 'Calendar Date Selector';
