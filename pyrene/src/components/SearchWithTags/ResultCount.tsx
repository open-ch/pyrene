import clsx from 'clsx';
import React, { useMemo } from 'react';

import Icon from '../Icon/Icon';

import styles from './ResultCount.module.css';

interface ResultCountProps {
  resultCount?: number;
  selectNextResult?: () => void;
  selectPreviousResult?: () => void;
  selectedResult?: number;
  hasValue: boolean;
  clearValue: () => void;
}

function ResultCount({
  resultCount = 0,
  selectNextResult,
  selectPreviousResult,
  selectedResult = 0,
  hasValue,
  clearValue,
}: ResultCountProps): JSX.Element {
  const disableResultSelector = useMemo(
    () => resultCount < 1 || !hasValue,
    [resultCount, hasValue]
  );
  return (
    <div
      className={styles.extraElement}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div className={clsx(styles.hits, { [styles.disabled]: !hasValue })}>
        <span>{`${selectedResult}/${resultCount}`}</span>
      </div>
      <div className={styles.separator} />
      <div
        className={clsx(styles.icon, { [styles.disabled]: disableResultSelector })}
        onClick={selectPreviousResult}
      >
        <Icon
          type="standalone"
          name="chevronUp"
          color={disableResultSelector ? 'neutral100' : 'neutral500'}
        />
      </div>
      <div
        className={clsx(styles.icon, { [styles.disabled]: disableResultSelector })}
        onClick={selectNextResult}
      >
        <Icon
          type="standalone"
          name="chevronDown"
          color={disableResultSelector ? 'neutral100' : 'neutral500'}
        />
      </div>
      <div className={clsx(styles.icon, { [styles.disabled]: !hasValue })} onClick={clearValue}>
        <Icon type="standalone" name="delete" color={!hasValue ? 'neutral100' : 'neutral500'} />
      </div>
    </div>
  );
}
export default ResultCount;
