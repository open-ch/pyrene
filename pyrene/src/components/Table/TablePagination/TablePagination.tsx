/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import clsx from 'clsx';
import Stepper from '../../Stepper/Stepper';
import TableSelect, { Option } from './TableSelect/TableSelect';

import styles from './tablePagination.css';

export interface TablePaginationProps<R extends unknown> {
  pages: number,
  page: number,
  data: Array<R>,
  numberOfResults: number,
  loading: boolean,
  pageSize: number,
  canNext: boolean,
  canPrevious: boolean,
  error?: string,
  onPageSizeChange: (newPage: number) => void,
  onPageChange: (page: number) => void,
  pageSizeOptions: number[],
}

const showAmountOfResults = <R extends unknown>(
  data: TablePaginationProps<R>['data'],
  numberOfResults: number,
  loading: boolean,
) => {
  if (loading) {
    return '';
  }
  const resultAmount = numberOfResults || data.length;
  return `${resultAmount === 0 ? 'No' : resultAmount} result${resultAmount === 1 ? '' : 's'} found`;
};

/* props are controlled by the parent component of react-table */

function TablePagination <R extends unknown={}>({
  pages,
  page,
  data,
  numberOfResults,
  loading,
  pageSize,
  canNext,
  canPrevious,
  error,
  onPageSizeChange,
  onPageChange,
  pageSizeOptions,
}: TablePaginationProps<R>): React.ReactElement<TablePaginationProps<R>> {
  return (
    <div className={styles.tablePagination}>
      <div className={styles.resultsCounter}>
        {showAmountOfResults(data, numberOfResults, loading)}
      </div>

      <div className={styles.separator} />

      <div className={styles.pageSizeSelectOptions}>
        <div className={styles.pageSizeSelect}>
          <TableSelect
            placeholder={`${pageSize}`}
            options={pageSizeOptions.map((e) => ({ label: `${e}`, value: `${e}` }))}
            onChange={(option: Option) => onPageSizeChange(parseInt(option?.value || '0', 10))}
            value={`${pageSize}`}
            // Use two exclamation marks to convert a value to boolean - !!props.error = true if string has a value, false if empty
            disabled={data.length === 0 || !!error}
          />
        </div>
        <div className={clsx(styles.spacer, styles.small)} />
        per page
      </div>

      <div className={styles.separator} />

      <div className={styles.pageNavigation}>
        <Stepper
          direction="left"
          disabled={!canPrevious || !!error}
          onClick={() => onPageChange(page - 1)}
          type="minimal"
        />
        <div className={clsx(styles.spacer, styles.small)} />
        <div className={clsx(styles.pageTracker, { [styles.disabled]: !!error })}>
          {pages > 0 && !error ? `${page + 1} of ${pages}` : '1 of 1'}
        </div>
        <div className={clsx(styles.spacer, styles.small)} />
        <Stepper
          direction="right"
          disabled={!canNext || !!error}
          onClick={() => onPageChange(page + 1)}
          type="minimal"
        />
      </div>
    </div>
  );
}

export default TablePagination;
