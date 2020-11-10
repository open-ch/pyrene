/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';
import colorConstants from '../../styles/colorConstants';
import './icon.css';

export interface IconProps {
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  color?: string;
  /**
   * Sets the name of the icon font.
   */
  name?: string;
  /**
   * Sets the URL of the svg file.
   */
  svg?: string;
  /**
   * Sets the overall style.
   */
  type?: 'standalone' | 'inline'
}

/**
 * IconFont or SVG icon Wrapper. When using icon font, pass Icon color and icon name; when using SVG, pass in file name of the SVG.
 */
const Icon: React.FC<IconProps> = ({
  color = 'neutral300',
  type = 'inline',
  name = '',
  svg = '',
}: IconProps) => (
  svg.length > 0 ? (
    <div styleName={classNames('icon', `type-${type}`)}>
      <img styleName="svgIcon" src={svg} alt="icon" />
    </div>
  ) : (
    <div
      styleName={classNames('icon', `type-${type}`)}
      className={`pyreneIcon-${name}`}
      style={{ color: color in colorConstants ? colorConstants[color as keyof typeof colorConstants] : color }}
    />
  )
);

Icon.displayName = 'Icon';


export default Icon;
