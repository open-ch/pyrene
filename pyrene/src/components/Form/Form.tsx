/* eslint-disable react/static-property-placement */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ValidationError, ObjectSchema } from 'yup';
import { MultiselectOption, Filters, Options } from '../Filter/types';

type ValuesOf<T> = T[keyof T];
type KeysOf<T> = keyof T;

type FormValues = Filters;
type ToucheValues = {
  [K in KeysOf<FormValues>]: boolean
};
type Errors = Record<string, any>;

export interface FormProps {
  initialValues?: FormValues,
  onChange: (value: FormValues, setter: (fieldName: KeysOf<FormState['values']>, value: Options) => void) => void,
  onSubmit?: (formState: FormValues) => Promise<void>,
  render: (args: RenderPropsArgs) => JSX.Element,
  validateOnFirstTouch?: boolean,
  validationSchema?: ObjectSchema<any> | null,
}

export interface FormState {
  values: FormValues,
  touched: ToucheValues,
  isSubmitting: boolean,
}

type RenderPropsArgs = {
  values?: FormValues,
  errors: Errors,
  touched: FormState['touched'],
  isSubmitting: FormState['isSubmitting'],
  submitDisabled: boolean,
  initField: (fieldName: string) => InputComponentProps,
};

type InputComponentProps = {
  name: KeysOf<FormState['values']>,
  value: ValuesOf<FormState['values']>,
  invalid: boolean,
  invalidLabel: string,
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
};

const getTouchedState = (initialValues: FormValues) => (
  Object.keys(initialValues).reduce((allValues, value) => ({
    ...allValues,
    [value]: false,
  }), {})
);

const anyError = (errors: Errors) => Object.keys(errors).some((x) => errors[x]);

class Form extends React.Component<FormProps, FormState> {

  static displayName = 'Form';

  static defaultProps = {
    validationSchema: null,
    initialValues: {},
    validateOnFirstTouch: false,
  };

  constructor(props: FormProps) {
    super(props);

    this.state = {
      values: this.props.initialValues || {},
      touched: getTouchedState(this.props.initialValues || {}),
      isSubmitting: false,
    };
  }

  validateYupSchema = (values: FormState['values']) => {
    try {
      this.props.validationSchema?.validateSync?.(values, { abortEarly: false });
    } catch (err: any) {
      return this.regroupErrors(err);
    }
    // No errors return empty error
    return {};
  };

  validate = (values: FormState['values']): Errors => {
    if (this.props.validationSchema) {
      return this.validateYupSchema(values);
    }
    return {};
  };

  canBeSubmitted = () => {
    const errors = this.validate(this.state.values);
    const isDisabled = anyError(errors);
    return !isDisabled;
  };

  shouldMarkError = (fieldName: string, error: string) => {
    const shouldShow = this.state.touched[fieldName];
    return error ? shouldShow : false;
  };

  regroupErrors = (errors: ValidationError) => {
    // regroups the errors from beeing an array of error objects to an object of errors grouped by field name
    // the path for multiselect options points out the exact object inside the multiselect like 'multiselect[x]'
    // to group all of these errors together under multiselect the .split("[") function is used
    // for other elements like a checkbox that do not have "[" in their name, the name remains unchanged
    const groupedErrors = errors.inner
      .map((validationError) => {
        if (validationError?.path) {
          return { [validationError.path.split(/\[|\./)[0]]: validationError.errors };
        }
        return {};
      })
      .reduce((acc, obj) => {
        Object.keys(obj).forEach((k) => {
          acc[k] = (acc[k] || []).concat(obj[k]);
          acc[k] = acc[k].filter((d, i) => acc[k].indexOf(d) === i);
        });
        return acc;
      }, {});

    const flatGroupedErrors = Object.keys(groupedErrors).reduce((flatErrors, key) => ({
      ...flatErrors,
      [key]: groupedErrors[key].join(' '),
    }), {});

    return flatGroupedErrors;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.canBeSubmitted()) {
      // better solution than alert needed..
      alert('Submit not possible, check validation!'); // eslint-disable-line no-alert
    } else {

      this.setState({ isSubmitting: true });

      // Should use promise for onSubmit
      this.props.onSubmit?.(this.state.values).then(() => this.setState({ isSubmitting: false }));
    }
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputName = event.target.name ? event.target.name : event.target.id;
    this.setState((prevState) => ({
      touched: { ...prevState.touched, [inputName]: true },
    }));
  };

  setFieldValue = (fieldName: KeysOf<FormState['values']>, value: Options) => {
    this.setState((prevState) => ({
      values: { ...prevState.values, [fieldName]: value },
    }));
  };

  handleInputChange = (value: Options, key: string, type: string) => {
    if (this.props.validateOnFirstTouch) {
      this.setState((prevState) => ({
        touched: { ...prevState.touched, [key]: true },
      }));
    }

    const newValue = this.getValueFromInput(value, key, type);

    if (typeof this.props.onChange === 'function') {
      this.setState((prevState) => ({
        values: { ...prevState.values, [key]: newValue },
      }),
      () => this.props.onChange(this.state.values, this.setFieldValue));
    } else {
      this.setState((prevState) => ({
        values: { ...prevState.values, [key]: newValue },
      }));
    }
  };

  validateMultiSelectOption = (multiSelectName: string, selectedOption: Options) => {
    if (this.props.validationSchema && (typeof this.props.validationSchema.fields[multiSelectName] !== 'undefined')) {
      try {
        this.props.validationSchema.fields[multiSelectName].validateSync([selectedOption], { abortEarly: false });
      } catch (e) {
        // Error thrown for this selectedOption -> invalid: true
        return true;
      }
    }
    // No error thrown for this selectedOption -> invalid: false
    return false;
  };

  getValueFromInput = (value: Options, key: string, type: string) => {
    switch (type) {
      case 'multiSelect': {
        const selectedOptions = (value || []) as MultiselectOption;
        const multiSelectName = key;
        return selectedOptions.map((selectedOption) => ({
          value: selectedOption.value,
          label: selectedOption.label,
          invalid: this.validateMultiSelectOption(multiSelectName, selectedOption),
        }));
      }
      default:
        return value;
    }
  };

  // generate props to be passed to specialized input component
  initField = (fieldName: string, error: string) => {
    // Standard boilerplate
    const fieldProps: InputComponentProps = {
      name: fieldName,
      value: this.state.values[fieldName],
      invalid: this.shouldMarkError(fieldName, error),
      invalidLabel: error,
      onChange: (value: Options, event: any) => this.handleInputChange(value, fieldName, event.target.type),
      onBlur: this.handleBlur,
    };

    // Overriding state of all inputs for special cases
    if (this.state.isSubmitting) {
      return {
        ...fieldProps,
        disabled: this.state.isSubmitting,
      };
    }

    return fieldProps;
  };

  render() {
    const errors = { ...this.validate(this.state.values) };
    const submitDisabled = anyError(errors);
    const initField = (name: string) => this.initField(name, errors[name]);
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.render({
          values: this.state.values,
          errors: errors,
          touched: this.state.touched,
          isSubmitting: this.state.isSubmitting,
          submitDisabled: submitDisabled,
          initField: initField,
        })}
      </form>
    );
  }

}

export default Form;
