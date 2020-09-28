import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './toggleButtonGroup.css';

export interface ToggleButtonGroupValue {
  label: string;
  value: string;
}

export interface ToggleButtonGroupProps {
  disabled?: boolean,
  // onChange: (value: ToggleButtonGroupValue) => void,
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  options: ToggleButtonGroupValue[],
  styling?: 'box' | 'shadow'
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => (

  <div styleName={classNames('toggleButtonGroup', `box-${props.styling}`)}>
    {props.options.map((option) => (
      <button
        id={option.value}
        key={option.value}
        type="button"
        styleName={
          classNames(
            { disabled: props.disabled },
            { active: props.value === option.value },
          )
        }
        disabled={props.disabled}
        onClick={() => {
          if (props.value !== option.value) {
            props.onChange(option.value);
          }
        }}
      >
        <span>
          {option.label}
        </span>
      </button>
    ))}
  </div>
);

ToggleButtonGroup.displayName = 'Toggle Button Group';

ToggleButtonGroup.defaultProps = {
  disabled: false,
  styling: 'box',
};

ToggleButtonGroup.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  styling: PropTypes.oneOf(['box', 'shadow']),
  value: PropTypes.string.isRequired,
};

export default ToggleButtonGroup;
