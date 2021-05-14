import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import Popover from '../Popover/Popover';
import CheckboxList, { Item } from './CheckboxList';
import './checkboxPopover.css';

export interface CheckboxPopoverProps {
  buttonLabel: string;
  disabled?: boolean;
  listItems: Array<Item>;
  onItemClick: (id: Item['id'], value: Item['value']) => void;
  onRestoreDefault: () => void;
}

const CheckboxPopover: FunctionComponent<CheckboxPopoverProps> = ({
  onRestoreDefault,
  listItems,
  onItemClick,
  buttonLabel,
  disabled = false,
}:CheckboxPopoverProps) => {
  const [displayPopover, setDisplayPopover] = useState(false);

  const togglePopover = () => {
    setDisplayPopover((prevDisplayPopover) => !prevDisplayPopover);
  };

  return (
    <div styleName={clsx('checkboxPopover', { disabled })}>
      <Popover
        preferredPosition={['bottom']}
        align="end"
        displayPopover={displayPopover}
        distanceToTarget={8}
        onClickOutside={() => setDisplayPopover(false)}
        renderPopoverContent={() => <CheckboxList listItems={listItems} onItemClick={onItemClick} onRestoreDefault={onRestoreDefault} />}
      >
        <div styleName={clsx('popoverTriggerButton', { popoverOpen: displayPopover })} onClick={togglePopover}>
          <div styleName="buttonLabel" className="unSelectable">
            {buttonLabel}
          </div>
          <div
            styleName="arrowIcon"
            className={displayPopover ? 'pyreneIcon-chevronUp' : 'pyreneIcon-chevronDown'}
          />
        </div>
      </Popover>
    </div>
  );
};

CheckboxPopover.displayName = 'Checkbox Popover';

export default CheckboxPopover;
