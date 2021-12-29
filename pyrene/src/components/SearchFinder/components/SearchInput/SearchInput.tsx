/* eslint-disable react/prop-types */
import React, {
  useCallback, useEffect, useRef, useState, FunctionComponent, RefObject, ChangeEvent, KeyboardEvent, FocusEvent,
} from 'react';
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
  extraActionElement?: JSX.Element,
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
  onChange: (value: string, e?: ChangeEvent<HTMLInputElement>) => void,
  /**
   * custom handler for enter keydown action
   */
  onEnter?: () => void,
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
    if (e.key === 'Enter') {
      onEnter?.();
    }
  }, [onEnter]);


  const handleIsFocused = useCallback((isFocusedValue) => {
    if (isFocused === null) {
      setIsLocalFocused(isFocusedValue);
    }
  }, [isFocused]);

  const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    handleIsFocused(true);
    onFocus?.(e);
  }, [handleIsFocused, onFocus]);

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    handleIsFocused(false);
    onBlur?.(e);
  }, [handleIsFocused, onBlur]);

  return (
    <div
      className={clsx(styles.inputArea, { [styles.isFocused]: isLocalFocused })}
      style={{ width }}
      ref={containerRef}
      onKeyDown={onEnter ? handleEnter : undefined}
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

SearchInput.displayName = 'SearchInput';

export default SearchInput;
