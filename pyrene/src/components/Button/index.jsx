import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const Button = props => (
  <button
    styleName={
      classNames('button', {
        [`type-${props.type}`]: true
      })
    }
  >
    {props.label}
  </button>
);

Button.defaultProps = {
  label: '',
  type: 'primary'
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary'])
};

export default Button;

