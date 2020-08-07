import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './quickSearch.css';
import Icon from '../Icon/Icon';
import SearchInput from '../SearchInput/SearchInput';

const MIN_TERM_LENGTH = 3;

/**
 * Search Input area with suggestion tooltip and cycling between matches.
 * Similar to ctrl+f exact search in browsers, but searching logic can be custom.
 */
const QuickSearch = ({
  zIndexTooltip,
  onTermChange,
  term,
  suggestions,
  resultCount,
  currentResult,
  onSelectedResultChange,
  enableSuggestions,
}) => {
  const [hideTooltip, setHideTooltip] = useState(false);
  const inputAreaRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedSuggestionI, setSelectedSuggestionI] = useState(-1);

  const flattenedSuggestions = useMemo(() => suggestions.reduce((flat, suggestion) => [...flat, ...suggestion.members], []), [suggestions]);
  const selectedSuggestion = useMemo(() => flattenedSuggestions[selectedSuggestionI], [selectedSuggestionI]);

  const selectNextResult = () => {
    if (currentResult === resultCount) {
      onSelectedResultChange(1);
      return;
    }
    onSelectedResultChange(currentResult + 1);
  };
  const selectPreviousResult = () => {
    if (currentResult === 1) {
      onSelectedResultChange(resultCount);
      return;
    }
    onSelectedResultChange((currentResult - 1));
  };
  const selectNextSuggestion = () => {
    if (selectedSuggestionI === flattenedSuggestions.length - 1) {
      setSelectedSuggestionI(0);
      return;
    }
    setSelectedSuggestionI(selectedSuggestionI + 1);
  };
  const selectPreviousSuggestion = () => {
    if (selectedSuggestionI === 0) {
      setSelectedSuggestionI(flattenedSuggestions.length - 1);
      return;
    }
    setSelectedSuggestionI(selectedSuggestionI - 1);
  };

  const onClickOutside = useCallback((e) => {
    if (!inputAreaRef.current || !tooltipRef.current) {
      return;
    }
    const clickedInside = inputAreaRef.current.contains(e.target) || tooltipRef.current.contains(e.target);
    if (!clickedInside && !hideTooltip) {
      setHideTooltip(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const onInputChange = useCallback((value) => {
    if (hideTooltip) {
      setHideTooltip(false);
    }
    onTermChange(value);
  }, [onTermChange, hideTooltip]);

  const onSuggestionSelect = useCallback((suggestionString) => {
    setHideTooltip(true);
    setSelectedSuggestionI(-1);
    onTermChange(suggestionString);
  }, []);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown' && enableSuggestions) {
      selectNextSuggestion();
      e.preventDefault();
    } else if (e.key === 'ArrowUp' && enableSuggestions) {
      selectPreviousSuggestion();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      if (enableSuggestions && !hideTooltip) {
        onSuggestionSelect(selectedSuggestion);
      } else if (e.shiftKey) {
        selectPreviousResult();
      } else {
        selectNextResult();
      }
      e.preventDefault();
    }
  }, [enableSuggestions, onSuggestionSelect, selectedSuggestion, selectPreviousResult, selectNextResult]);

  const showTooltip = enableSuggestions && term.length >= MIN_TERM_LENGTH
    && suggestions.length
    && !hideTooltip;
  const isNoResults = resultCount === 0;

  return (
    <div className={styles.container} onKeyDown={onKeyDown}>
      <SearchInput
        ref={inputAreaRef}
        term={term}
        onChange={onInputChange}
        extraActionElement={(
          <div className={classNames(styles.extraElement, { [styles.disabled]: isNoResults })}>
            <div className={styles.hits}>
              <span>
                {`${currentResult}/${resultCount}`}
              </span>
            </div>
            <div className={styles.separator} />
            <div className={styles.icon} onClick={selectPreviousResult}>
              <Icon type="standalone" name="chevronUp" color={isNoResults ? 'neutral100' : 'neutral500'} />
            </div>
            <div className={styles.icon} onClick={selectNextResult}>
              <Icon type="standalone" name="chevronDown" color={isNoResults ? 'neutral100' : 'neutral500'} />
            </div>
          </div>
        )}
      />
      {showTooltip && (
        <div style={{ zIndex: zIndexTooltip }} className={styles.tooltip} ref={tooltipRef}>
          {suggestions.map((suggestion) => (
            <div className={styles.suggestion} key={suggestion.label}>
              <div className={styles.label}>
                {suggestion.label}
              </div>
              {suggestion.members.map((member) => (
                <div
                  className={classNames(styles.member, {
                    [styles.selected]: member === selectedSuggestion,
                  })}
                  onClick={() => onSuggestionSelect(member)}
                  key={member}
                >
                  {member}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

QuickSearch.displayName = 'QuickSearch';

QuickSearch.defaultProps = {
  zIndexTooltip: 1,
  enableSuggestions: false,
};

QuickSearch.propTypes = {
  currentResult: PropTypes.number.isRequired,
  enableSuggestions: PropTypes.bool,
  onSelectedResultChange: PropTypes.func.isRequired,
  onTermChange: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  term: PropTypes.string.isRequired,
  zIndexTooltip: PropTypes.number,
};

export default QuickSearch;
