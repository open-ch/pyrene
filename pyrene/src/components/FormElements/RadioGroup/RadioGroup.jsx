import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';

import SVG from 'react-svg-inline';

import normal from './radio-blank.svg';
import normalHover from './radio-hover.svg';
import selected from './radio-selected.svg';
import selectedHover from './radio-selected-hover.svg';
import invalid from './radio-invalid.svg';
import invalidHover from './radio-invalid-hover.svg';

const iconMap = {
  normal: {
    default: normal,
    hover: normalHover,
  },
  checked: {
    default: selected,
    hover: selectedHover,
  },
  invalid: {
    default: invalid,
    hover: invalidHover,
  },
};

const getRadioIcon = (options, hovered) => {
  const { checked, disabled, invalid } = options;
  const iconKey = !disabled && hovered ? 'hover' : 'default';
  let icon = iconMap.normal[iconKey];
  if (invalid) {
    icon = iconMap.invalid[iconKey];
  } else if (checked) {
    icon = iconMap.checked[iconKey];
  }
  return <SVG svg={icon} />;
};

/**
 * Radio groups are used primarily on ....
 */
class RadioGroup extends Component {
  state = {
    hovered: {},
  };

  onMouseEnter = (key) => {
    this.setState((prevState) => ({
      hovered: {
        ...prevState.hovered,
        [key]: true,
      },
    }));
  };

  onMouseLeave = (key) => {
    this.setState((prevState) => ({
      hovered: {
        ...prevState.hovered,
        [key]: undefined,
      },
    }));
  };

  render () {
    const { props } = this;
    const rand = Math.floor(Math.random() * 1e10);
    const lastElementIndex = props.options.length - 1;

    return (
      <div
        styleName={classNames('radioSelectionContainer', { [`alignment-${props.alignment}`]: true }, { invalid: props.invalid && !props.selectedOption })}
        tabIndex={0}
        onBlur={props.onBlur}
        id={props.name}
      >
        {props.options.map((option, index) => {
          const key = `radio_${option.label}_${option.value}`;
          const htmlId = `${key}_${rand}`;
          return (
            <React.Fragment key={key}>
              <div
                className={'radioContainer'}
                onMouseEnter={() => this.onMouseEnter(key)}
                onMouseLeave={() => this.onMouseLeave(key)}
              >
                <input
                  styleName={'radioInput'}
                  checked={props.value === option.value}
                  id={htmlId}
                  onChange={props.onChange}
                  type="radio"
                  value={option.value}
                  name={props.name}
                />

                <label
                  htmlFor={htmlId}
                  styleName={
                    classNames('radioLabel',
                      { disabled: props.disabled })}
                >
                  <span styleName={'radioIcon'}>
                    {getRadioIcon({
                        checked: props.value === option.value,
                        disabled: props.disabled,
                        invalid: props.invalid && !props.selectedOption,
                      }, this.state.hovered[key])}
                  </span>
                  {option.label}
                </label>
              </div>
              {index !== lastElementIndex && <div styleName={classNames({ [`spacer-${props.alignment}`]: true })} />}
            </React.Fragment>
          );
        })}
      </div>
    )
}
};

RadioGroup.displayName = 'Radio Group';

RadioGroup.defaultProps = {
  disabled: false,
  options: [],
  alignment: 'vertical',
  value: '',
  invalid: false,
  name: '',
  onChange: () => null,
  onBlur: () => null,
};

RadioGroup.propTypes = {
  /**
   * Sets the orientation of the radio group.
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Javascript event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Javascript event handler.
   */
  onChange: PropTypes.func,
  /**
   * Set the values that the user can choose from.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
  })),
  /**
   * Sets the selected choice of the user.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RadioGroup;