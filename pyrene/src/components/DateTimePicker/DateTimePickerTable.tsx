import React, {
  useState,
} from 'react';

import DateTimePicker from './DateTimePicker';

import {
  convertToZoneTime,
} from '../../utils/DateUtils';
import DateTimeRangeSelector from './DateTimeRangeSelector/DateTimeRangeSelector';
import Range2 from './Range2/Range2';


type OnFunction = (value?: number | [number, number] | null) => void;

export interface DateTimePickerTableProps{
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
  timeStamp?: number | [number, number] | null
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


const DateTimePickerTable: React.FC<DateTimePickerTableProps> = ({
  dateOnly,
  maxDateTime,
  minDateTime,
  timeZone = 'Europe/Zurich',
}: DateTimePickerTableProps) => {

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [rangeTimeStamps, setRangeTimestamps] = useState<[number, number] | undefined>(undefined);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>
              Testing Dateker.o.0
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <Range2
                labels={['Start', 'End']}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onChange={(value) => {
                  console.log('Range : ', value);
                  if (Array.isArray(value)) {
                    setRangeTimestamps(value);
                  } else {
                    setRangeTimestamps(undefined);
                  }
                }}
                timeStamps={rangeTimeStamps}
                timeZone={timeZone}
                dateOnly={dateOnly}
                // highlightsOn
              />
            </td>
          </tr>
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
          <tr>
            <td colSpan={2} style={{ height: '200px' }}>
              <DateTimePicker
                onChange={(value) => console.log('DPicker : ', value)}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                timeZone={timeZone}
                dateOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <DateTimeRangeSelector
                labels={['Start', 'End']}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onChange={(value) => console.log('DRangeSelector : ', value)}
                timeZone={timeZone}
                dateOnly={dateOnly}
                // highlightsOn
              />
            </td>
          </tr>
        </tbody>
      </table>

    </>
  );
};

DateTimePickerTable.displayName = 'DateTime Picker Examples';

export default DateTimePickerTable;
