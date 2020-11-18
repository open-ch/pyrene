import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './searchInput.css';
import Icon from '../../../Icon/Icon';

/**
 * SearchInput - private component used as base for other search components.
 */
const SearchInput = ({
  value, onChange, onEnter, onBlur, onFocus, extraActionElement, containerRef, placeholder, width, isFocused,
}) => {
  const inputRef = useRef();
  const [isLocalFocused, setIsLocalFocused] = useState(!!isFocused);

  useEffect(() => {
    setIsLocalFocused(!!isFocused);
  }, [isFocused]);

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


  const handleIsFocused = useCallback((isFocusedValue) => {
    if (isFocused === null) {
      setIsLocalFocused(isFocusedValue);
    }
  }, [isFocused]);

  const handleFocus = useCallback((e) => {
    handleIsFocused(true);
    onFocus(e);
  }, [handleIsFocused, onFocus]);

  const handleBlur = useCallback((e) => {
    handleIsFocused(false);
    onBlur(e);
  }, [handleIsFocused, onBlur]);

  return (
    <div
      className={classNames(styles.inputArea, { [styles.isFocused]: isLocalFocused })}
      style={{ width: width }}
      ref={containerRef}
      onKeyDown={onEnter ? handleEnter : null}
    >
      <div className={classNames(styles.icon, styles.passive)}>
        <Icon type="standalone" name="search" />
      </div>
      <input
        ref={inputRef}
        value={value}
        onChange={onInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      <div>
        {extraActionElement}
      </div>
      <div className={classNames(styles.icon, { [styles.disabled]: !value.length })} onClick={clearTerm}>
        <Icon type="standalone" name="delete" color={!value.length ? 'neutral100' : 'neutral500'} />
      </div>
    </div>
  );
};

SearchInput.displayName = 'Search Input';

SearchInput.defaultProps = {
  onBlur: null,
  onEnter: null,
  onFocus: null,
  extraActionElement: null,
  containerRef: null,
  isFocused: null,
  placeholder: '',
  width: 256,
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
   * set Focused state
   */
  isFocused: PropTypes.bool,
  /**
   * called when input is blured
   */
  onBlur: PropTypes.func,
  /**
   * called when value changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * custom handler for enter keydown action
   */
  onEnter: PropTypes.func,
  /**
   * called when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * input placeholder string
   */
  placeholder: PropTypes.string,
  /**
   * input value
   */
  value: PropTypes.string.isRequired,
  /**
   * width
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default SearchInput;
