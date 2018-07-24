import React from 'react';
import PropTypes from 'prop-types';

import './counter.css';


export default class Counter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      lastProps: {
        value: props.value,
      },
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastProps.value !== nextProps.value) {
      return {
        value: nextProps.value,
        lastProps: {
          value: nextProps.value,
        },
      };
    }
    // No State Change
    return null;
  }


  adjustBounds(value) {
    if (this.props.maxvalue && value > this.props.maxvalue) {
      return this.props.maxvalue;
    }
    if (this.props.minvalue && value < this.props.minvalue) {
      return this.props.minvalue;
    }
    return value;
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
      value: newValue,
    }),
    () => this.props.onChange(newValue)
    );
  }

  changeCounterBy(value) {
    this.setState((prevState, props) => ({
      value: this.adjustBounds(prevState.value + value),
    }),
    () => this.props.onChange(this.state.value)
    );
  }


  render() {
    return (
      <div styleName={'counter'}>
        <div className={'unSelectable'} styleName={'modifier'} onClick={() => this.changeCounterBy(-1)}>-</div>
        <input styleName={'valueDisplay'} type={'text'} onChange={event => this.handleInputChange(event)} value={this.state.value} autoComplete="nope" />
        <div className={'unSelectable'} styleName={'modifier'} onClick={() => this.changeCounterBy(1)}>+</div>
      </div>
    );
  }

}

Counter.displayName = 'Counter';

Counter.defaultProps = {
  minvalue: null,
  maxvalue: null,
  onChange: () => null,
};

Counter.propTypes = {
  minvalue: PropTypes.number,
  maxvalue: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
