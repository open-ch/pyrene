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

  handleInputChange(event) {
    let newValue = event.target.value;
    newValue = newValue.match(/\d+/g);
    if (newValue !== null) {
      newValue = parseInt(newValue.join(''), 10);
    }
    this.setState((prevState, props) => ({
      number: newValue,
    }));
  }

  render() {
    return (
      <div styleName={'counter'}>
        <div className={'unSelectable'} styleName={'modifier decrement'}>-</div>
        <input styleName={'numberDisplay'} type={'text'} onChange={(event) => this.handleInputChange(event)} value={this.state.number} />
        <div className={'unSelectable'} styleName={'modifier increment'}>+</div>
      </div>
    );
  }

}

Counter.displayName = 'Counter';

Counter.defaultProps = {

};

Counter.propTypes = {
  number: PropTypes.number.isRequired,
};