import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './colorBox.css';

const ColorBox = props => (
  <div styleName={'colorBoxContainer'}>
    {props.title && <div styleName={'title'}>{props.title}</div>}
    <div
      styleName={classNames('colorBox', { [`stack-${props.stackPosition}`]: props.stackPosition }, {[`size-${props.size}`]: true }, {darkFont: props.darkFont}, {bordered: props.bordered})}
      style={{backgroundColor: `var(--${props.variableName})`}}
    >
      {props.colorName && <div styleName={'colorName'}>{props.colorName}</div>}
      <div styleName={'variableName'}> {props.variableName}</div>
      <div styleName={'hexValue'}>{props.hexValue}</div>
    </div>
    {props.infoLabel && <div styleName={'infoLabel'}>{props.infoLabel}</div>}
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
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'none']),
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
  stackPosition: 'none',
};

export default ColorBox;
