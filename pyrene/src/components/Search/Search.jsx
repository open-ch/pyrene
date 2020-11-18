import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../SearchFinder/components/SearchInput/SearchInput';

/**
 * Simple search input area
 */
const Search = ({
  value, onChange, onEnter, containerRef, placeholder, width, onFocus, isFocused,
}) => (
  <SearchInput
    value={value}
    onChange={onChange}
    onFocus={onFocus}
    isFocused={isFocused}
    placeholder={placeholder}
    onEnter={onEnter}
    containerRef={containerRef}
    width={width}
  />
);

Search.displayName = 'Search';

Search.defaultProps = {
  isFocused: null,
  onEnter: null,
  onFocus: null,
  containerRef: null,
  placeholder: '',
  width: null,
};

Search.propTypes = {
  /**
   * ref of SearchInput container
   */
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /**
   * set Focused state
   */
  isFocused: PropTypes.bool,
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

export default Search;
