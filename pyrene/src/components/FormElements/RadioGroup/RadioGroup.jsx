import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './radioSelection.css';

/**
 * Radio groups are used primarily on ....
 */
const RadioGroup = (props) => {
  const rand = Math.floor(Math.random() * 1e10);
  const lastElementIndex = props.radioLabels.length - 1;
  return (
    <div
      styleName={classNames('radioSelectionContainer', { [`alignment-${props.alignment}`]: true }, { invalid: props.invalid && !props.selectedOption })}
      tabIndex={0}
      onBlur={props.onBlur}
      id={props.name}
    >
      {props.radioLabels.map((radioLabel, index) => (
        <React.Fragment key={`radio_${radioLabel}`}>
          <div className={'radioContainer'}>
            <input
              styleName={'radioInput'}
              checked={props.value === radioLabel}
              id={`radio_${radioLabel}_${rand}`}
              onChange={props.onChange}
              type="radio"
              value={radioLabel}
              name={props.name}
            />

            <label
              htmlFor={`radio_${radioLabel}_${rand}`}
              styleName={
                classNames('radioLabel',
                  { checked: (props.value === radioLabel) },
                  { disabled: props.disabled })}
            >
              <span styleName={'radioIcon'} />
              {radioLabel}
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
  radioLabels: [],
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
  radioLabels: PropTypes.arrayOf(PropTypes.string),
  /**
   * Sets the selected choice of the user.
   */
  value: PropTypes.string,
};

RadioGroup.examples = [
  { alignment: 'vertical', radioLabels: ['option 1', 'option 2', 'option 3'] },
  { alignment: 'horizontal', radioLabels: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'] },
];

export default RadioGroup;