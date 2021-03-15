import React from 'react';
import PropTypes from 'prop-types';

import ColorSquare from '../ColorSquare/ColorSquare';

import style from './colorBox.css';

const ColorBox = (props) => (
  <div styleName="colorBoxContainer">
    <ColorSquare
      variableName={props.variableName}
      size="large"
      bordered={props.bordered}
    />
    <div className={style.text}>
      {props.colorName && (
        <div
          className={style.colorName}
        >
          {props.colorName}
        </div>
      )}
      <div className={style.variableName}>
        {props.variableName}
      </div>
      {props.infoLabel
      && (
        <div styleName="infoLabel">
          {props.infoLabel}
        </div>
      )}
    </div>
  </div>
);

ColorBox.displayName = 'ColorBox';

ColorBox.propTypes = {
  bordered: PropTypes.bool,
  colorName: PropTypes.string,
  darkFont: PropTypes.bool,
  infoLabel: PropTypes.string,
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'single']),
  variableName: PropTypes.string.isRequired,
};

ColorBox.defaultProps = {
  bordered: false,
  darkFont: false,
  title: '',
  colorName: '',
  hexValue: '',
  infoLabel: '',
  size: 'large',
  stackPosition: 'single',
};

export default ColorBox;
