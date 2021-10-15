import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DateTimePicker
} from '@osag/pyrene/dist/pyrene.dev';
import styles from '../../../css/componentPage.css';
import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../../common/PageElements/HowTo/DisplayBox/DisplayBox';


const DateUsage = ({ minDateTime, maxDateTime, dateOnly, timeZone }) => {

  const [endDate, setEndDate] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);

  const datepickercode = `

  import DateTimePicker from '@osag/pyrene';

  ...

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <DateTimePicker
                label="From"
                endDate={endDate}
                startDate={startDate}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onChange={(value) => (value && setStartDate(new Date(value)))}
                timeZone="${timeZone}"
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
                onChange={(value) => (value && setEndDate(new Date(value)))}
                timeZone="${timeZone}"
                dateOnly={dateOnly}
                selectEnd
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
  `;
  
  const datepickers = (
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
                onChange={(value) => (value && setStartDate(new Date(value)))}
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
                onChange={(value) => (value && setEndDate(new Date(value)))}
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


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>Date</div>
        <div className={styles.description}>
          <p>
            The DateTimePicker component allows you to select a single date or a range (i.e a From date and To date).
          </p>
          <p>
            This page is to document how you would implement a <strong>From</strong> and <strong>To</strong> DateTimePicker coupling.
          </p>
        </div>
        <div className={styles.topicContent}>
          <Paragraph title="Getting started">
            <DescriptionBox>
              <div>
                <ul>
                  <li>Import the DateTimePicker component.</li>
                  <li>Create your state hooks for storing the Start Date (From) and End Date (To).</li>
                  <li>selectStart and selectEnd are props that should be set. These activate the highlighting of the days when selecting the dates in the calendar dropdown.</li>
                </ul>     
              </div>
            </DescriptionBox>
            <CodeBox>
              {datepickercode}
            </CodeBox>
            <DescriptionBox>
              {'Let\'s have a look at that beauty. ✨'}
            </DescriptionBox>
            <DisplayBox>
              {datepickers}
            </DisplayBox>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};


DateUsage.defaultProps = {
  dateOnly: false,
  timeZone: '',
  minDateTime: 0,
  maxDateTime: 10236782323493,
  timeZone: 'Europe/Zurich',
};

DateUsage.propTypes = {
  dateOnly: PropTypes.bool,
  maxDateTime: PropTypes.number,
  minDateTime: PropTypes.number,
  timeZone: PropTypes.string,
};

export default DateUsage;
