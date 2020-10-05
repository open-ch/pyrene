/* eslint-disable react/no-unused-prop-types */ /* With the way the assign default props, it doesn't work */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SVG from 'react-svg-inline';

import './radioSelection.css';

import iconNormal from './radio-blank.svg';
import iconNormalHover from './radio-hover.svg';
import iconSelected from './radio-selected.svg';
import iconSelectedHover from './radio-selected-hover.svg';
import iconInvalid from './radio-invalid.svg';
import iconInvalidHover from './radio-invalid-hover.svg';

interface RadioGroupOption {
  label: string,
  value: number | string,
}

export interface RadioGroupProps {
  /**
   * Sets the orientation of the radio group.
   */
  alignment?: 'vertical' | 'horizontal',
  /**
   * Disables any interaction with the component.
   */
  disabled?: boolean,
  /**
   * Sets the visual appearance, to signal that the input is invalid.
   */
  invalid?: boolean,
  /**
   * Sets the html name property of the form element.
   */
  name?: string,
  /**
   * Javascript event handler.
   */
  onBlur?: () => void, // FixMe
  /**
   * Javascript event handler.
   */
  onChange?: (value: number | string, event?: React.ChangeEvent<HTMLInputElement>) => void, // FixMe
  /**
   * Set the values that the user can choose from.
   */
  options?: RadioGroupOption[],
  /**
   * Sets the selected choice of the user.
   */
  value?: number | string,
}


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

const getRadioIcon = (
  { checked, disabled, invalid }: {checked: boolean, disabled: boolean, invalid: boolean},
  hovered?: boolean,
) => {
  const iconKey = !disabled && hovered ? 'hover' : 'default';
  let icon = iconMap.normal[iconKey];
  if (invalid) {
    icon = iconMap.invalid[iconKey];
  } else if (checked) {
    icon = iconMap.checked[iconKey];
  }
  return <SVG svg={icon} />;
};

type HoveredState = {[key: string]: boolean};

// Make sure that default props are understood by the linter, typescript, react-docgen and proptypes.
type StrictRadioGroupProps = {[key in keyof RadioGroupProps]-?: NonNullable<RadioGroupProps[key]>};

const defaultProps: StrictRadioGroupProps = {
  options: [],
  disabled: false,
  alignment: 'vertical',
  value: '',
  invalid: false,
  name: '',
  onChange: () => null,
  onBlur: () => null,
};

/**
 * Radio buttons allow the user to select an option from a set.
 * Use radio buttons if the user wants to see all available options.
 *
 * If the available options can be collapsed, you should use a drop-down menu because it takes up less space.
 */
const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    options,
    disabled,
    alignment,
    value,
    invalid,
    name,
    onChange,
    onBlur,
  } = { ...defaultProps, ...props }; // needed so we can use the default props as static too.

  const [hovered, setHovered] = React.useState<HoveredState>({});

  const onMouseEnter = (key: string) => setHovered((prevHovered) => ({
    ...prevHovered,
    [key]: true,
  }));

  const onMouseLeave = (key: string) => {
    setHovered(({ [key]: prev, ...prevHovered }) => prevHovered);
  };

  const rand = Math.floor(Math.random() * 1e10);
  const lastElementIndex = options.length - 1;

  return (
    <div
      styleName={classNames('radioSelectionContainer', { [`alignment-${alignment}`]: true })}
      onBlur={onBlur}
      id={name}
    >
      {options.map((option, index) => {
        const key = `radio_${option.label}_${option.value}`;
        const htmlId = `${key}_${rand}`;
        return (
          <React.Fragment key={key}>
            <div
              className="radioContainer"
              onMouseEnter={() => onMouseEnter(key)}
              onMouseLeave={() => onMouseLeave(key)}
            >
              <input
                styleName="radioInput"
                checked={value === option.value}
                id={htmlId}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, event)}
                type="radio"
                value={option.value}
                name={name}
              />

              <label
                htmlFor={htmlId}
                styleName={
                  classNames('radioLabel',
                    { disabled: disabled })
                }
              >
                <span styleName="radioIcon">
                  {getRadioIcon({
                    checked: value === option.value,
                    disabled: disabled,
                    invalid: invalid,
                  }, hovered[key])}
                </span>
                {option.label}
              </label>
            </div>
            {index !== lastElementIndex && <div styleName={classNames({ [`spacer-${alignment}`]: true })} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};


RadioGroup.displayName = 'Radio Group';

// Specify defaultProps for react-docgen and propTypes
RadioGroup.defaultProps = defaultProps;

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
  }).isRequired),
  /**
   * Sets the selected choice of the user.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RadioGroup;
