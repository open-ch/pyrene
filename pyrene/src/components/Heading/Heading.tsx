import React, { useCallback } from 'react';
import clsx from 'clsx';

import styles from './Heading.module.css';
import Icon, { IconProps } from '../Icon/Icon';
import { IconNames } from '../types';
import Tooltip from '../Tooltip/Tooltip';
import CopyIcon from '../CopyIcon/CopyIcon';

export interface HeadingProps {
  /**
   * The title as a string.
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
  /**
   * Sets the icon tooltip text.
   */
  iconTooltip?: string;
  /**
   * Enables the copying capability.
   */
  copy?: boolean;
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
  copy = false,
  iconTooltip,
}: HeadingProps) => {
  const returnIcon = useCallback(
    () => (
      <Icon type="standalone" color={iconColor} name={icon} svg={svg} size={mapIconSize[level]} />
    ),
    [icon, iconColor, level, svg]
  );

  return (
    <div
      className={clsx(
        styles[`heading${level}`],
        styles.heading,
        (icon || svg || copy) && styles.withIcon
      )}
      title={children}
    >
      {(icon || svg) &&
        (iconTooltip ? (
          <Tooltip label={iconTooltip} preferredPosition={['top', 'bottom']}>
            {returnIcon()}
          </Tooltip>
        ) : (
          returnIcon()
        ))}
      {children}
      {copy && <CopyIcon size={mapIconSize[level]} valueToCc={children} />}
    </div>
  );
};

Heading.displayName = 'Heading';

export default Heading;
