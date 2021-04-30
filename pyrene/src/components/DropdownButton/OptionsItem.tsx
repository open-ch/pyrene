import React, { FunctionComponent } from 'react';

import './optionsItem.css';


export interface OptionsItemProps {
  label: string,
  onClick: () => void,
}

const OptionsItem: FunctionComponent<OptionsItemProps> = ({ label, onClick }: OptionsItemProps) => (
  <button
    styleName="container"
    onClick={onClick}
    type="button"
  >
    <span styleName="optionLabel">
      {label}
    </span>
  </button>
);

export default OptionsItem;
