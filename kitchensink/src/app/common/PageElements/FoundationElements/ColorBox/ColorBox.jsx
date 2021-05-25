import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './colorBox.css';

const ColorBox = (props) => (
  <div className={clsx(styles.colorBoxContainer, styles[props.size], { [styles['left-box']]: !props.centered })}>
    <div
      className={clsx(styles.colorBox,
        styles[`size-${props.size}`],
        {
          [styles[`stack-${props.stackPosition}`]]: props.stackPosition,
          [styles.darkFont]: props.darkFont,
          [styles.bordered]: props.bordered,
        })}
      style={{ backgroundColor: `var(--${props.variableName})` }}
    />
    {

      (props.infoBox && Object.keys(props.infoBox).length > 0)
        && (
          <div className={clsx(styles.infoBox, styles[props.size])}>
            {props.infoBox.infoTitle && <div className={clsx(styles.colorName, styles[props.size])}>{props.infoBox.infoTitle}</div>}
            {props.infoBox.infoText && <div className={clsx(styles.variableName, styles[props.size])}>{props.infoBox.infoText}</div> }
            {props.infoBox.infoLabel && <div className={clsx(styles.infoLabel, styles[props.size])}>{props.infoBox.infoLabel}</div>}
          </div>
        )
    }
  </div>
);

ColorBox.displayName = 'ColorBox';

ColorBox.propTypes = {
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
  darkFont: PropTypes.bool,
  infoBox: PropTypes.shape({
    infoLabel: PropTypes.string,
    infoText: PropTypes.string,
    infoTitle: PropTypes.string,
  }),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'single']),
  variableName: PropTypes.string,
};

ColorBox.defaultProps = {
  bordered: false,
  centered: true,
  darkFont: false,
  variableName: '',
  infoBox: {},
  size: 'large',
  stackPosition: 'single',
};

export default ColorBox;
