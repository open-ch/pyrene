import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './horizontalSwitch.css';

const HorizontalSwitch = (props) => (
  <div styleName="horizontalSwitch">
    {props.values.map((value) => (
      <button
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

HorizontalSwitch.defaultProps = {
  disabled: false,
};

HorizontalSwitch.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default HorizontalSwitch;
