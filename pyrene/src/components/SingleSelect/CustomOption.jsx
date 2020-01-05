import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

/*
* We do really want to pass all props down without intercepting them
*/
// eslint-disable-next-line react/jsx-props-no-spreading
const CustomOption = (props) => <div title={props.label}><components.Option {...props} /></div>;

CustomOption.propTypes = {
  label: PropTypes.string.isRequired,
};

export default CustomOption;
