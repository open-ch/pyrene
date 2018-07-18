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
      touched: this.getTouchedState(initialValues),
      isSubmitting: false,
    };

    handleSubmit = (event) => {
      event.preventDefault();

      if (!this.canBeSubmitted()) {
        alert('Submit not possible, check validation!');
      } else {

        this.setState(() => ({
          isSubmitting: true,
        }));

        // Should we use promises for onSubmit ???
        onSubmit(this.state)
          .then(() => this.setState({ isSubmitting: false }))
          .then(() => alert('Done'))
      }
    };

    anyError = errors => {
      return Object.keys(errors).some(x => errors[x]);
    };

    canBeSubmitted() {
      const errors = validation(this.state);
      const isDisabled = this.anyError(errors);
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
      // Standard boilerplate
      let fieldProps = {
        name: fieldName,
        value: this.state[fieldName],
        invalid: this.shouldMarkError(fieldName, errors),
        onChange: this.handleInputChange,
        onBlur: this.handleBlur,
      };

      // Overriding state of all inputs for special cases
      if (this.state.isSubmitting) {
        fieldProps.disabled = this.state.isSubmitting;
      }

      return fieldProps;
    };

    shouldMarkError = (fieldName, errors) => {
      const shouldShow = this.state.touched[fieldName];
      return errors[fieldName] ? shouldShow : false;
    };

    render() {
      const errors = validation(this.state);
      const submitDisabled = this.anyError(errors);

      return (
        <form onSubmit={this.handleSubmit}>
          <WrappedForm initField={this.initField} errors={errors} submitDisabled={submitDisabled} values={this.state} isSubmitting={this.state.isSubmitting} />
        </form>
      );
    }
  };
};

withFormLogic.displayName = 'withFormLogic';

export default withFormLogic;