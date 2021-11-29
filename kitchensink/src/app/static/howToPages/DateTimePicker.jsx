import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DateTimePicker, Link,
} from '@osag/pyrene/dist/pyrene.dev';
import styles from '../../../css/componentPage.css';
import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';

const description = () => {

  const datepickercode = `
  import DateTimePicker from '@osag/pyrene';
  ...
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  
  return (
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
              timeZone="Europe/Zurich"
              dateOnly={dateOnly}
              selectsStart
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
              timeZone="Europe/Zurich"
              dateOnly={dateOnly}
              selectsEnd
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
  `;

  return (
    <>
      <div className={styles.description}>
        <p>
          The DateTimePicker component allows you to select a single date or a range (i.e a From date and To date).
        </p>
        <p>
          This section is to demonstrate how you would implement a From and To DateTimePicker coupling.
        </p>
      </div>
      <div className={styles.topicContent}>
        <Paragraph title="Getting started">
          <DescriptionBox>
            <div>
              <ul>
                <li>Import the DateTimePicker component.</li>
                <li>Create your state hooks for storing the Start Date (From) and End Date (To).</li>
                <li>
                  selectsStart and selectsEnd are props that should be set. They activate the highlighting of range days in the calendar dropdown. Visit this&nbsp;
                  <Link label="link" path="https://reactdatepicker.com/#example-date-range" target="_blank" type="inline" />
                  &nbsp;for more information on this.
                </li>
              </ul>
            </div>
          </DescriptionBox>
          <CodeBox>
            {datepickercode}
          </CodeBox>
        </Paragraph>
      </div>
    </>
  );
};

const DateUsage = ({
  dateOnly,
  minDateTime,
  maxDateTime,
  timeZone,
}) => {

  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();

  return (
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
              selectsStart
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
              selectsEnd
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

DateUsage.defaultProps = {
  dateOnly: false,
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

const datetimepickerHowTo = [{
  title: 'Date Range',
  description: description(),
  component: DateUsage,
}];

export default datetimepickerHowTo;
