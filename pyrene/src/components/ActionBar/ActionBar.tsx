/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';
import ArrowPopover from '../ArrowPopover/ArrowPopover';
import styles from './actionBar.css';

export const handleOnClick = (
  renderPopover: undefined | ((a: (() => void)) => React.ReactElement),
  onClick: undefined | (() => void),
  active: boolean,
  index: number,
  openAction: number | null,
  setOpenAction: (n: number | null) => void,
): void => {
  if (renderPopover && onClick) {
    throw new Error('You can not define both renderPopover and onClick');
  }
  if (!active) {
    return;
  }
  if (renderPopover) {
    setOpenAction(openAction !== index ? index : null);
  }
  if (onClick) {
    setOpenAction(null);
    onClick();
  }
};

interface Action {
  /**
   * Whether the icon is active.
   */
  active: boolean;
  /**
   * The color of the icon.
   */
  color?: string;
  /**
   * The name of the icon font.
   */
  iconName?: string;
  /**
   * Function called when user clicks the icon.
   */
  onClick?: () => void;
  /**
   * Popover content
   */
  renderPopover?: (a: (() => void)) => React.ReactElement;
  /**
   * The type of icon.
   */
  svg?: string;
  /**
   * Optional tooltip
   */
  tooltip?: string;
}

export interface ActionBarProps {
  /**
   * The list of action elements for the action bar.
   */
  actions: Action[];
  /**
   * Disabling all actions - no tooltip, no onClick and opacity 50%
   * */
  disabled?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Sets the orientation of the stack of elements
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Sets the box style of the action bar.
   */
  styling?: 'none' | 'box' | 'shadow';
}

/**
 * An action bar consists of a configurable number of action elements (e.g. icons) that user can interact with.
 *
 * Each action element in the action bar can be active or inactive; can have its own color and icon.
 * An icon can be either an icon font or an svg icon
 */
const ActionBar: React.FC<ActionBarProps> = ({
  actions,
  disabled = false,
  styling = 'shadow',
  loading = false,
  orientation = 'horizontal',
}: ActionBarProps) => {
  const [openAction, setOpenAction] = useState<number | null>(null);

  const loader = orientation === 'horizontal' ? (
    <div
      className={styles.loaderBox}
      style={{ height: 32, width: actions.length * 33 - 1 }}
    >
      <Loader type="inline" />
    </div>
  ) : (
    <div
      className={styles.loaderBox}
      style={{ width: 32, height: actions.length * 33 - 1 }}
    >
      <Loader type="inline" />
    </div>
  );

  if (!actions.length) {
    return null;
  }
  return (
    <div
      className={clsx(
        styles[`container-${orientation}`],
        { [styles.disabled]: (disabled && !loading) },
        { [styles[`box-${styling}`]]: (styling !== 'none') },
      )}
    >
      {loading ? loader : (
        actions.map((action: Action, index: number) => {
          const isSvgIcon = action.svg && action.svg.length > 0;
          const iconComponent = (
            <div
              className={clsx(styles.iconBox, { [styles.disabled]: !action.active })}
              onClick={() => handleOnClick(
                action.renderPopover,
                action.onClick,
                action.active,
                index,
                openAction,
                setOpenAction,
              )}
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

          const actionIcon = isSvgIcon ? action.svg : action.iconName;
          const actionComponent = action.renderPopover && action.active ? (
            <ArrowPopover
              key={actionIcon}
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
              className={styles[`borderContainer-${orientation}`]}
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
              {index < actions.length - 1 && <div className={styles[`border-${orientation}`]} />}
            </div>
          );
        })
      )}
    </div>
  );
};

ActionBar.displayName = 'Action Bar';

export default ActionBar;
