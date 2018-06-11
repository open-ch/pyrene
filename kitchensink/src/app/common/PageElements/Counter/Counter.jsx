import React from 'react';
import PropTypes from 'prop-types';

import './counter.css';


export default class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      number: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.number !== nextProps.number) {
      return {
        number: nextProps.number,
      };
    }
    // No State Change
    return null;
  }

  adjustBounds(number) {
    if (this.props.maxNumber && number > this.props.maxNumber) {
      return this.props.maxNumber;
    }
    if (this.props.minNumber && number < this.props.minNumber) {
      return this.props.minNumber;
    }
    return number;
  }

  handleInputChange(event) {
    let newValue = event.target.value;
    newValue = newValue.match(/\d+/g);
    if (newValue !== null) {
      newValue = parseInt(newValue.join(''), 10);
    } else {
      newValue = 0;
    }

    newValue = this.adjustBounds(newValue);

    this.setState((prevState, props) => ({
      number: newValue,
    }),
    () => this.props.onChange(newValue)
    );
  }

  changeCounterBy(number) {
    this.setState((prevState, props) => ({
      number: this.adjustBounds(prevState.number + number),
    }),
    () => this.props.onChange(this.state.number)
    );
  }


  render() {
    return (
      <div styleName={'counter'}>
        <div className={'unSelectable'} styleName={'modifier decrement'} onClick={() => this.changeCounterBy(-1)}>-</div>
        <input styleName={'numberDisplay'} type={'text'} onChange={event => this.handleInputChange(event)} value={this.state.number} autoComplete="nope" />
        <div className={'unSelectable'} styleName={'modifier increment'} onClick={() => this.changeCounterBy(1)}>+</div>
      </div>
    );
  }

}

Counter.displayName = 'Counter';

Counter.defaultProps = {
  minNumber: null,
  maxNumber: null,
  onChange: () => null,
};

Counter.propTypes = {
  minNumber: PropTypes.number,
  maxNumber: PropTypes.number,
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
