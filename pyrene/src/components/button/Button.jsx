import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.css';

const button = props => (
  <button
    styleName={
      classNames('button', {
        [`type-${props.type}`]: props.type
      })
    }
  >
    {props.label}
  </button>
);

button.defaultProps = {
  label: '',
  type: 'primary'
};

button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary'])
};
