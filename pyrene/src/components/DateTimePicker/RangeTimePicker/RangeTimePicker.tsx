import React, {
  useState,
} from 'react';

import DateTimePicker from '../DateTimePicker';

import {
  convertToZoneTime,
} from '../../../utils/DateUtils';

type OnFunction = (value?: [number, number] | null) => void;

export interface RangeTimePickerProps{
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
  range?: boolean,
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
  timeZone = 'Europe/Zurich',
}: RangeTimePickerProps) => {

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [rangeTimeStamps, setRangeTimestamps] = useState<[number, number] | undefined>(undefined);

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
                onChange={(value) => (value !== undefined ? setStartDate(convertToZoneTime(value, timeZone)) : setStartDate(value))}
                timeZone={timeZone}
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
                onChange={(value) => (value !== undefined ? setEndDate(convertToZoneTime(value, timeZone)) : setEndDate(value))}
                timeZone={timeZone}
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
