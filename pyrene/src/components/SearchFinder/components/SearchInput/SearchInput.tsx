import React, {
  useCallback, useEffect, useRef, useState, FunctionComponent, RefObject, ChangeEvent, KeyboardEvent, FocusEvent,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './searchInput.css';
import Icon from '../../../Icon/Icon';

export interface SearchInputProps {
  /**
   * ref of SearchInput container
   */
  containerRef?: (() => void) | RefObject<HTMLDivElement>,
  /**
   * custom element to extend the search bar placed between search input and cross button
   */
  extraActionElement: JSX.Element,
  /**
   * set Focused state
   */
  isFocused?: boolean,
  /**
   * called when input is blured
   */
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void,
  /**
   * called when value changes
   */
  onChange: (value : string, e?: ChangeEvent<HTMLInputElement>) => void,
  /**
   * custom handler for enter keydown action
   */
  onEnter?: (e?: KeyboardEvent<HTMLDivElement>) => void,
  /**
   * called when input is focused
   */
  onFocus?: (e?: FocusEvent<HTMLInputElement>) => void,
  /**
   * input placeholder string
   */
  placeholder?: string,
  /**
   * input value
   */
  value: string,
  /**
   * width
   */
  width?: number | string,
}

/**
 * SearchInput - private component used as base for other search components.
 */
const SearchInput: FunctionComponent<SearchInputProps> = ({
  value,
  onChange,
  onEnter,
  onBlur,
  onFocus,
  extraActionElement,
  containerRef,
  placeholder = '',
  width = 256,
  isFocused,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
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

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, e);
  }, [onChange]);

  const handleEnter = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  }, [onEnter]);


  const handleIsFocused = useCallback((isFocusedValue) => {
    if (isFocused === null) {
      setIsLocalFocused(isFocusedValue);
    }
  }, [isFocused]);

  const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    handleIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  }, [handleIsFocused, onFocus]);

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    handleIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  }, [handleIsFocused, onBlur]);

  return (
    <div
      className={clsx(styles.inputArea, { [styles.isFocused]: isLocalFocused })}
      style={{ width: width }}
      ref={containerRef}
      onKeyDown={onEnter ? handleEnter : null}
    >
      <div className={clsx(styles.icon, styles.passive)}>
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
      <div className={clsx(styles.icon, { [styles.disabled]: !value.length })} onClick={clearTerm}>
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
