import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox/Checkbox';
import Button from '../Button/Button';
import TextField from './TextField/TextField';

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkBox1: false,
      checkBox2: false,
      checkBox3: false,
      email: '',
      password: '',

      touched: {
        checkBox1: false,
        checkBox2: false,
        checkBox3: false,
        email: false,
        password: false,
      }
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.canBeSubmitted()) {
      alert()
    } else {
      const { email, password, checkBox1, checkBox2, checkBox3 } = this.state;
      alert(`Signed up with email: ${email} password: ${password} male: ${checkBox1} female: ${checkBox2} helicopter: ${checkBox3}`);
    }
  };

  canBeSubmitted() {
    const errors = this.validate(this.state.email, this.state.password, this.state.checkBox1, this.state.checkBox2, this.state.checkBox3);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleBlur = (event) => {
    const inputName = event.target.name ? event.target.name : event.target.id;
    this.setState(() => ({
      touched: { ...this.state.touched, [inputName]: true}
    }));
  };

  handleInputChange = (event) => {
    const inputName = event.target.name;
    const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState(() => ({
      [inputName]: newValue
    }));
  };

  initField = (fieldName, errors) => {
    return {
      name: fieldName,
      value: this.state[fieldName],
      invalid: this.shouldMarkError(fieldName, errors),
      onChange: this.handleInputChange,
      onBlur: this.handleBlur,
    };
  };

  validate = (email, password, checkBox1, checkBox2, checkBox3) => ({
    email: email.length === 0,
    password: password.length === 0,
    checkBox1: checkBox1 === checkBox2,
    checkBox2: false,
    checkBox3: checkBox3 !== checkBox2,
  });

  shouldMarkError = (fieldName, errors) => {
    const shouldShow = this.state.touched[fieldName];
    return errors[fieldName] ? shouldShow : false;
  };


  render() {
    const errors = this.validate(this.state.email, this.state.password, this.state.checkBox1, this.state.checkBox2, this.state.checkBox3);

    return (
      <form onSubmit={this.handleSubmit}>
        <Checkbox label={'Male'} {...this.initField('checkBox1', errors)} />
        <Checkbox label={'Female'} {...this.initField('checkBox2', errors)} />
        <Checkbox label={'Helicopter'} {...this.initField('checkBox3', errors)} />

        <TextField width={300} placeholder={'Email'} {...this.initField('email', errors)} />
        <TextField width={300} placeholder={'Password'} {...this.initField('password', errors)} />

        <Button label={'Submit'} type={'danger'} disabled={Object.keys(errors).some(x => errors[x])}/>
      </form>
    );
  }

}

Form.displayName = 'Form';

Form.defaultProps = {};

Form.propTypes = {};