import React, { FunctionComponent } from 'react';

import OptionsItem, { OptionsItemProps } from './OptionsItem';

import './optionsList.css';

export interface OptiuonsListProps {
  actions: Array<OptionsItemProps>,
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
