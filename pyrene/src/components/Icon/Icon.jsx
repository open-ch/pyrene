import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-svg-inline';
import colorConstants from '../../styles/colorConstants';
import './icon.css';

/**
 * IconFont or SVG icon Wrapper. Pass Icon color and icon name or node.
 */
const Icon = props => (
  <div styleName={`type-${props.type}`}>
    {props.iconType === 'font' && <div styleName="icon" className={`pyreneIcon-${props.icon}`} style={{ color: (props.color in colorConstants) ? colorConstants[props.color] : props.color }} />}
    {props.iconType === 'svg' && <SVG svg={props.icon} />}
  </div>
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  color: 'neutral300',
  iconType: 'font',
  type: 'inline',
};

Icon.propTypes = {
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  color: PropTypes.string,
  /**
   * Sets the icon font or svg.
   */
  icon: PropTypes.string.isRequired,
  /**
   * Sets the type of the icon, i.e. whether it is an icon font or an svg element.
   */
  iconType: PropTypes.oneOf(['font', 'svg']),
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Icon;
