import React from 'react';
import clsx from 'clsx';
import Stepper from '../../Stepper/Stepper';
import TableSelect, { Option } from './TableSelect/TableSelect';

import styles from './TablePagination.module.css';

export interface TablePaginationProps<R extends unknown> {
  pages: number;
  page: number;
  numberOfResults: number;
  loading?: boolean;
  pageSize: number;
  canNext: boolean;
  canPrevious: boolean;
  error?: string;
  onPageSizeChange: (newPage: number) => void;
  pageSizeOptions: number[];
  numberOfSelected: number;
  onClearSelection: () => void;
  nextPage: () => void;
  previousPage: () => void;
}

const showAmountOfResults = (numberOfResults: number) => {
  const resultAmount = numberOfResults;
  return `${resultAmount === 0 ? 'No' : resultAmount} result${resultAmount === 1 ? '' : 's'} found`;
};

const showAmountOfSelected = (numberOfSelected: number, onClearSelection: () => void) => {
  return (
    <div className={styles.selectedCountDiv}>
      <span>{`${numberOfSelected} selected`}</span>
      <span
        className={clsx('pyreneIcon-delete', styles.clearSelectionButton)}
        onClick={onClearSelection}
      />
    </div>
  );
};
/* props are controlled by the parent component of react-table */

function TablePagination<R extends unknown = {}>({
  pages,
  page,
  numberOfResults,
  loading,
  pageSize,
  canNext,
  canPrevious,
  error,
  onPageSizeChange,
  pageSizeOptions,
  numberOfSelected,
  onClearSelection,
  nextPage,
  previousPage,
}: TablePaginationProps<R>): React.ReactElement<TablePaginationProps<R>> {
  return (
    <div className={styles.tablePagination}>
      <div className={styles.resultsCounter}>{showAmountOfResults(numberOfResults)}</div>
      <div className={styles.separator} />
      {numberOfSelected && (
        <>
          <div className={styles.resultsCounter}>
            {showAmountOfSelected(numberOfSelected, onClearSelection)}
          </div>
          <div className={styles.separator} />
        </>
      )}
      <div className={styles.pageSizeSelectOptions}>
        <div className={styles.pageSizeSelect}>
          <TableSelect
            placeholder={`${pageSize}`}
            options={pageSizeOptions.map((e) => ({
              label: `${e}`,
              value: `${e}`,
            }))}
            onChange={(option: Option) => onPageSizeChange(parseInt(option?.value || '0', 10))}
            value={`${pageSize}`}
            disabled={numberOfResults === 0 || !!error}
          />
        </div>
        <div className={clsx(styles.spacer, styles.small)} />
        per page
      </div>
      <div className={styles.pageNavigation}>
        <Stepper
          direction="left"
          disabled={!canPrevious || !!error}
          onClick={previousPage}
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
          onClick={nextPage}
          type="minimal"
        />
      </div>
    </div>
  );
}

export default TablePagination;
