/* eslint-disable react/prop-types */
import React, { FunctionComponent } from 'react';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import getTime from 'date-fns/getTime';
import format from 'date-fns/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import ArrowSelector from './ArrowSelector/ArrowSelector';

interface TimeRangeNavigationBarProps {
  disabled?: boolean,
  from: number,
  lowerBound: number,
  onClick?: () => void,
  onNavigateBack: () => void,
  onNavigateForward: () => void,
  timezone: string,
  to: number,
  upperBound: number,
}

const renderCurrentTimeRange = (from: number, to: number, timezone: string) => {
  const localFrom = getTime(utcToZonedTime(from, timezone));
  const localTo = getTime(utcToZonedTime(to, timezone));
  const pattern = 'dd.MM.yyyy, HH:mm';

  return `${format(localFrom, pattern)} - ${format(localTo, pattern)}`;
};

const TimeRangeNavigationBar: FunctionComponent<TimeRangeNavigationBarProps> = ({
  disabled = false,
  from,
  lowerBound,
  onClick,
  onNavigateBack,
  onNavigateForward,
  timezone,
  to,
  upperBound,
}) => {
  // We should not check for milliseconds but minutes changes
  const backInactive = differenceInMinutes(from, lowerBound) <= 0;

  // We should not check for milliseconds but minutes changes
  const forwardInactive = differenceInMinutes(to, upperBound) >= 0;

  return (
    <ArrowSelector
      label={renderCurrentTimeRange(from, to, timezone)}
      onNavigateForward={onNavigateForward}
      backInactive={backInactive}
      forwardInactive={forwardInactive}
      onNavigateBack={onNavigateBack}
      disabled={disabled}
      innerWidth={248}
      onClick={onClick}
    />
  );
};

export default TimeRangeNavigationBar;
