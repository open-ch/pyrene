import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const customStyles = {
  container: (base, state) => ({
    ...base,
    width: '100%'
  })
};

export default class SingleSelect extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {
    return (
      <Select options={options} className={'singleSelect'} styles={customStyles}/>
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

