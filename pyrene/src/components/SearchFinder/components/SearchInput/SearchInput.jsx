import React, {
  useCallback, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './searchInput.css';
import Icon from '../../../Icon/Icon';

/**
 * SearchInput - private component used as base for other search components.
 */
const SearchInput = ({
  value, onChange, onEnter, extraActionElement, containerRef, placeholder, width,
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
    <div
      className={classNames(styles.inputArea, { [styles.isFocused]: isFocused })}
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
  onEnter: null,
  extraActionElement: null,
  containerRef: null,
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
  /**
   * width
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default SearchInput;
