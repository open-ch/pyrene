import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import './iconActionBar.css';

/**
 * An icon action bar is an action bar with a configurable number of icon buttons.
 *
 * Each icon button in the action bar can be active or inactive, ancolorConstantsd can be clicked.
 */
const IconActionBar = (props) => {
  // Work out the correct box style
  let boxStyle = '';
  if (props.boxStyle === 'shadow') {
    boxStyle = 'shadowBox';
  } else if (props.boxStyle === 'box') {
    boxStyle = 'borderBox';
  }
  const notBoxed = boxStyle.length === 0;

  return (
    <div styleName={classNames('container', boxStyle)}>
      {props.icons.map((icon, index) => {
        // Work out the correct hover style
        let boxHoverStyle = '';
        if (icon.active) {
          boxHoverStyle = notBoxed ? '' : 'btnOnHover';
        }
        const borderRightStyle = (index === props.icons.length - 1 || notBoxed) ? '' : 'borderRight';
        const iconHoverStyle = notBoxed ? 'iconOnHover' : '';

        // Work out the correct opacity style
        const opacityStyle = icon.active ? '' : 'semiOpaque';

        return (
          <div
            key={icon.icon}
            styleName={classNames('iconBox', boxHoverStyle)}
            onClick={notBoxed ? () => {} : icon.onClick}
          >
            <div styleName={classNames('iconSpan', borderRightStyle)}>
              <div
                styleName={classNames('icon', iconHoverStyle, opacityStyle)}
                onClick={notBoxed ? icon.onClick : () => {}}
              >
                <Icon color={icon.color} icon={icon.icon} iconType={icon.iconType} type="inline" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

IconActionBar.displayName = 'Icon Action Bar';

IconActionBar.defaultProps = {
  boxStyle: 'shadow',
};

IconActionBar.propTypes = {
  /**
   * Whether the action bar should be boxed.
   */
  boxStyle: PropTypes.oneOf(['none', 'box', 'shadow']),
  /**
   * The list of icons for the action bar.
   */
  icons: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Whether the icon is active.
     */
    active: PropTypes.bool.isRequired,
    /**
     * The color of the icon.
     */
    color: PropTypes.string,
    /**
     * The name of the icon.
     */
    icon: PropTypes.string.isRequired,
    /**
     * The type of the icon.
     */
    iconType: PropTypes.oneOf(['font', 'svg']),
    /**
     * Function called when user clicks the icon.
     */
    onClick: PropTypes.func.isRequired,
  })).isRequired,
};

export default IconActionBar;
