import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';

/**
 * Radio groups are used primarily on ....
 */
const RadioGroup = (props) => {
  const rand = Math.floor(Math.random() * 1e10);
  const lastElementIndex = props.options.length - 1;
  return (
    <div
      styleName={classNames('radioSelectionContainer', { [`alignment-${props.alignment}`]: true }, { invalid: props.invalid && !props.selectedOption })}
      tabIndex={0}
      onBlur={props.onBlur}
      id={props.name}
    >
      {props.options.map((option, index) => (
        <React.Fragment key={`radio_${option.label}_${option.value}`}>
          <div className={'radioContainer'}>
            <input
              styleName={'radioInput'}
              checked={props.value === option.value}
              id={`radio_${option.label}_${option.value}_${rand}`}
              onChange={props.onChange}
              type="radio"
              value={option.value}
              name={props.name}
            />

            <label
              htmlFor={`radio_${option.label}_${option.value}_${rand}`}
              styleName={
                classNames('radioLabel',
                  { checked: props.value === option.value },
                  { disabled: props.disabled })}
            >
              <span styleName={'radioIcon'} />
              {option.label}
            </label>
          </div>
          {index !== lastElementIndex && <div styleName={classNames({ [`spacer-${props.alignment}`]: true })} />}
        </React.Fragment>
      ))}
    </div>
  );
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