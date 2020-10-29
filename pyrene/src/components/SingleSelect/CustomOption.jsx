import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Icon from '../Icon/Icon';

import './customOption.css';
/*
* We do really want to pass all props down without intercepting them
*/
// eslint-disable-next-line react/jsx-props-no-spreading
const getIconStyle = (isSelected, isFocused) => {
  if (isSelected) {
    return 'container selected';
  }
  if (isFocused) {
    return 'container focused';
  }
  return 'container';
};

const CustomOption = (props) => (
  <div title={props.label} styleName={getIconStyle(props.isSelected, props.isFocused)}>
    {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
    <components.Option {...props} />
  </div>
);

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
