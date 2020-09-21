import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './toggleButtonGroup.css';

export interface ToggleButtonGroupValue {
  id: string;
  label: string;
}

export interface ToggleButtonGroupProps {
  disabled?: boolean,
  onClick: (value: ToggleButtonGroupValue) => void,
  selected: string,
  values: ToggleButtonGroupValue[],
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => (
  <div styleName="toggleButtonGroup">
    {props.values.map((value) => (
      <button
        id={value.id}
        key={value.id}
        type="button"
        styleName={
          classNames(
            { disabled: props.disabled },
            { active: props.selected === value.id },
          )
        }
        disabled={props.disabled}
        onClick={() => {
          if (props.selected !== value.id) {
            props.onClick(value);
          }
        }}
      >
        <span>
          {value.label}
        </span>
      </button>
    ))}
  </div>
);

ToggleButtonGroup.displayName = 'Toggle Button Group';

ToggleButtonGroup.defaultProps = {
  disabled: false,
};

ToggleButtonGroup.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default ToggleButtonGroup;
