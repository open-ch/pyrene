import React, { FunctionComponent } from 'react';

import OptionsItem from './OptionsItem';

import './optionsList.css';

export interface OptiuonsListProps {
  actions: Array<{
    label: string,
    onClick: () => void,
  }>,
  onClick: () => void,
}

const OptionsList: FunctionComponent<OptiuonsListProps> = ({actions, onClick}: OptiuonsListProps) => (
  <div styleName="actionContainer">
    {actions.map((action) => (
      <OptionsItem
        key={action.label}
        label={action.label}
        onClick={() => {
          action.onClick();
          onClick();
        }}
      />
    ))}
  </div>
);

export default OptionsList;
