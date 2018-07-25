import React from 'react';
import PropTypes from 'prop-types';

import './counter.css';


export default class Counter extends React.Component {

  adjustBounds = (value) => {
    if (this.props.maxvalue && value > this.props.maxvalue) {
      return this.props.maxvalue;
    }
    if (this.props.minvalue && value < this.props.minvalue) {
      return this.props.minvalue;
    }
    return value;
  };

  handleInputChange = (event) => {
    let newValue = event.target.value;
    newValue = newValue.match(/\d+/g);
    if (newValue !== null) {
      newValue = parseInt(newValue.join(''), 10);
    } else {
      newValue = 0;
    }

    this.props.onChange({target: {name: this.props.name, value: this.adjustBounds(newValue), type: 'counter'}});
  };

  changeCounterBy = (value) => {
    this.props.onChange({target: {name: this.props.name, value: this.adjustBounds(this.props.value + value), type: 'counter'}});
  };


  render() {
    return (
      <div styleName={'counter'}>
        <div className={'unSelectable'} styleName={'modifier'} onClick={() => this.changeCounterBy(-1)}>-</div>
        <input styleName={'valueDisplay'} type={'text'} onChange={this.handleInputChange} value={this.props.value} autoComplete="nope" />
        <div className={'unSelectable'} styleName={'modifier'} onClick={() => this.changeCounterBy(1)}>+</div>
      </div>
    );
  }

}

Counter.displayName = 'Counter';

Counter.defaultProps = {
  name: '',
  minvalue: null,
  maxvalue: null,
  onChange: () => null,
};

Counter.propTypes = {
  maxvalue: PropTypes.number,
  minvalue: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired,
};
