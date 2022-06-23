import React, { useCallback, FunctionComponent, KeyboardEvent } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import SearchInput, { SearchInputProps } from './components/SearchInput/SearchInput';

import styles from './SearchFinder.module.css';

export interface SearchFinderProps {
  /**
   * called when searchTerm changes
   */
  onSearchTermChange: SearchInputProps['onChange'];
  /**
   * called when selectedResult changes
   */
  onSelectedResultChange: (selectedItem: number) => void;
  /**
   * input placeholder string
   */
  placeholder?: SearchInputProps['placeholder'];
  /**
   * total number of results
   */
  resultCount: number;
  /**
   * displayed in search input
   */
  searchTerm: string;
  /**
   * currently selected result, must be smaller than resultCount.
   */
  selectedResult: number;
}

/**
 * Search input area with buttons that cycle between matches.
 * Similar to ctrl+f exact search in browsers, but searching logic is custom.
 */
const SearchFinder: FunctionComponent<SearchFinderProps> = ({
  onSearchTermChange,
  searchTerm,
  resultCount,
  selectedResult,
  placeholder = '',
  onSelectedResultChange,
}: SearchFinderProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectNextResult = () => {
    if (selectedResult >= resultCount) {
      onSelectedResultChange(1);
      return;
    }
    onSelectedResultChange(selectedResult + 1);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectPreviousResult = () => {
    if (selectedResult <= 1) {
      onSelectedResultChange(resultCount);
      return;
    }
    onSelectedResultChange(selectedResult - 1);
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          selectPreviousResult();
        } else {
          selectNextResult();
        }
        e.preventDefault();
      }
    },
    [selectPreviousResult, selectNextResult]
  );

  const disableResultSelector = !searchTerm.length || resultCount < 1;

  return (
    <div className={styles.container} onKeyDown={disableResultSelector ? undefined : onKeyDown}>
      <SearchInput
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder={placeholder}
        extraActionElement={
          <div className={styles.extraElement}>
            <div className={clsx(styles.hits, { [styles.disabled]: !searchTerm.length })}>
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
          </div>
        }
      />
    </div>
  );
};

SearchFinder.displayName = 'SearchFinder';

export default SearchFinder;
