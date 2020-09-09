import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../SearchFinder/components/SearchInput/SearchInput';

/**
 * Simple search input area
 */
const Search = ({
  value, onChange, onEnter, containerRef, placeholder,
}) => (
  <SearchInput
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    onEnter={onEnter}
    containerRef={containerRef}
  />
);

Search.displayName = 'Search';

Search.defaultProps = {
  onEnter: null,
  containerRef: null,
  placeholder: '',
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
   * called when value changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * custom handler for enter keydown action
   */
  onEnter: PropTypes.func,
  /**
   * input placeholder string
   */
  placeholder: PropTypes.string,
  /**
   * input value
   */
  value: PropTypes.string.isRequired,
};

export default Search;
