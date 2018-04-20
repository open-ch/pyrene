import React from 'react';
import PropTypes from 'prop-types';

//import '.css';


export class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.toggleChange = this.toggleChange.bind(this);
    this.state = {
      isChecked: false,
    };
  }

  toggleChange(event) {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.props.toggledCheckbox(event);
  }

  render() {
    return (
      <label>
        <input type="checkbox" name={this.props.name} checked={this.state.isChecked} onChange={this.toggleChange} />
        {this.state.isChecked}
      </label>
    );
  }
}

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {

};

Checkbox.propTypes = {
  toggledCheckbox: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

