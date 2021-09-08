/* eslint-disable react/prop-types */
import React, { useState, FunctionComponent } from 'react';
import Popover from '../Popover/Popover';
import styles from './simpleTableActionList.module.css';
import Icon from '../Icon/Icon';
import { Action } from './types';

interface SimpleTableActionListProps {
  actions: Array<Action>,
  row: {
    key?: string,
    rowStyle?: any,
    value?: React.ReactNode,
  },
}

const SimpleTableActionList: FunctionComponent<SimpleTableActionListProps> = ({
  actions,
  row,
}) => {

  const [activeAction, setActiveAction] = useState({
    displayed: false,
  });

  const onClose = () => setActiveAction({ displayed: false });

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
      displayPopover={activeAction.displayed}
      onClickOutside={onClose}
      autoReposition
    >
      <div className={styles.popOverPlaceholder}>
        <div className={styles.action}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveAction({ displayed: true });
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
