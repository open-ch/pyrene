import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover/Popover';
import './simpleTable.css';

const SimpleTableActionList = (props) => (
  <Popover
    align="end"
    distanceToTarget={14}
    children={<div styleName="popOverPlaceholder"></div>} // eslint-disable-line
    renderPopoverContent={() => (
      <div styleName="actionMenuContainer">
        {props.actions.map((element) => (
          <div key={`${element.label}_action`}>
            <a
              styleName="actionLink"
              key={`${element.label}_actionLink`}
              href="#"
              onClick={(e) => {
                if (element.onClick) {
                  e.preventDefault();
                  element.onClick(props.row);
                  props.closeAction();
                }
              }}
            >
              {element.label}
            </a>
          </div>
        ))}
      </div>
    )}
    preferredPosition={['bottom']}
    displayPopover={props.isActive}
    onClickOutside={props.closeAction}
    autoReposition
  />
);

SimpleTableActionList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  closeAction: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  row: PropTypes.object.isRequired,
};

export default SimpleTableActionList;
