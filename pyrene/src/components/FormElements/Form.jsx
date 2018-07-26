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
      values: {...initialValues},
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
        onSubmit(this.state.values)
          .then(() => this.setState({ isSubmitting: false }))
          .then(() => alert('Done'))
      }
    };

    anyError = errors => {
      return Object.keys(errors).some(x => errors[x]);
    };

    canBeSubmitted() {
      const errors = validation(this.state.values);
      const isDisabled = this.anyError(errors);
      return !isDisabled;
    }

    handleBlur = (event) => {
      const inputName = event.target.name ? event.target.name : event.target.id;
      this.setState((prevState, props) => ({
        touched: { ...prevState.touched, [inputName]: true}
      }));
    };

    handleInputChange = (event) => {
      const inputName = event.target.name;
      const newValue = this.getValueFromInput(event.target);
      this.setState((prevState, props) => ({
        values: { ...prevState.values, [inputName]: newValue }
      }));
    };

    getValueFromInput = (target) => {
      switch(target.type) {
        case 'checkbox':
          return target.checked;
        case 'singleSelect':
          if (target.value == null) {
            return null;
          }
          return target.value.label;
        default:
          return target.value;
      }
    };

    initField = (fieldName, error) => {
      // Standard boilerplate
      let fieldProps = {
        name: fieldName,
        value: this.state.values[fieldName],
        invalid: this.shouldMarkError(fieldName, error),
        invalidLabel: error,
        onChange: this.handleInputChange,
        onBlur: this.handleBlur,
      };

      // Overriding state of all inputs for special cases
      if (this.state.isSubmitting) {
        fieldProps.disabled = this.state.isSubmitting;
      }

      return fieldProps;
    };

    shouldMarkError = (fieldName, error) => {
      const shouldShow = this.state.touched[fieldName];
      return error ? shouldShow : false;
    };

    render() {
      const errors = validation(this.state.values);
      const submitDisabled = this.anyError(errors);

      return (
        <form onSubmit={this.handleSubmit}>
          <WrappedForm
            values={this.state.values}
            errors={errors}
            touched={this.state.touched}
            isSubmitting={this.state.isSubmitting}
            submitDisabled={submitDisabled}


            initField={name => this.initField(name, errors[name])}
            {...this.props}
          />
        </form>
      );
    }
  };
};

withFormLogic.displayName = 'withFormLogic';

withFormLogic.hoc = true;

export default withFormLogic;