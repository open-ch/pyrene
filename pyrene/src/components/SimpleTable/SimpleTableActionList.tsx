/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Popover from '../Popover/Popover';
import styles from './SimpleTableActionList.module.css';
import Icon from '../Icon/Icon';
import { Action } from './types';
import IconButton from '../IconButton/IconButton';
import Tooltip from '../Tooltip/Tooltip';

interface SimpleTableActionListProps<R> {
  actions: Array<Action<R>>;
  row: R;
}

const SimpleTableActionList: <R = {}>(
  p: SimpleTableActionListProps<R>
) => React.ReactElement<SimpleTableActionListProps<R>> = ({ actions, row }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => setIsVisible(false);

  const actionsWithIcons = actions.filter((ac) => ac.icon);
  const actionsWithoutIcons = actions.filter((ac) => !ac.icon);

  return (
    <div className={styles.actionBar}>
      {actionsWithIcons.map(
        (ac) =>
          ac.icon && (
            <Tooltip label={ac.label}>
              <IconButton
                icon={ac.icon}
                onClick={(e) => {
                  if (ac.onClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    ac.onClick(row);
                    onClose();
                  }
                }}
              />
            </Tooltip>
          )
      )}
      {actionsWithoutIcons.length > 0 && (
        <Popover
          align="end"
          distanceToTarget={14}
          renderPopoverContent={() => (
            <div className={styles.actionMenuContainer}>
              {actionsWithoutIcons.map((element) => (
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
          <div>
            <div
              className={styles.action}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsVisible(true);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Icon name="moreHorizontal" />
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default SimpleTableActionList;
