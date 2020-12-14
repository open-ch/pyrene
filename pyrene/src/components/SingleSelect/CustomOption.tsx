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

type OwnCustomOptionsProps<ValueType> = {
  data: SingleSelectOption<ValueType>;
  isFocused: boolean;
  isSelected: boolean;
  label: string;
};

type IsMulti = false;
// Make sure we consider all own props before the default props from react-select's options
type CustomOptionProps<ValueType> = OwnCustomOptionsProps<ValueType> & Omit<OptionProps<SingleSelectOption<ValueType>, IsMulti>, keyof OwnCustomOptionsProps<ValueType>>;

const CustomOption = <ValueType extends unknown>(props: CustomOptionProps<ValueType>): React.ReactElement => (
  <div title={props.label} styleName={getIconStyle(props.isSelected, props.isFocused)}>
    {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
    <components.Option {...props} />
  </div>
);

export default CustomOption;
