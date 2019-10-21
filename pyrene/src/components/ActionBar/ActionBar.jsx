import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './actionBar.css';

/**
 * An action bar consists of a configurable number of action elements (e.g. icons) that user can interact with.
 *
 * Each action element in the action bar can be active or inactive; can have its own color and icon.
 */
const ActionBar = (props) => {
  return (
    <div styleName={classNames('container', props.styling === 'none' ? '' : `box-${props.styling}`)}>
      {props.actions.map((action, index) => {
        return (
          <div key={action.icon} styleName="borderContainer">
            <div styleName={classNames('iconBox', { disabled: !action.active })} onClick={action.active ? action.onClick : () => {}}>
              <Icon color={action.color} icon={action.icon} type="inline" />
            </div>
            {index < props.actions.length - 1 && <div styleName="border" />}
          </div>
        );
      })}
    </div>
  );
};

ActionBar.displayName = 'Action Bar';

ActionBar.defaultProps = {
  styling: 'shadow',
};

ActionBar.propTypes = {
  /**
   * The list of action elements for the action bar.
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Whether the icon is active.
     */
    active: PropTypes.bool.isRequired,
    /**
     * The color of the icon.
     */
    color: PropTypes.string,
    /**
     * The name of the icon or the file name of the svg icon.
     */
    icon: PropTypes.string.isRequired,
    /**
     * Function called when user clicks the icon.
     */
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  /**
   * Sets the box style of the action bar.
   */
  styling: PropTypes.oneOf(['none', 'box', 'shadow']),
};

export default ActionBar;
