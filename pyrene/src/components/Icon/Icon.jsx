import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import colorConstants from '../../styles/colorConstants';
import './icon.css';

/**
 * IconFont or SVG icon Wrapper. When using icon font, pass Icon color and icon name; when using SVG, pass in file name of the SVG.
 */
const Icon = (props) => (
  props.svg.length > 0 ? (
    <div styleName={classNames('icon', `type-${props.type}`)}>
      <img styleName="svgIcon" src={props.svg} alt="icon" />
    </div>
  ) : (
    <div
      styleName={classNames('icon', `type-${props.type}`)}
      className={`pyreneIcon-${props.name}`}
      style={{ color: (props.color in colorConstants) ? colorConstants[props.color] : props.color }}
    />
  )
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  color: 'neutral300',
  type: 'inline',
  name: '',
  svg: '',
};

Icon.propTypes = {
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  color: PropTypes.string,
  /**
   * Sets the name of the icon font.
   */
  name: PropTypes.string,
  /**
   * Sets the URL of the svg file.
   */
  svg: PropTypes.string,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['standalone', 'inline']),
};

export default Icon;
