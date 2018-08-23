import React from 'react';
import PropTypes from 'prop-types';



class Form extends React.Component {

    getTouchedState = initialValues => {
      const touchedState = Object.keys(initialValues).reduce((allValues, value) => {
        allValues[value] = false;
        return allValues;
      }, {});
      return {...touchedState};
    };

    state = {
      values: {...this.props.initialValues},
      touched: this.getTouchedState(...this.props.initialValues),
      isSubmitting: false,
    };

    validateYupSchema = (values) => {
      try {
        this.props.validationSchema.validateSync(values, {abortEarly: false});
      }
      catch (err) {
        return this.regroupErrors(err);
      }
      // No errors return empty error
      return {};
    };

    validate = (values) => {
      if (typeof this.props.validationSchema !== 'undefined') {
        return this.validateYupSchema(values);
      }
      return {};
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
      // the path for multiselect options points out the exact object inside the multiselect like 'multiselect[x]'
      // to group all of these errors together under multiselect the .split("[") function is used
      // for other elements like a checkbox that do not have "[" in their name, the name remains unchanged
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
        // better solution than alert needed..
        alert('Submit not possible, check validation!');
      } else {

        this.setState(() => ({
          isSubmitting: true,
        }));

        // Should use promise for onSubmit
        this.props.onSubmit(this.state.values)
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

      if (typeof this.props.onChange !== 'undefined') {
        this.setState((prevState, props) => ({
            values: {...prevState.values, [inputName]: newValue}
          }),
          () => this.props.onChange(this.state.values, this.setFieldValue)
        );
      } else {
        this.setState((prevState, props) => ({
          values: {...prevState.values, [inputName]: newValue}
        }));
      }
    };

    validateMultiSelectOption = (multiSelectName, selectedOption) => {
      if ((typeof this.props.validationSchema !== 'undefined') && (typeof this.props.validationSchema.fields[multiSelectName] !== 'undefined')) {
        try {
          this.props.validationSchema.fields[multiSelectName].validateSync([selectedOption], {abortEarly: false});
        } catch (e) {
          // Error thrown for this selectedOption -> invalid: true
          return true;
        }
      }
      // No error thrown for this selectedOption -> invalid: false
      return false;
    };

    getValueFromInput = (target) => {
      switch(target.type) {
        case 'checkbox':
          return target.checked;
        case 'singleSelect':
          if (target.value == null) {
            return null;
          }
          return target.value.value;
        case 'multiSelect':
          const selectedOptions = target.value;
          const multiSelectName = target.name;
          return selectedOptions.map(selectedOption => (
            {value: selectedOption.value, label: selectedOption.label, invalid: this.validateMultiSelectOption(multiSelectName, selectedOption)}
          ));
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
      const errors = {...this.validate(this.state.values)};
      const submitDisabled = this.anyError(errors);

      return (
        <form onSubmit={this.handleSubmit}>
          {this.props.render(this.state.values, errors, this.state.touched, this.state.isSubmitting, submitDisabled)}
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

Form.displayName = 'Form';

export default Form;