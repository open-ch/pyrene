import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Icon from '../Icon/Icon';

import './customOption.css';
import colorConstants from '../../styles/colorConstants';
/*
* We do really want to pass all props down without intercepting them
*/
// eslint-disable-next-line react/jsx-props-no-spreading
const getBackgroundColor = (isSelected, isFocused) => {
  if (isSelected) {
    return colorConstants.neutral030;
  }
  if (isFocused) {
    return colorConstants.backgroundTint;
  }
  return colorConstants.neutral000;
};

const CustomOption = (props) => {
  const iconStyle = {
    backgroundColor: getBackgroundColor(props.isSelected, props.isFocused),
  };

  return (
    <div title={props.label} styleName="container" style={iconStyle}>
      {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
      <components.Option {...props} />
    </div>
  );
};

CustomOption.propTypes = {
  data: PropTypes.shape({
    iconProps: Icon.PropTypes,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomOption;
