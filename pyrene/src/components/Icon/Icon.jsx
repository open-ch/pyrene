import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import colorConstants from '../../styles/colorConstants';
import './icon.css';

/**
 * IconFont or SVG icon Wrapper. When using icon font, pass Icon color and icon name; when using SVG, pass in file name of the SVG.
 */
const Icon = (props) => {
  const isSvg = props.icon.includes('/');
  if (isSvg) {
    return (
      <div styleName={classNames('icon', `type-${props.type}`)}>
        <img styleName="svgIcon" src={props.icon} alt="icon" />
      </div>
    );
  }
  return (
    <div
      styleName={classNames('icon', `type-${props.type}`)}
      className={`pyreneIcon-${props.icon}`}
      style={{ color: (props.color in colorConstants) ? colorConstants[props.color] : props.color }}
    />
  );
};

Icon.displayName = 'Icon';

Icon.defaultProps = {
  color: 'neutral300',
  type: 'inline',
};

Icon.propTypes = {
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  color: PropTypes.string,
  /**
   * Sets the name of the icon or the file name of the svg icon.
   */
  icon: PropTypes.string.isRequired,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Icon;
