import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import Icon from '../Icon/Icon';

import './customOption.css';
/*
* We do really want to pass all props down without intercepting them
*/
// eslint-disable-next-line react/jsx-props-no-spreading
const CustomOption = (props) => (
  <div title={props.label} styleName="container">
    {props.data.iconProps ? <span styleName="icon"><Icon {...props.data.iconProps} /></span> : null}
    <components.Option {...props} />
  </div>
);

CustomOption.propTypes = {
  data: PropTypes.shape({
    iconProps: Icon.PropTypes,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default CustomOption;
