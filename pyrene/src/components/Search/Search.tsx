import React, { FunctionComponent } from 'react';
import SearchInput, { SearchInputProps } from '../SearchFinder/components/SearchInput/SearchInput';

export interface SearchProps {
  /**
   * ref of SearchInput container
   */
  containerRef?: SearchInputProps['containerRef'],
  /**
   * set Focused state
   */
  isFocused?: SearchInputProps['isFocused'],
  /**
   * called when input is blured
   */
  onBlur?: SearchInputProps['onBlur'],
  /**
   * called when value changes
   */
  onChange: SearchInputProps['onChange'],
  /**
   * custom handler for enter keydown action
   */
  onEnter?: SearchInputProps['onEnter'],
  /**
   * called when input is focused
   */
  onFocus?: SearchInputProps['onFocus'],
  /**
   * input placeholder string
   */
  placeholder?: SearchInputProps['placeholder'],
  /**
   * input value
   */
  value: SearchInputProps['value'],
  /**
   * width
   */
  width?: SearchInputProps['width'],
}

/**
 * Simple search input area
 */
const Search: FunctionComponent<SearchProps> = ({
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
