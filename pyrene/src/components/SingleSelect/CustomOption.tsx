import React from 'react';
import PropTypes from 'prop-types';
import { components, OptionProps } from 'react-select';
import Icon from '../Icon/Icon';

import './customOption.css';
import { SingleSelectOption } from './SingleSelectTypes';
/*
* We do really want to pass all props down without intercepting them
*/
// eslint-disable-next-line react/jsx-props-no-spreading
const getIconStyle = (isSelected: boolean | undefined, isFocused: boolean | undefined) => {
  if (isSelected) {
    return 'container selected';
  }
  if (isFocused) {
    return 'container focused';
  }
  return 'container';
};

type Props = OptionProps<any> & {
  data: SingleSelectOption;
  isFocused: boolean;
  isSelected: boolean;
  label: string;
};

const CustomOption: React.FC<Props>  = (props: Props) => (
  <div title={props.label} styleName={getIconStyle(props.isSelected, props.isFocused)}>
    {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
    <components.Option {...props} />
  </div>
);

export default CustomOption;