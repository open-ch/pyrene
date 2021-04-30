import React from 'react';
import PropTypes from 'prop-types';

import OptionsItem from './OptionsItem';

import './optionsList.css';

const OptionsList = (props) => (
  <div styleName="actionContainer">
    {props.actions.map((action) => (
      <OptionsItem
        key={action.label}
        label={action.label}
        onClick={() => {
          action.onClick();
          props.onClick();
        }}
      />
    ))}
  </div>
);

OptionsList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OptionsList;
