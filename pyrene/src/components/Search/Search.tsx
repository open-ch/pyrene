/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { RefObject } from 'react';
import SearchInput from '../SearchFinder/components/SearchInput/SearchInput';

export interface SearchProps {
  /**
   * ref of SearchInput container
   */
  containerRef?: (() => void) | RefObject<HTMLDivElement>,
  /**
   * set Focused state
   */
  isFocused?: boolean,
  /**
   * called when input is blured
   */
  onBlur?: () => void,
  /**
   * called when value changes
   */
  onChange: () => void,
  /**
   * custom handler for enter keydown action
   */
  onEnter?: () => void,
  /**
   * called when input is focused
   */
  onFocus: () => void,
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
  width: number | string,
}

/**
 * Simple search input area
 */
const Search = ({
  value,
  onChange,
  isFocused,
  onBlur,
  onEnter,
  onFocus,
  containerRef,
  placeholder = '',
  width,
}: SearchProps) => (
  <SearchInput
    value={value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    isFocused={isFocused}
    placeholder={placeholder}
    onEnter={onEnter}
    containerRef={containerRef}
    width={width}
  />
);

Search.displayName = 'Search';

export default Search;
