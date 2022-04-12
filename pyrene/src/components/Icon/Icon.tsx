/* eslint-disable react/require-default-props */
import React from 'react';
import clsx from 'clsx';
import colorConstants from '../../styles/colorConstants';
import styles from './Icon.module.css';
import { IconNames } from '../types';

export interface IconProps {
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  color?: string;
  /**
   * Sets the name of the icon font.
   */
  name?: keyof IconNames;
  /**
   * Sets the URL of the svg file.
   */
  svg?: string;
  /**
   * Sets the overall style.
   */
  type?: 'standalone' | 'inline';
  /**
   * Sets size of the icon
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

/**
 * IconFont or SVG icon Wrapper. When using icon font, pass Icon color and icon
 * name; when using SVG, pass in file name of the SVG.
 */
const Icon: React.FC<IconProps> = ({
  color = 'neutral300',
  type = 'inline',
  name,
  svg = '',
  size = 'medium',
}: IconProps) =>
  svg?.length > 0 ? (
    <div className={clsx(styles.icon, styles[`type-${type}`], styles[size])}>
      <img className={styles.svgIcon} src={svg} alt="icon" />
    </div>
  ) : (
    <div
      className={clsx(styles.icon, styles[size], styles[`type-${type}`], {
        [`pyreneIcon-${name || ''}`]: name,
      })}
      style={{
        color:
          color in colorConstants
            ? colorConstants[color as keyof typeof colorConstants]
            : color,
      }}
    />
  );

Icon.displayName = 'Icon';

export default Icon;
