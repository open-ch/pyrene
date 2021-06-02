import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover/Popover';
import styles from './simpleTableActionList.css';
import Icon from '../Icon/Icon';

const SimpleTableActionList = (props) => {

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
          {props.actions.map((element) => (
            <a
              className={styles.actionLink}
              key={`${element.label}_actionLink`}
              href="#"
              onClick={(e) => {
                if (element.onClick) {
                  e.preventDefault();
                  e.stopPropagation();
                  element.onClick(props.row);
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

SimpleTableActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  row: PropTypes.shape({
    key: PropTypes.string,
    rowStyle: PropTypes.shape({}),
    value: PropTypes.node,
  }).isRequired,
};

export default SimpleTableActionList;
