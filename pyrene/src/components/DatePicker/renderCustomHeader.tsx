import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

const renderCustomHeader: ReactDatePickerProps['renderCustomHeader'] = ({ date, decreaseMonth, increaseMonth }) => (
  <div>
    {/* eslint-disable-next-line react/button-has-type */}
    <button
      aria-label="Previous Month"
      className="react-datepicker__navigation react-datepicker__navigation--previous"
      onClick={decreaseMonth}
    >
      <span className="pyreneIcon-chevronLeft" />
    </button>
    <span className="react-datepicker__current-month">
      {date.toLocaleString('en-US', { month: 'long' })}
      &nbsp;
      <span className="pyrene__current-year">
        {date.toLocaleString('en-US', { year: 'numeric' })}
      </span>
    </span>
    {/* eslint-disable-next-line react/button-has-type */}
    <button
      aria-label="Next Month"
      className="react-datepicker__navigation react-datepicker__navigation--next"
      onClick={increaseMonth}
    >
      <span className="pyreneIcon-chevronRight" />
    </button>
  </div>
);

export default renderCustomHeader;
