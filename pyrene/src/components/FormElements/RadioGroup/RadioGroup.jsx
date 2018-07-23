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
    <div styleName={classNames('radioSelectionContainer', { [`alignment-${props.alignment}`]: true }, { invalid: props.invalid && !props.selectedOption })}>
      {props.radioLabels.map((radioLabel, index) => (
        <React.Fragment key={`radio_${radioLabel}`}>
          <div className={'radioContainer'}>
            <input
              styleName={'radioInput'}
              checked={props.value === radioLabel}
              name={props.name}
              id={`radio_${radioLabel}_${rand}`}
              onChange={props.onChange}
              type="radio"
              value={radioLabel}
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
};

RadioGroup.propTypes = {
  /**
   * Specifies the orientation of the radio group.
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Changes the visual appearance, to signal that the usage was invalid.
   */
  invalid: PropTypes.bool,
  /**
   * Sets the html name property of the form element.
   */
  name: PropTypes.string,
  /**
   * Event handler.
   */
  onChange: PropTypes.func,
  /**
   * Specifies the different choices and values.
   */
  radioLabels: PropTypes.arrayOf(PropTypes.string),
  /**
   * Specifies a radio that is checked on page load.
   */
  value: PropTypes.string,
};

RadioGroup.examples = [
  { alignment: 'vertical', radioLabels: ['option 1', 'option 2', 'option 3'] },
  { alignment: 'horizontal', radioLabels: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'] },
];

export default RadioGroup;