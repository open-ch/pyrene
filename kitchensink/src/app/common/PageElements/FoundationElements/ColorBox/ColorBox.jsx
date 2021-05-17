import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './colorBox.css';

const ColorBox = (props) => (
  <div styleName={classNames('colorBoxContainer', props.size)} style={props.style}>
    <div
      styleName={classNames('colorBox', { [`stack-${props.stackPosition}`]: props.stackPosition }, `size-${props.size}`, { darkFont: props.darkFont }, { bordered: props.bordered })}
      style={{ backgroundColor: `var(--${props.variableName})` }}
    />
    {

      (Object.keys(props.infoBox || {}).length > 0)
        && (
          <div styleName={classNames('infoBox', props.size)}>
            {props.infoBox.infoTitle && <div styleName={classNames('colorName', props.size)}>{props.infoBox.infoTitle}</div>}
            {props.infoBox.infoText && <div styleName={classNames('variableName', props.size)}>{props.infoBox.infoText}</div> }
            {props.infoBox.infoLabel && <div styleName={classNames('infoLabel', props.size)}>{props.infoBox.infoLabel}</div>}
          </div>
        )
    }
  </div>
);

ColorBox.displayName = 'ColorBox';

ColorBox.propTypes = {
  bordered: PropTypes.bool,
  darkFont: PropTypes.bool,
  infoBox: PropTypes.shape({
    infoLabel: PropTypes.string,
    infoText: PropTypes.string,
    infoTitle: PropTypes.string,
  }),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  stackPosition: PropTypes.oneOf(['top', 'middle', 'bottom', 'single']),
  style: PropTypes.shape({}),
  variableName: PropTypes.string,
};

ColorBox.defaultProps = {
  bordered: false,
  darkFont: false,
  variableName: '',
  infoBox: {},
  size: 'large',
  stackPosition: 'single',
  style: {},
};

export default ColorBox;
