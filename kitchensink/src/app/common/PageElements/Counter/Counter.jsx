import React from 'react';
import PropTypes from 'prop-types';

import './counter.css';


const Counter = (props) => {

  const adjustBounds = (value) => {
    if (props.maxvalue && value > props.maxvalue) {
      return props.maxvalue;
    }
    if (props.minvalue && value < props.minvalue) {
      return props.minvalue;
    }
    return value;
  };

  const handleInputChange = (event) => {
    let newValue = event.target.value;
    newValue = newValue.match(/\d+/g);
    if (newValue !== null) {
      newValue = parseInt(newValue.join(''), 10);
    }
    props.onChange(adjustBounds(newValue), { target: { name: props.name, value: adjustBounds(newValue), type: 'counter' } });
  };

  const changeCounterBy = (value) => {
    props.onChange(adjustBounds(props.value + value), { target: { name: props.name, value: adjustBounds(props.value + value), type: 'counter' } });
  };

  return (
    <div styleName="counter">
      <div className="unSelectable" styleName="modifier" onClick={() => changeCounterBy(-1)}>-</div>
      <input styleName="valueDisplay" type="text" onChange={handleInputChange} value={props.value ?? ''} autoComplete="nope" />
      <div className="unSelectable" styleName="modifier" onClick={() => changeCounterBy(1)}>+</div>
    </div>
  );

};

Counter.displayName = 'Counter';

Counter.defaultProps = {
  name: '',
  minvalue: null,
  maxvalue: null,
  onChange: () => null,
  value: null,
};

Counter.propTypes = {
  maxvalue: PropTypes.number,
  minvalue: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default Counter;
