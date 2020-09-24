import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';
import ArrowPopover from '../ArrowPopover/ArrowPopover';
import './actionBar.css';

export const handleOnClick = ({
  renderPopover,
  onClick,
  active,
  index,
  openAction,
  setOpenAction,
}) => {
  if (renderPopover && onClick) {
    throw new Error('You can not define both renderPopover and onClick');
  }
  if (!active) {
    return null;
  }
  if (renderPopover) {
    setOpenAction(openAction !== index ? index : null);
  }
  if (onClick) {
    setOpenAction(null);
    onClick();
  }
  return null;
};

/**
 * An action bar consists of a configurable number of action elements (e.g. icons) that user can interact with.
 *
 * Each action element in the action bar can be active or inactive; can have its own color and icon.
 * An icon can be either an icon font or an svg icon
 */
const ActionBar = (props) => {
  const [openAction, setOpenAction] = useState(null);

  const loader = props.orientation === 'horizontal' ? (
    <div
      styleName="loaderBox"
      style={{ height: 32, width: props.actions.length * 33 - 1 }}
    >
      <Loader type="inline" />
    </div>
  ) : (
    <div
      styleName="loaderBox"
      style={{ width: 32, height: props.actions.length * 33 - 1 }}
    >
      <Loader type="inline" />
    </div>
  );

  return props.actions.length ? (
    <div
      styleName={classNames(
        `container-${props.orientation}`,
        props.disabled && !props.loading ? 'disabled' : '',
        props.styling === 'none' ? '' : `box-${props.styling}`,
      )}
    >
      {props.loading ? loader : (
        props.actions.map((action, index) => {
          const isSvgIcon = action.svg && action.svg.length > 0;
          const iconComponent = (
            <div
              styleName={classNames('iconBox', { disabled: !action.active })}
              onClick={() => handleOnClick({
                renderPopover: action.renderPopover,
                onClick: action.onClick,
                active: action.active,
                index,
                openAction,
                setOpenAction,
              })}
            >
              {isSvgIcon ? (
                <Icon color={action.color} svg={action.svg} type="inline" />
              ) : (
                <Icon
                  color={action.color}
                  name={action.iconName}
                  type="inline"
                />
              )}
            </div>
          );

          const actionComponent = action.renderPopover && action.active ? (
            <ArrowPopover
              key={isSvgIcon ? action.svg : action.iconName}
              popoverContent={action.renderPopover(() => setOpenAction(null))}
              displayPopover={openAction === index}
              closePopover={() => setOpenAction(null)}
            >
              {iconComponent}
            </ArrowPopover>
          ) : (
            iconComponent
          );

          return (
            <div
              key={isSvgIcon ? action.svg : action.iconName}
              styleName={`borderContainer-${props.orientation}`}
            >
              {action.tooltip && openAction !== index ? (
                <Tooltip
                  preferredPosition={['top', 'bottom']}
                  label={action.tooltip}
                >
                  {actionComponent}
                </Tooltip>
              ) : (
                actionComponent
              )}
              {index < props.actions.length - 1 && <div styleName={`border-${props.orientation}`} />}
            </div>
          );
        })
      )}
    </div>
  ) : null;
};

ActionBar.displayName = 'Action Bar';

ActionBar.defaultProps = {
  disabled: false,
  styling: 'shadow',
  loading: false,
  orientation: 'horizontal',
};

ActionBar.propTypes = {
  /**
   * The list of action elements for the action bar.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
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
      renderPopover: PropTypes.func,
      /**
       * The type of icon.
       */
      svg: PropTypes.string,
      /**
       * Optional tooltip
       */
      tooltip: PropTypes.string,
    }),
  ).isRequired,
  /**
   * Disabling all actions - no tooltip, no onClick and opacity 50%
   * */
  disabled: PropTypes.bool,
  /**
   * Loading state
   */
  loading: PropTypes.bool,
  /**
   * Sets the orientation of the stack of elements
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Sets the box style of the action bar.
   */
  styling: PropTypes.oneOf(['none', 'box', 'shadow']),
};

export default ActionBar;
