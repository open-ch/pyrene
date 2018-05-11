import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';

import '../react-osag-select.css';

export default class SingleSelect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: ''
    };
  }


  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={() => this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' }
        ]}
      />
    );
  }

}

SingleSelect.displayName = 'SingleSelect';

SingleSelect.defaultProps = {
  placeholder: ''
};

SingleSelect.propTypes = {
  /**
   * placeholder
   */
  placeholder: PropTypes.string
};

