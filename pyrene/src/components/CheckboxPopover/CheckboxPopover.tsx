import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import Popover from '../Popover/Popover';
import CheckboxList, { CheckboxListProps } from './CheckboxList';
import './checkboxPopover.css';

export interface CheckboxPopoverProps extends CheckboxListProps {
  buttonLabel: string;
  disabled?: boolean;
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
    <div styleName={classNames('checkboxPopover', { disabled })}>
      <Popover
        preferredPosition={['bottom']}
        align="end"
        displayPopover={displayPopover}
        distanceToTarget={8}
        onClickOutside={() => setDisplayPopover(false)}
        renderPopoverContent={() => <CheckboxList listItems={listItems} onItemClick={onItemClick} onRestoreDefault={onRestoreDefault} />}
      >
        <div styleName={classNames('popoverTriggerButton', { popoverOpen: displayPopover })} onClick={togglePopover}>
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
