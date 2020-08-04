import React, {
  useCallback, useRef, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './searchInput.css';
import Icon from '../Icon/Icon';

/**
 * SearchInput - simple search input area with search and "clear" actions
 */
const SearchInput = forwardRef(({
  term, onChange, onSearchClick, onEnter, extraActionElement, onX,
}, ref) => {
  const inputRef = useRef();
  // TODO: UX: hide X when there is no term?
  // TODO: UX: should search icon be interactive? (not clickable seems standard)

  const focus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const clearTerm = useCallback(() => {
    if (term.length) {
      onChange('');
      focus();
    }
  }, [onChange]);

  const onInputChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);


  const handleEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  }, [onEnter]);

  return (
    <div className={styles.inputArea} ref={ref} onKeyDown={onEnter ? handleEnter : null}>
      <div className={styles.icon} onClick={onSearchClick || focus}>
        <Icon type="standalone" name="search" />
      </div>
      <input ref={inputRef} value={term} onChange={onInputChange} />
      <div className={styles.extraActionContainer}>
        {extraActionElement}
      </div>
      <div className={styles.icon} onClick={onX || clearTerm}>
        <Icon type="standalone" name="delete" />
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

SearchInput.defaultProps = {
  onSearchClick: null,
  onEnter: null,
  extraActionElement: null,
  onX: null,
};

SearchInput.propTypes = {
  extraActionElement: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  onSearchClick: PropTypes.func,
  onX: PropTypes.func,
  term: PropTypes.string.isRequired,
};

export default SearchInput;
