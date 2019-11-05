import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';

import SVG from 'react-svg-inline';

import iconNormal from './radio-blank.svg';
import iconNormalHover from './radio-hover.svg';
import iconSelected from './radio-selected.svg';
import iconSelectedHover from './radio-selected-hover.svg';
import iconInvalid from './radio-invalid.svg';
import iconInvalidHover from './radio-invalid-hover.svg';

const iconMap = {
  normal: {
    default: iconNormal,
    hover: iconNormalHover,
  },
  checked: {
    default: iconSelected,
    hover: iconSelectedHover,
  },
  invalid: {
    default: iconInvalid,
    hover: iconInvalidHover,
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
 * Radio buttons allow the user to select an option from a set.
 * Use radio buttons if the user wants to see all available options.
 *
 * If the available options can be collapsed, you should use a drop-down menu because it takes up less space.
 */
class RadioGroup extends Component {

  constructor() {
    super();
    this.state = {
      hovered: {},
    };
  }

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

  render() {
    const rand = Math.floor(Math.random() * 1e10);
    const lastElementIndex = this.props.options.length - 1;

    return (
      <div
        styleName={classNames('radioSelectionContainer', { [`alignment-${this.props.alignment}`]: true })}
        onBlur={this.props.onBlur}
        id={this.props.name}
      >
        {this.props.options.map((option, index) => {
          const key = `radio_${option.label}_${option.value}`;
          const htmlId = `${key}_${rand}`;
          return (
            <React.Fragment key={key}>
              <div
                className="radioContainer"
                onMouseEnter={() => this.onMouseEnter(key)}
                onMouseLeave={() => this.onMouseLeave(key)}
              >
                <input
                  styleName="radioInput"
                  checked={this.props.value === option.value}
                  id={htmlId}
                  onChange={(event) => this.props.onChange(event.target.value, event)}
                  type="radio"
                  value={option.value}
                  name={this.props.name}
                />

                <label
                  htmlFor={htmlId}
                  styleName={
                    classNames('radioLabel',
                      { disabled: this.props.disabled })
                  }
                >
                  <span styleName="radioIcon">
                    {getRadioIcon({
                      checked: this.props.value === option.value,
                      disabled: this.props.disabled,
                      invalid: this.props.invalid,
                    }, this.state.hovered[key])}
                  </span>
                  {option.label}
                </label>
              </div>
              {index !== lastElementIndex && <div styleName={classNames({ [`spacer-${this.props.alignment}`]: true })} />}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

}

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
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })),
  /**
   * Sets the selected choice of the user.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RadioGroup;
