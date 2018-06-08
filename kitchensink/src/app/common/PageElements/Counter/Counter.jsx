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
    } else {
      newValue = 0;
    }
    this.setState((prevState, props) => ({
      number: newValue,
    }),
    () => this.props.onChange(newValue)
    );
  }

  changeCounterBy(number) {
    this.setState((prevState, props) => ({
      number: prevState.number + number,
    }),
    () => this.props.onChange(this.state.number)
    );
  }


  render() {
    return (
      <div styleName={'counter'}>
        <div className={'unSelectable'} styleName={'modifier decrement'} onClick={() => this.changeCounterBy(-1)}>-</div>
        <input styleName={'numberDisplay'} type={'text'} onChange={event => this.handleInputChange(event)} value={this.state.number} />
        <div className={'unSelectable'} styleName={'modifier increment'} onClick={() => this.changeCounterBy(1)}>+</div>
      </div>
    );
  }

}

Counter.displayName = 'Counter';

Counter.defaultProps = {
  onChange: () => null,
};

Counter.propTypes = {
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
