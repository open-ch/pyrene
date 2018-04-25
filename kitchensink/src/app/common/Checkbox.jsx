import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isChecked: false
    };
  }

  toggleChange(event) {
    this.setState({
      isChecked: !this.state.isChecked
    });
    this.props.toggledCheckbox(event);
  }

  render() {
    return <input type="checkbox" name={this.props.name} checked={this.state.isChecked} onChange={this.toggleChange} />;
  }

}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  toggledCheckbox: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

