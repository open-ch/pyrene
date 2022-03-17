import React, { useState } from 'react';
import clsx from 'clsx';

import { copyStringToClipboard } from '../Utils';
import styles from './IconBox.module.css';

interface IconBoxProps {
  disabled?: boolean;
  downloadable?: boolean;
  name: string;
  path?: string;
}

const displayTime = 1000;

const IconBox: React.FC<IconBoxProps> = (props) => {
  const [displayCopyNotification, setNotification] = useState(false);
  const displayCopyNotifier = () => {
    setNotification(true);
    setTimeout(() => setNotification(false), displayTime);
  };

  return (
    <div
      className={clsx(styles.iconBox, { [styles.disabled]: props.disabled })}
      onClick={() => {
        if (!props.downloadable) {
          displayCopyNotifier();
          copyStringToClipboard(props.name);
        }
      }}
    >
      {props.name && !props.downloadable ? (
        <span className={clsx(styles.icon, `pyreneIcon-${props.name}`)} />
      ) : (
        <span className={styles.svg} style={{ backgroundImage: `url("${props.path}")` }} />
      )}

      <span className={styles.iconBoxTooltip}>{props.name}</span>
      <span
        className={clsx(styles.copyNotification, {
          [styles.display]: displayCopyNotification,
        })}
      >
        Copied
      </span>
    </div>
  );
};

IconBox.displayName = 'IconBox';
export default IconBox;
