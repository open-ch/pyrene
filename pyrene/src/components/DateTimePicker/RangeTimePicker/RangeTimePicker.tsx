import React, {
  useEffect,
  useState,
} from 'react';

import DateTimePicker from '../DateTimePicker';

import {
  convertToZoneTime, getClientTimeZone,
} from '../../../utils/DateUtils';

type OnFunction = (value?: [number, number] | null) => void;

export interface RangeTimePickerProps{
  /**
   * Boolean to toggle time display
   */
  dateOnly?: boolean,
  /**
   * This is a timestamp that represents the maximum date allowed by the component
   */
  maxDateTime?: number,
  /**
   * This is a timestamp that represents the minimum date allowed by the component
   */
  minDateTime?: number,
  /**
   * Name that can be used to uniquely identify the component
   */
  name?: string,
  /**
   * This is a unix timestamp, which is the number of seconds that have elapsed since Unix epoch
   */
  timeStamps?: [number, number] | null
  /**
   * This is must be a IANA time zone string
   */
  timeZone?: string,
  /**
   * Function to handle onBlur event
   */
  onBlur?: OnFunction,
  /**
   * Function to handle onChange event
   */
  onChange: OnFunction,
}

const RangeTimePicker: React.FC<RangeTimePickerProps> = ({
  dateOnly,
  maxDateTime,
  minDateTime,
  timeZone,
}: RangeTimePickerProps) => {

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [internaltTz, setTimezone] = useState('');

  useEffect(() => {
    setTimezone(timeZone || getClientTimeZone())
  }, [timeZone])

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td style={{ height: '200px' }}>
              <DateTimePicker
                label="From"
                endDate={endDate}
                startDate={startDate}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onChange={(value) => (value !== undefined ? setStartDate(convertToZoneTime(value, internaltTz)) : setStartDate(value))}
                timeZone={internaltTz}
                dateOnly={dateOnly}
                selectStart
              />
            </td>
            <td>
              <DateTimePicker
                label="To"
                endDate={endDate}
                startDate={startDate}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onChange={(value) => (value !== undefined ? setEndDate(convertToZoneTime(value, internaltTz)) : setEndDate(value))}
                timeZone={internaltTz}
                dateOnly={dateOnly}
                selectEnd
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

RangeTimePicker.displayName = 'Range Picker Example';

export default RangeTimePicker;
