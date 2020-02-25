import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover/Popover';
import './simpleTableActionList.css';
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
        <div styleName="actionMenuContainer">
          {props.actions.map((element) => (
            <a
              styleName="actionLink"
              key={`${element.label}_actionLink`}
              href="#"
              onClick={(e) => {
                if (element.onClick) {
                  e.preventDefault();
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
      <div styleName="popOverPlaceholder">
        <div styleName="action" className="action"
          onClick={(e) => {
            e.preventDefault();
            setActiveAction({ displayed: true });
          }}
          onDoubleClick={(e) => { e.stopPropagation(); }}
        >
          {<Icon
            name="moreHorizontal"
          />}
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
