import React from 'react';
import PropTypes from 'prop-types';


const withFormLogic = (WrappedForm) => ({initialValues, validation, onSubmit}) => {
  return class FormWithLogic extends React.Component {

    getTouchedState = initialValues => {
      const touchedState = Object.keys(initialValues).reduce((allValues, value) => {
        allValues[value] = false;
        return allValues;
      }, {});
      return {...touchedState};
    };

    state = {
      ...initialValues,
      base: null,
      touched: this.getTouchedState(initialValues),
    };

    handleSubmit = (event) => {
      event.preventDefault();

      if (!this.canBeSubmitted()) {
        alert('Submit not possible, check validation!');
      } else {
        onSubmit(this.state);
      }
    };

    canBeSubmitted() {
      const errors = validation(this.state);
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

    shouldMarkError = (fieldName, errors) => {
      const shouldShow = this.state.touched[fieldName];
      return errors[fieldName] ? shouldShow : false;
    };

    render() {
      const errors = validation(this.state);
      return (
        <form onSubmit={this.handleSubmit}>
          <WrappedForm initField={this.initField} errors={errors} />
        </form>
      );
    }
  };
};

withFormLogic.displayName = 'withFormLogic';

export default withFormLogic;