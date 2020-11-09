import React from 'react';
import { components, OptionProps } from 'react-select';
import Icon from '../Icon/Icon';

import './customOption.css';
import { SingleSelectOption } from './SingleSelectTypes';
/*
* We do really want to pass all props down without intercepting them
*/
const getIconStyle = (isSelected: boolean | undefined, isFocused: boolean | undefined) => {
  if (isSelected) {
    return 'container selected';
  }
  if (isFocused) {
    return 'container focused';
  }
  return 'container';
};

type OwnCustomOptionsProps = {
  data: SingleSelectOption;
  isFocused: boolean;
  isSelected: boolean;
  label: string;
};

// Make sure we consider all own props before the default props from react-select's options
type CustomOptionProps = OwnCustomOptionsProps & Omit<OptionProps<SingleSelectOption>, keyof OwnCustomOptionsProps>;

const CustomOption: React.FC<CustomOptionProps> = (props: CustomOptionProps) => (
  <div title={props.label} styleName={getIconStyle(props.isSelected, props.isFocused)}>
    {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
    <components.Option {...props} />
  </div>
);

export default CustomOption;
