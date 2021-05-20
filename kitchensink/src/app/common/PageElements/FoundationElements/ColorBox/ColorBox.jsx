import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './colorBox.css';

const ColorBox = (props) => (
  <div className={styles.colorBoxContainer}>
    {props.title && <div className={styles.title}>{props.title}</div>}
    <div
      className={clsx(styles.colorBox, styles[`size-${props.size}`], { [styles[`stack-${props.stackPosition}`]]: props.stackPosition, [styles.darkFont]: props.darkFont, [styles.bordered]: props.bordered })}
      style={{ backgroundColor: `var(--${props.variableName})` }}
    >
      {props.colorName && <div className={styles.colorName}>{props.colorName}</div>}
      <div className={styles.variableName}>
        {' '}
        {props.variableName}
      </div>
      <div className={styles.hexValue}>{props.hexValue}</div>
    </div>
    {props.infoLabel && <div className={styles.infoLabel}>{props.infoLabel}</div>}
  </div>
);

ColorBox.displayName = 'ColorBox';

ColorBox.propTypes = {
  bordered: PropTypes.bool,
  colorName: PropTypes.string,
  darkFont: PropTypes.bool,
  hexValue: PropTypes.string,
  infoLabel: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'single']),
  title: PropTypes.string,
  variableName: PropTypes.string,
};

ColorBox.defaultProps = {
  bordered: false,
  darkFont: false,
  title: '',
  colorName: '',
  variableName: '',
  hexValue: '',
  infoLabel: '',
  size: 'large',
  stackPosition: 'single',
};

export default ColorBox;
