import React from 'react';

import Icon from '../Icon/Icon';
import { IconNames } from '../types';

import styles from './TextWithIcon.module.css';

export interface TextWithIconProps {
  icon: keyof IconNames;
  label: string;
  color?: string;
}

const TextWithIcon: React.FC<TextWithIconProps> = ({ icon, color, label }) => (
  <div className={styles.textWithIcon}>
    <Icon name={icon} color={color} />
    <span>{label}</span>
  </div>
);

export default TextWithIcon;
