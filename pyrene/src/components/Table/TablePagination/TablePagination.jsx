import React from 'react';
import classNames from 'classnames';
import Stepper from '../../Stepper/Stepper';
import TableSelect from './TableSelect/TableSelect';

import './tablePagination.css';

const showAmountOfResults = (data, numberOfResults, loading) => {
  if (loading) {
    return '';
  }
  const resultAmount = numberOfResults || data.length;
  return `${resultAmount === 0 ? 'No' : resultAmount} result${resultAmount === 1 ? '' : 's'} found`;
};

/* eslint-disable react/prop-types */
/* props are controlled by the parent component of react-table */

const TablePagination = (props) => (
  <div styleName="tablePagination">
    <div styleName="resultsCounter">
      {showAmountOfResults(props.data, props.numberOfResults, props.loading)}
    </div>

    <div styleName="separator" />

    <div styleName="pageSizeSelectOptions">
      <div styleName="pageSizeSelect">
        <TableSelect
          placeholder={`${props.pageSize}`}
          options={props.pageSizeOptions.map((e) => ({ label: `${e}`, value: `${e}` }))}
          onChange={(e) => props.onPageSizeChange(parseInt(e.value, 10))}
          value={`${props.pageSize}`}
          // Use two exclamation marks to convert a value to boolean - !!props.error = true if string has a value, false if empty
          disabled={(!(props.data && props.data.length) || !!props.error)}
        />
      </div>
      <div styleName="spacer small" />
      per page
    </div>

    <div styleName="separator" />

    <div styleName="pageNavigation">
      <Stepper direction="left" disabled={!props.canPrevious || !!props.error} onClick={() => props.onPageChange(props.page - 1)} type="minimal" />
      <div styleName="spacer small" />
      <div styleName={classNames('pageTracker', { disabled: !!props.error })}>
        {props.pages > 0 && !props.error ? `${props.page + 1} of ${props.pages}` : '1 of 1'}
      </div>
      <div styleName="spacer small" />
      <Stepper direction="right" disabled={!props.canNext || !!props.error} onClick={() => props.onPageChange(props.page + 1)} type="minimal" />
    </div>
  </div>
);

export default TablePagination;
