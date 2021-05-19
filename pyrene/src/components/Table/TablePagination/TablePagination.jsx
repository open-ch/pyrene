import React from 'react';
import clsx from 'clsx';
import Stepper from '../../Stepper/Stepper';
import TableSelect from './TableSelect/TableSelect';

import styles from './tablePagination.css';

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
  <div className={styles.tablePagination}>
    <div className={styles.resultsCounter}>
      {showAmountOfResults(props.data, props.numberOfResults, props.loading)}
    </div>

    <div className={styles.separator} />

    <div className={styles.pageSizeSelectOptions}>
      <div className={styles.pageSizeSelect}>
        <TableSelect
          placeholder={`${props.pageSize}`}
          options={props.pageSizeOptions.map((e) => ({ label: `${e}`, value: `${e}` }))}
          onChange={(e) => props.onPageSizeChange(parseInt(e.value, 10))}
          value={`${props.pageSize}`}
          // Use two exclamation marks to convert a value to boolean - !!props.error = true if string has a value, false if empty
          disabled={(!(props.data && props.data.length) || !!props.error)}
        />
      </div>
      <div className={clsx(styles.spacer, styles.small)} />
      per page
    </div>

    <div className={styles.separator} />

    <div className={styles.pageNavigation}>
      <Stepper direction="left" disabled={!props.canPrevious || !!props.error} onClick={() => props.onPageChange(props.page - 1)} type="minimal" />
      <div className={clsx(styles.spacer, styles.small)} />
      <div className={clsx(styles.pageTracker, { [styles.disabled]: !!props.error })}>
        {props.pages > 0 && !props.error ? `${props.page + 1} of ${props.pages}` : '1 of 1'}
      </div>
      <div className={clsx(styles.spacer, styles.small)} />
      <Stepper direction="right" disabled={!props.canNext || !!props.error} onClick={() => props.onPageChange(props.page + 1)} type="minimal" />
    </div>
  </div>
);

export default TablePagination;
