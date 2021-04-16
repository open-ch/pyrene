import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './colorBox.css';

const ColorBox = (props) => (
  <div styleName={classNames('colorBoxContainer', { [`${props.size}`]: true })} style={props.style ?? props.style}>
    <div
      styleName={classNames('colorBox', { [`stack-${props.stackPosition}`]: props.stackPosition }, { [`size-${props.size}`]: true }, { darkFont: props.darkFont }, { bordered: props.bordered })}
      style={{ backgroundColor: `var(--${props.variableName})` }}
    ></div>

    {    

      props.infoBox && Object.keys(props.infoBox).length > 0 &&
        <div styleName={classNames('infoBox', { [`${props.size}`]: true })}>
          {props.infoBox.infoTitle && <div styleName={classNames('colorName', { [`${props.size}`]: true })}>{props.infoBox.infoTitle}</div>}
          {props.infoBox.infoText && <div styleName={classNames('variableName', { [`${props.size}`]: true })}>{props.infoBox.infoText}</div> }
          {props.infoBox.infoLabel && <div styleName={classNames('infoLabel', { [`${props.size}`]: true })}>{props.infoBox.infoLabel}</div>}
        </div>
    }
  </div>
);

ColorBox.displayName = 'ColorBox';

ColorBox.propTypes = {
  bordered: PropTypes.bool,
  colorName: PropTypes.string,
  darkFont: PropTypes.bool,
  hexValue: PropTypes.string,
  infoBox: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'single']),
  variableName: PropTypes.string,
};

ColorBox.defaultProps = {
  bordered: false,
  darkFont: false,
  colorName: '',
  variableName: '',
  hexValue: '',
  infoBox: {},
  size: 'large',
  stackPosition: 'single',
};

export default ColorBox;
