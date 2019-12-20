import React from 'react';
import PropTypes from 'prop-types';

import './optionsItem.css';

const OptionsItem = (props) => (
  <button
    styleName="container"
    onClick={props.onClick}
    type="button"
  >
    <span>
      {props.label}
    </span>
  </button>
);

OptionsItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OptionsItem;
