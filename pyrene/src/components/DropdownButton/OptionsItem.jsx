import React from 'react';
import PropTypes from 'prop-types';

import './optionsItem.css';

const OptionsItem = (props) => (
  <div
    styleName="container"
    onClick={props.onClick}
  >
    <span>
      {props.label}
    </span>
  </div>
);

OptionsItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OptionsItem;
