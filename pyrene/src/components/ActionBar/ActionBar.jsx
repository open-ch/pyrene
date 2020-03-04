import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';
import ArrowPopover from '../ArrowPopover/ArrowPopover';
import './actionBar.css';

/**
 * An action bar consists of a configurable number of action elements (e.g. icons) that user can interact with.
 *
 * Each action element in the action bar can be active or inactive; can have its own color and icon.
 * An icon can be either an icon font or an svg icon
 */
const ActionBar = (props) => {

  const [openAction, setOpenAction] = useState(null);

  return (props.actions.length ? (
    <div styleName={classNames('container', props.disabled && !props.loading ? 'disabled' : '', props.styling === 'none' ? '' : `box-${props.styling}`)}>
      { props.loading ? (
        <div styleName="loaderBox" style={{ height: 32, width: props.actions.length * 33 - 1 }}>
          <Loader type="inline" />
        </div>
      ) : props.actions.map((action, index) => {

        const onClick = () => {
          if (action.popover && action.onClick) {
            throw new Error('You can not define popover and onClick');
          }
          if (!action.active) {
            return null;
          }
          if (action.popover) {
            return () => setOpenAction(index);
          }
          return action.onClick;
        };

        const isSvgIcon = action.svg && action.svg.length > 0;
        const iconComponent = (
          <div styleName={classNames('iconBox', { disabled: !action.active })} onClick={onClick()}>
            {isSvgIcon ? <Icon color={action.color} svg={action.svg} type="inline" /> : <Icon color={action.color} name={action.iconName} type="inline" />}
          </div>
        );

        const actionComponent = action.popover && action.active ? (
          <ArrowPopover key={isSvgIcon ? action.svg : action.iconName}
            popoverContent={action.popover(() => setOpenAction(null))}
            displayPopover={openAction === index}
          >
            {iconComponent}
          </ArrowPopover>
        ) : iconComponent;

        return (
          <div key={isSvgIcon ? action.svg : action.iconName} styleName="borderContainer">
            {action.tooltip ? <Tooltip preferredPosition={['top', 'bottom']} label={action.tooltip}>{actionComponent}</Tooltip> : actionComponent}
            {index < props.actions.length - 1 && <div styleName="border" />}
          </div>
        );
      })}
    </div>
  ) : null);
};

ActionBar.displayName = 'Action Bar';

ActionBar.defaultProps = {
  disabled: false,
  styling: 'shadow',
  loading: false,
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
     * The name of the icon font.
     */
    iconName: PropTypes.string,
    /**
     * Function called when user clicks the icon.
     */
    onClick: PropTypes.func,
    /**
     * Popover content
     */
    popover: PropTypes.any,
    /**
     * The type of icon.
     */
    svg: PropTypes.string,
    /**
     * Optional tooltip
     */
    tooltip: PropTypes.string,
  })).isRequired,
  /**
   * Disabling all actions - no tooltip, no onClick and opacity 50%
   * */
  disabled: PropTypes.bool,
  /**
   * Loading state
   */
  loading: PropTypes.bool,
  /**
   * Sets the box style of the action bar.
   */
  styling: PropTypes.oneOf(['none', 'box', 'shadow']),
};

export default ActionBar;
