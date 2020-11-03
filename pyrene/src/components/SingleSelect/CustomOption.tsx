import React from 'react';
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

type CustomOptionProps = OptionProps<SingleSelectOption> & {
  data: SingleSelectOption; // This is infered as any because of a typing issue in OptionProps, hence the lint disable in the component
  isFocused: boolean;
  isSelected: boolean;
  label: string;
};

const CustomOption: React.FC<CustomOptionProps> = (props: CustomOptionProps) => (
  <div title={props.label} styleName={getIconStyle(props.isSelected, props.isFocused)}>
    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
    {props.data.iconProps ? <div styleName="icon"><Icon {...props.data.iconProps} /></div> : null}
    <components.Option {...props} />
  </div>
);

export default CustomOption;
