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

  onButtonClick = (event) => {
    const buttonName = event.target.name;
    alert('submit');
  };

  handleBlur = (event) => {
    const inputName = event.target.name;
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

    if (event.target.type === 'checkbox') {
      this.setState(() => ({
        touched: { ...this.state.touched, [inputName]: true}
      }));
    }
  };

  validate = (email, password, checkBox1, checkBox2, checkBox3) => ({
    email: email.length === 0,
    password: password.length === 0,
    checkBox1: checkBox1 === checkBox2,
    checkBox2: checkBox2,
    checkBox3: checkBox3,
  });

  shouldMarkError = (error, field) => {
    const shouldShow = this.state.touched[field];
    return error ? shouldShow : false;
  };


  render() {
    const errors = this.validate(this.state.email, this.state.password, this.state.checkBox1, this.state.checkBox2, this.state.checkBox3);

    return (
      <form>
        <Checkbox label={'Male'} onCheckBoxChange={this.handleInputChange} name={'checkBox1'} checked={this.state.checkBox1} invalid={this.shouldMarkError(errors.checkBox1, 'checkBox1')} onBlur={this.handleBlur} />
        <Checkbox label={'Female'} onCheckBoxChange={this.handleInputChange} name={'checkBox2'} checked={this.state.checkBox2} invalid={this.shouldMarkError(errors.checkBox2, 'checkBox2')} onBlur={this.handleBlur} />
        <Checkbox label={'Helicopter'} onCheckBoxChange={this.handleInputChange} name={'checkBox3'} checked={this.state.checkBox3} invalid={this.shouldMarkError(errors.checkBox3, 'checkBox3')} onBlur={this.handleBlur} />

        <TextField name={'email'} onChange={this.handleInputChange} inputText={this.state.email} width={300} placeholder={'Email'} invalid={this.shouldMarkError(errors.email, 'email')} onBlur={this.handleBlur} />
        <TextField name={'password'} onChange={this.handleInputChange} inputText={this.state.password} width={300} placeholder={'Password'} invalid={this.shouldMarkError(errors.password, 'password')} onBlur={this.handleBlur} />

        <Button label={'Submit'} onClick={this.onButtonClick} type={'danger'} disabled={Object.keys(errors).some(x => errors[x])}/>
      </form>
    );
  }

}

Form.displayName = 'Form';

Form.defaultProps = {};

Form.propTypes = {};