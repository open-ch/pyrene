import React, {
  useEffect,
  useState,
} from 'react';

import DateTimePicker from './DateTimePicker';

import {
  isValidTimeZone, convertToZoneTime,
} from '../../utils/DateUtils';
import DateTimeRangeSelector from './DateTimeRangeSelector/DateTimeRangeSelector';


type OnFunction = (value?: number | [number, number] | null) => void;

export interface DateTimeInputProps{
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


const DateTimePickerTable: React.FC<DateTimeInputProps> = ({
  maxDateTime,
  minDateTime,
  timeZone = 'Europe/Zurich',
}: DateTimeInputProps) => {

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);



  const [timeZoneValue, setTimeZoneValue] = useState(timeZone);

  useEffect(() => {
    if (isValidTimeZone(timeZone)) {
      setTimeZoneValue(timeZone);
    }
  }, [timeZone]);


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
              <DateTimeRangeSelector
                labels={['Start', 'End']}
                onChange={(value) => console.log('DRangeSelector : ', value)}
                timeZone={timeZone}
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
                onChange={(value) => (value !== undefined ? setStartDate(convertToZoneTime(value, timeZoneValue)) : setStartDate(value))}
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
                onChange={(value) => (value !== undefined ? setEndDate(convertToZoneTime(value, timeZoneValue)) : setEndDate(value))}
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
                dateOnly
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
