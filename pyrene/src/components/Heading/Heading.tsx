import React from 'react';
import clsx from 'clsx';

import styles from './Heading.module.css';
import Icon, { IconProps } from '../Icon/Icon';
import { IconNames } from '../types';

export interface HeadingProps {
  /**
   * The title string.
   */
  children: string;
  /**
   * Size level, corresponds to h1 - h4.
   */
  level?: 1 | 2 | 3 | 4;
  /**
   * Icon that goes before the text
   */
  icon?: keyof IconNames;
  /**
   * Sets the URL of the svg file.
   */
  svg?: string;
  /**
   * Sets the icon color. ( Hint: see colorConstants.js)
   */
  iconColor?: string;
}

// get the icon size based on Heading level
const mapIconSize = { 1: 'large', 2: 'large', 3: 'medium', 4: 'medium' } as Record<
  number,
  IconProps['size']
>;
/**
 * Section or page titles.
 */
const Heading: React.FC<HeadingProps> = ({
  children,
  icon,
  svg,
  level = 1,
  iconColor,
}: HeadingProps) => (
  <div
    className={clsx(styles[`heading${level}`], styles.heading, (icon || svg) && styles.withIcon)}
    title={children}
  >
    {(icon || svg) && (
      <Icon type="standalone" color={iconColor} name={icon} svg={svg} size={mapIconSize[level]} />
    )}
    {children}
  </div>
);

Heading.displayName = 'Heading';

export default Heading;
