import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import style from './colorSquare.css';

const ColorSquare = ({ variableName, size, bordered }) => (
  <div
    className={classnames(
      style.colorSquare,
      style[size],
      { [style.border]: bordered },
    )}
    style={{
      backgroundColor: `var(--${variableName})`,
    }}
  />
);

ColorSquare.displayName = 'ColorSquare';

ColorSquare.propTypes = {
  bordered: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  variableName: PropTypes.string.isRequired,
};

ColorSquare.defaultProps = {
  bordered: false,
};

export default ColorSquare;
