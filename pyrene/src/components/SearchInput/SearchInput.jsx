import React, {
  useCallback, useRef, forwardRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './searchInput.css';
import Icon from '../Icon/Icon';

/**
 * SearchInput - simple search input area with search and "clear" actions
 */
const SearchInput = forwardRef(({
  term, onChange, onEnter, extraActionElement,
}, ref) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

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
    <div className={classNames(styles.inputArea, { [styles.isFocused]: isFocused })} ref={ref} onKeyDown={onEnter ? handleEnter : null}>
      <div className={classNames(styles.icon, styles.passive)}>
        <Icon type="standalone" name="search" />
      </div>
      <input ref={inputRef} value={term} onChange={onInputChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      <div>
        {extraActionElement}
      </div>
      <div className={classNames(styles.icon, { [styles.disabled]: !term.length })} onClick={clearTerm}>
        <Icon type="standalone" name="delete" color={!term.length ? 'neutral100' : 'neutral500'} />
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

SearchInput.defaultProps = {
  onEnter: null,
  extraActionElement: null,
};

SearchInput.propTypes = {
  extraActionElement: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  term: PropTypes.string.isRequired,
};

export default SearchInput;
