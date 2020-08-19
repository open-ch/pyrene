import React, {
  useCallback, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './searchInput.css';
import Icon from '../Icon/Icon';

/**
 * SearchInput - simple search input area with search and "clear" actions
 */
const SearchInput = ({
  value, onChange, onEnter, extraActionElement, containerRef,
}) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const focus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const clearTerm = useCallback(() => {
    if (value.length) {
      onChange('');
      focus();
    }
  }, [onChange, value, focus]);

  const onInputChange = useCallback((e) => {
    onChange(e.target.value, e);
  }, [onChange]);

  const handleEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  }, [onEnter]);

  return (
    <div className={classNames(styles.inputArea, { [styles.isFocused]: isFocused })} ref={containerRef} onKeyDown={onEnter ? handleEnter : null}>
      <div className={classNames(styles.icon, styles.passive)}>
        <Icon type="standalone" name="search" />
      </div>
      <input ref={inputRef} value={value} onChange={onInputChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      <div>
        {extraActionElement}
      </div>
      <div className={classNames(styles.icon, { [styles.disabled]: !value.length })} onClick={clearTerm}>
        <Icon type="standalone" name="delete" color={!value.length ? 'neutral100' : 'neutral500'} />
      </div>
    </div>
  );
};

SearchInput.displayName = 'SearchInput';

SearchInput.defaultProps = {
  onEnter: null,
  extraActionElement: null,
  containerRef: null,
};

SearchInput.propTypes = {
  /**
   * ref of SearchInput container
   */
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * custom element to extend the search bar placed between search input and cross button
   */
  extraActionElement: PropTypes.element,
  /**
   * called when value changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * custom handler for enter keydown action
   */
  onEnter: PropTypes.func,
  /**
   * input value
   */
  value: PropTypes.string.isRequired,
};

export default SearchInput;
