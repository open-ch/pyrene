import React, {
  useCallback,
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './searchFinder.css';
import Icon from '../Icon/Icon';
import SearchInput from './components/SearchInput/SearchInput';

/**
 * Search input area with buttons that cycle between matches.
 * Similar to ctrl+f exact search in browsers, but searching logic is custom.
 */
const SearchFinder = ({
  onSearchTermChange,
  searchTerm,
  resultCount,
  selectedResult,
  placeholder,
  onSelectedResultChange,
}) => {
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
    onSelectedResultChange((selectedResult - 1));
  };

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        selectPreviousResult();
      } else {
        selectNextResult();
      }
      e.preventDefault();
    }
  }, [selectPreviousResult, selectNextResult]);

  const disableResultSelector = !searchTerm.length || resultCount < 1;

  return (
    <div className={styles.container} onKeyDown={disableResultSelector ? null : onKeyDown}>
      <SearchInput
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder={placeholder}
        extraActionElement={(
          <div className={styles.extraElement}>
            <div className={clsx(styles.hits, { [styles.disabled]: !searchTerm.length })}>
              <span>
                {`${selectedResult}/${resultCount}`}
              </span>
            </div>
            <div className={styles.separator} />
            <div className={clsx(styles.icon, { [styles.disabled]: disableResultSelector })} onClick={selectPreviousResult}>
              <Icon type="standalone" name="chevronUp" color={disableResultSelector ? 'neutral100' : 'neutral500'} />
            </div>
            <div className={clsx(styles.icon, { [styles.disabled]: disableResultSelector })} onClick={selectNextResult}>
              <Icon type="standalone" name="chevronDown" color={disableResultSelector ? 'neutral100' : 'neutral500'} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

SearchFinder.displayName = 'Search Finder';

SearchFinder.defaultProps = {
  placeholder: '',
};

SearchFinder.propTypes = {
  /**
   * called when searchTerm changes
   */
  onSearchTermChange: PropTypes.func.isRequired,
  /**
   * called when selectedResult changes
   */
  onSelectedResultChange: PropTypes.func.isRequired,
  /**
   * input placeholder string
   */
  placeholder: PropTypes.string,
  /**
   * total number of results
   */
  resultCount: PropTypes.number.isRequired,
  /**
   * displayed in search input
   */
  searchTerm: PropTypes.string.isRequired,
  /**
   * currently selected result, must be smaller than resultCount.
   */
  selectedResult: PropTypes.number.isRequired,
};

export default SearchFinder;
