/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Popover from '../Popover/Popover';
import styles from './simpleTableActionList.css';
import Icon from '../Icon/Icon';
import { Action } from './types';

interface SimpleTableActionListProps<R> {
  actions: Array<Action<R>>,
  row: R,
}

const SimpleTableActionList: <R = {}>(p: SimpleTableActionListProps<R>) => React.ReactElement<SimpleTableActionListProps<R>> = ({
  actions,
  row,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => setIsVisible(false);

  return (
    <Popover
      align="end"
      distanceToTarget={14}
      renderPopoverContent={() => (
        <div className={styles.actionMenuContainer}>
          {actions.map((element) => (
            <a
              className={styles.actionLink}
              key={`${element.label}_actionLink`}
              href="#"
              onClick={(e) => {
                if (element.onClick) {
                  e.preventDefault();
                  e.stopPropagation();
                  element.onClick(row);
                  onClose();
                }
              }}
            >
              {element.label}
            </a>
          ))}
        </div>
      )}
      preferredPosition={['bottom']}
      displayPopover={isVisible}
      onClickOutside={onClose}
      autoReposition
    >
      <div className={styles.popOverPlaceholder}>
        <div className={styles.action}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsVisible(true);
          }}
          onDoubleClick={(e) => { e.stopPropagation(); }}
        >
          <Icon name="moreHorizontal" />
        </div>
      </div>
    </Popover>
  );
};

export default SimpleTableActionList;
