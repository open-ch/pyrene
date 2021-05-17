import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './buttonBar.css';
import { ButtonProps } from '../Button/Button';

export interface ButtonBarProps {
  noPadding?: boolean,
  leftButtonSectionElements?: ReactElement<ButtonProps>[],
  rightButtonSectionElements?: ReactElement<ButtonProps>[],
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  noPadding = false,
  leftButtonSectionElements = [],
  rightButtonSectionElements = [],
}: ButtonBarProps) => (
  <div className={clsx(styles.buttonBar, { [styles.noPadding]: noPadding })}>
    <div className={styles.leftButtonSection}>
      {leftButtonSectionElements.map((element) => (
        <React.Fragment key={`${element.props.type || 'undefined'}-${element.props.label as string}`}>
          {element}
          <div className={styles.spacer} />
        </React.Fragment>
      ))}
    </div>
    <div className={styles.rightButtonSection}>
      {rightButtonSectionElements.map((element, index) => (
        <React.Fragment key={`${element.props.type || 'undefined'}-${element.props.label as string}`}>
          {index !== 0 && <div className={styles.spacer} />}
          {element}
        </React.Fragment>
      ))}
    </div>
  </div>
);


ButtonBar.displayName = 'Button Bar';

export default ButtonBar;
