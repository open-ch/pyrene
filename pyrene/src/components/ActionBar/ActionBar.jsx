import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';
import './actionBar.css';

/**
 * An action bar consists of a configurable number of action elements (e.g. icons) that user can interact with.
 *
 * Each action element in the action bar can be active or inactive; can have its own color and icon.
 * An icon can be either an icon font or an svg icon
 */
const ActionBar = (props) => (
  <div styleName={classNames('container', props.styling === 'none' ? '' : `box-${props.styling}`)}>
    { props.loading ? (
      <div styleName="loaderBox" style={{ height: 32, width: props.actions.length * 33 - 1 }}>
        <Loader type="inline" />
      </div>
    ) : props.actions.map((action, index) => {
      const isSvgIcon = action.svg && action.svg.length > 0;
      const iconComponent = (
        <div styleName={classNames('iconBox', { disabled: !action.active })} onClick={action.active ? action.onClick : () => {}}>
          {isSvgIcon ? <Icon color={action.color} svg={action.svg} type="inline" /> : <Icon color={action.color} name={action.iconName} type="inline" />}
        </div>
      );

      return (
        <div key={isSvgIcon ? action.svg : action.iconName} styleName="borderContainer">
          {action.tooltip ? <Tooltip preferredPosition={['top', 'bottom']} label={action.tooltip}>{iconComponent}</Tooltip> : iconComponent}
          {index < props.actions.length - 1 && <div styleName="border" />}
        </div>
      );
    })}
  </div>
);

ActionBar.displayName = 'Action Bar';

ActionBar.defaultProps = {
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
     * The type of icon.
     */
    svg: PropTypes.string,
    /**
     * Optional tooltip
     */
    tooltip: PropTypes.string,
  })).isRequired,
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
