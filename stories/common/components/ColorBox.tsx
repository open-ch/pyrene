import React from 'react';
import clsx from 'clsx';

import styles from './ColorBox.module.css';

export type Size = 'small' | 'medium' | 'large';
export type StackPosition = 'top' | 'middle' | 'bottom' | 'single';

interface ColorBoxProps {
  bordered?: boolean;
  centered?: boolean;
  darkFont?: boolean;
  infoBox?: {
    infoLabel?: string;
    infoText?: string;
    infoTitle?: string;
  };
  size?: Size;
  stackPosition?: StackPosition;
  variableName: string;
}

const ColorBox: React.FC<ColorBoxProps> = (
  props = {
    bordered: false,
    centered: true,
    darkFont: false,
    size: 'large',
    stackPosition: 'single',
    variableName: '',
  }
) => (
  <div
    className={clsx(styles.colorBoxContainer, styles[props.size], {
      [styles['left-box']]: !props.centered,
    })}
  >
    <div
      className={clsx(styles.colorBox, styles[`size-${props.size}`], {
        [styles[`stack-${props.stackPosition}`]]: props.stackPosition,
        [styles.darkFont]: props.darkFont,
        [styles.bordered]: props.bordered,
      })}
      style={{ backgroundColor: `var(--${props.variableName})` }}
    />
    {props.infoBox && Object.keys(props.infoBox).length > 0 && (
      <div className={clsx(styles.infoBox, styles[props.size])}>
        {props.infoBox.infoTitle && (
          <div className={clsx(styles.colorName, styles[props.size])}>
            {props.infoBox.infoTitle}
          </div>
        )}
        {props.infoBox.infoText && (
          <div className={clsx(styles.variableName, styles[props.size])}>
            {props.infoBox.infoText}
          </div>
        )}
        {props.infoBox.infoLabel && (
          <div className={clsx(styles.infoLabel, styles[props.size])}>
            {props.infoBox.infoLabel}
          </div>
        )}
      </div>
    )}
  </div>
);

ColorBox.displayName = 'ColorBox';
export default ColorBox;
