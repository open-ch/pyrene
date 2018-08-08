import React from 'react';
import PropTypes from 'prop-types';


const withFormLogic = (WrappedForm) => ({initialValues, validationFunction, validationSchema, multiSelectOptionValidation, onSubmit, onChange}) => {
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

    validateYupSchema = (values) => {
      try {
        validationSchema.validateSync(values, {abortEarly: false});
      }
      catch (err) {
        return this.regroupErrors(err);
      }
      // No errors return empty error
      return {};
    };

    validate = (values) => {
      if (typeof validationSchema !== 'undefined') {
        return this.validateYupSchema(values);
      }
      return validationFunction(values);
    };

    anyError = errors => {
      return Object.keys(errors).some(x => errors[x]);
    };

    canBeSubmitted() {
      const errors = this.validate(this.state.values);
      const isDisabled = this.anyError(errors);
      return !isDisabled;
    }

    shouldMarkError = (fieldName, error) => {
      const shouldShow = this.state.touched[fieldName];
      return error ? shouldShow : false;
    };

    regroupErrors = (errors) => {
      // regroups the errors from beeing an array of error objects to an object of errors grouped by field name
      const groupedErrors = errors.inner.map(validationError => ({[validationError.path.split("[")[0]]: validationError.errors})).reduce((acc, obj) => {
        Object.keys(obj).forEach((k) => {
          acc[k] = (acc[k] || []).concat(obj[k]);
        });
        return acc;
      }, {});

      let flatGroupedErrors = {};
      for (const key in groupedErrors) {
        if (groupedErrors.hasOwnProperty(key)) {
          flatGroupedErrors[key] = [...new Set(groupedErrors[key])].join(' ');
        }
      }

      return flatGroupedErrors;
    };


    handleSubmit = (event) => {
      event.preventDefault();

      if (!this.canBeSubmitted()) {
        alert('Submit not possible, check validation!');
      } else {

        this.setState(() => ({
          isSubmitting: true,
        }));

        // Should use promise for onSubmit
        onSubmit(this.state.values)
          .then(() => this.setState({isSubmitting: false}))
      }
    };

    handleBlur = (event) => {
      const inputName = event.target.name ? event.target.name : event.target.id;
      this.setState((prevState, props) => ({
        touched: {...prevState.touched, [inputName]: true}
      }));
    };

    setFieldValue = (fieldName, value) => {
      this.setState((prevState, props) => ({
        values: {...prevState.values, [fieldName]: value},
      }));
    };

    handleInputChange = (event) => {
      const inputName = event.target.name;
      const newValue = this.getValueFromInput(event.target);

      if (typeof onChange !== 'undefined') {
        this.setState((prevState, props) => ({
            values: {...prevState.values, [inputName]: newValue}
          }),
          () => onChange(this.state.values, this.setFieldValue)
        );
      } else {
        this.setState((prevState, props) => ({
          values: {...prevState.values, [inputName]: newValue}
        }));
      }
    };

    validateMultiSelectOption = (multiSelectName, selectedOption) => {
      if (typeof validationSchema !== 'undefined') {
        // No validation in yup schema for this field -> invalid: false
        if (typeof validationSchema.fields[multiSelectName] === 'undefined') {
          return false;
        }
        try {
          validationSchema.fields[multiSelectName].validateSync([selectedOption], {abortEarly: false});
        } catch (e) {
          // Error thrown for this selectedOption -> invalid: true
          return true;
        }
        // No error thrown for this selectedOption -> invalid: false
        return false;
      }

      // No Yup schema defined
      return !multiSelectOptionValidation(multiSelectName, this.state.values, selectedOption);
    };

    getValueFromInput = (target) => {
      switch(target.type) {
        case 'checkbox':
          return target.checked;
        case 'singleSelect':
          if (target.value == null) {
            return '';
          }
          return target.value.value;
        case 'multiSelect':
          const selectedOptions = target.value;
          const multiSelectName = target.name;
          const validatedSelectedOptions = selectedOptions.map(selectedOption => (
            {value: selectedOption.value, label: selectedOption.label, invalid: this.validateMultiSelectOption(multiSelectName, selectedOption)}
          ));
          return validatedSelectedOptions;
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

    render() {
      const errors = {...this.validate(this.state.values), ...this.state.errors};
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