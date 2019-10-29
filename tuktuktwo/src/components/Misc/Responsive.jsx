import React from 'react';
import PropTypes from 'prop-types';
import { ParentSize } from '@vx/responsive';

/**
 * Responsive is used to wrap around other components to make them responsive.
 */
const Responsive = (props) => (
  <ParentSize
    className={props.className}
    debounceTime={10}
  >
    {props.children}
  </ParentSize>
);

Responsive.displayName = 'Responsive';

Responsive.defaultProps = {
  className: null,
};

Responsive.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Responsive;
