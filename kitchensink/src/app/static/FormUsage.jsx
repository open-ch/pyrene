import React from 'react';
import * as yup from 'yup';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField, TextArea, RadioGroup, SingleSelect, MultiSelect, Link } from 'pyrene';
import { testOptionsWithoutInvalid } from '../data/propsData';
import CodeBox from '../common/PageElements/HowToElements/CodeBox/CodeBox';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../common/PageElements/HowToElements/DisplayBox/DisplayBox';


function delayAlert(values, ms) {
  console.log('Submitting', values);
  let ctr,
    rej,
    p = new Promise(((resolve, reject) => {
      ctr = setTimeout(resolve, ms);
      rej = reject;
    }));
  p.cancel = function () { clearTimeout(ctr); rej(Error('Cancelled')); };
  return p;
}

const errorStyle = {
  marginTop: 4,
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'left',
  color: 'var(--red-500)',
};

const Form = props => (
  <React.Fragment>
    <div style={{
      display: 'flex',
      width: 300,
      justifyContent: 'space-between',
    }}
    >
      <Checkbox label={'Male'} {...props.initField('checkBox1')} />
      <Checkbox label={'Female'} {...props.initField('checkBox2')} />
      <Checkbox label={'Apache Helicopter'} {...props.initField('checkBox3')} />
    </div>
    {props.errors.checkBox1 && <div style={errorStyle}>{props.errors.checkBox1}</div>}
    {props.errors.checkBox3 && <div style={errorStyle}>{props.errors.checkBox3}</div>}

    <div style={{ height: 24 }} />

    <TextField width={300} title={'Email'} placeholder={'Email'} disabled={props.values.checkBox1} {...props.initField('email')} />
    <div style={{ height: 24 }} />
    <TextField width={300} title={'Password in plain text'} placeholder={'Password'} {...props.initField('password')} />
    <div style={{ height: 24 }} />


    <div style={{ height: 24 }} />
    <div style={{ width: 300 }}>
      <RadioGroup
        alignment={'vertical'}
        radioLabels={['option 1', 'option 2', 'option 3', 'option 22', 'option 32']}
        {...props.initField('radioGroup')}
      />
      {props.errors.radioGroup && <div style={errorStyle}>{props.errors.radioGroup}</div>}
    </div>

    <div style={{ height: 24 }} />
    <div style={{ width: 300 }}>
      <SingleSelect title={'Select favorite icecream'} options={testOptionsWithoutInvalid} clearable {...props.initField('select')} />
      <div style={{ height: 24 }} />
      <MultiSelect title={'Select icecream.. again'} options={testOptionsWithoutInvalid} creatable clearable keepMenuOnSelect {...props.initField('multiselect1')} />
    </div>

    <div style={{ height: 24 }} />
    <Button label={'Submit'} type={'danger'} disabled={props.submitDisabled} loading={props.isSubmitting} />
  </React.Fragment>
);

const validationSchema = yup.object({
  email: yup.string()
    .required('No Email passed.')
    .email('Not an email.'),
  password: yup.string()
    .required('Password is required.')
    .min(8, 'Needs at least 8 chars.')
    .matches(/[a-z]/, 'Needs one lowercase char.')
    .matches(/[A-Z]/, 'Needs one uppercase char.'),

  checkBox3: yup.boolean(),
  checkBox1: yup.boolean()
    .when('checkBox3', {
      is: true,
      then: yup.boolean().oneOf([true], 'If helicopter, you have to be male.'),
    }),
});


const WrappedForm = withFormLogic(Form)({
  initialValues: {
    checkBox1: false,
    checkBox2: true,
    checkBox3: true,
    email: 'blabl@abla.com',
    password: '',
    radioGroup: '',
    select: null,
    multiselect1: [],
  },
  validationSchema: validationSchema,
  multiSelectOptionValidation: (multiSelectName, values, selectedOption) => {
    return /a/g.test(selectedOption.value);
  },
  onSubmit: values => delayAlert(values, 2000),
  onChange: (values, setFieldValue) => {
    if (values.select === 'vanilla') {
      setFieldValue('radioGroup', 'option 3');
    }
  },
});

const SmallForm = (props) => (
  <React.Fragment>
    <TextField
      width={300}
      title={'Email'}
      placeholder={'Email'}
      {...props.initField('email')}
    />
    <TextField
      width={300}
      title={'Password in plain text 👀'}
      placeholder={'Password'}
      disabled={props.values.checkBox}
      {...props.initField('password')}
    />
    <Checkbox
      label={'Lock password input'}
      {...props.initField('checkBox')}
    />

    <Button
      label={'Submit'}
      type={'danger'}
      disabled={props.submitDisabled}
      loading={props.isSubmitting}
    />
  </React.Fragment>
);

const ExampleForm = withFormLogic(SmallForm)({
  initialValues: {
    email: 'blabl@abla.com',
    password: '',
    checkBox: false,
  },
  validationSchema: yup.object({}),
  onSubmit: (values) => delayAlert(values, 3000),
});

const FormCode1 = `const Form = (props) => (
  // PROPS: 
  // All props passed to the wrapped form +
  // values: object, all the current element values
  // errors: object, error messages
  // touched: object, true for each element that the user interacted with
  // isSubmitting: bool, true between submission and completion of onSubmit
  // initField: func, used to connect an element to the form
  
  <React.Fragment>
  
    <TextField
      width={300}
      title={'Email'}
      placeholder={'Email'}
      {...props.initField('email')} // Adding textfield 'email' to the form via initField
    />
    
    <TextField
      width={300}
      title={'Password in plain text'}
      placeholder={'Password'}
      disabled={props.values.checkBox}  // Conditionaly disable this field if the checkbox is set
      {...props.initField('password')} // Adding textfield 'password' to the form via initField
    />
    
    <Checkbox
      label={'Lock password input'}
      {...props.initField('checkBox')}
    />
    
    // A button pressed inside of the form, or hitting enter on a textfield triggers a submit
    // No need to add an onSubmit handler to the button
    <Button
      label={'Submit'}
      type={'danger'}
      disabled={props.submitDisabled}
      loading={props.isSubmitting}
    />
  </React.Fragment>
);`;

const FormCode2 = `const WrappedForm = withFormLogic(Form)({
 // Every field that is connected to the form with initField() needs an initial value!
  initialValues: {
    email: 'blabl@abla.com', // Note that the keys must match the string in the initField functions
    password: '',
    checkBox: false,
  },
  // Pass Yup validation schema, more info below
  validationSchema: yup.object({}),
  
  // Define your onSubmit function, needs to be a Promise
  onSubmit: (values) => null, 
  
  // Conditionally change other field values
  /* Example
  if (values.select === 'vanilla') {
      setFieldValue('radioGroup', 'option 3');
  }
  */
  onChange: (values, setFieldValue) => null,
});`;

const FormCode3 = `class YesThisIsDog extends React.Component {
  render() {
    return <WrappedForm />;
  }
}`;

const Yupscheme = `const validationSchema = yup.object({
  email: yup.string()
    .required('No Email passed.')
    .email('Not an email.'),
  password: yup.string()
    .required('Password is required.')
    .min(8, 'Needs at least 8 chars.')
    .matches(/[a-z]/, 'Needs one lowercase char.')
    .matches(/[A-Z]/, 'Needs one uppercase char.'),

  // conditional validation for checkbox 1 depending on checkbox 2
  checkBox2: yup.boolean(),
  checkBox1: yup.boolean()
    .when('checkBox2', {
      is: true,
      then: yup.boolean().oneOf([true], 'Error message'),
    }),
});`;

const CustomValidation = `const WrappedForm = withFormLogic(Form)({
  ...
  validationFunction: values => ({ 
    email: values.email.length === 0 ? 'Email is required' :
           values.email.includes('@') ? 'No @ symbol in email' : null,
           
    password: values.password.length === 0 ? 'Password is required' : null,
    checkBox: values.checkBox === values.checkBox ? 'Must choose male or female' : null,
  }),
  ...
});`;

const ErrorDisplay = `const Form = (props) => (
  ...
    <Checkbox
      label={'Lock password input'}
      {...props.initField('checkBox')}
    />
    
    // Display errors for the checkbox
    {props.errors.checkBox && <div style={errorStyle}>{props.errors.checkBox}</div>}
  ...
);`;

const MultiSelectValidation = `const WrappedForm = withFormLogic(Form)({
  ...
  multiSelectOptionValidation: (multiSelectName, values, selectedOption) => {
    return /a/g.test(selectedOption.value);
  },
  ...
});`;

const FormUsage = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Form</div>
      <div styleName="description" />
      <div className="topicContent">
        <Paragraph title={'Getting started'}>
          <DescriptionBox>
            <p>
            Start by declaring a functional component containing all the form elements that you need.
            Register each element with the initField function and add a button for submission at the end of the form.
            </p>
            <strong>Note:</strong> The initField function needs to be called with the spread operator and as the *LAST* prop of the element.
          </DescriptionBox>
          <CodeBox>
            {FormCode1}
          </CodeBox>
          <DescriptionBox>
            Wrap the created component...
          </DescriptionBox>
          <CodeBox>
            {FormCode2}
          </CodeBox>
          <DescriptionBox>
            Use the wrapped component in your app.
          </DescriptionBox>
          <CodeBox>
            {FormCode3}
          </CodeBox>
          <DescriptionBox>
            Let's have a look at that beauty. ✨
          </DescriptionBox>
          <DisplayBox>
            <ExampleForm />
          </DisplayBox>
        </Paragraph>

        <Paragraph title={'Validation'}>
          <DescriptionBox>
            It is highly encouraged to use <Link type={'inline'} label={'Yup'} path={'https://github.com/jquense/yup'} /> for validation.
            Simply create your validation schema like below and pass it to the wrapped form via the validationScheme property. For further information go to the <Link type={'inline'} label={'Yup github page'} path={'https://github.com/jquense/yup'} />. Remember that the keys used in the schema need to equal the names given to the fields with the initField method.
          </DescriptionBox>
          <CodeBox>
            {Yupscheme}
          </CodeBox>
          <DescriptionBox>
            <p>
              Alternatively you can also specify a custom validation function by passing a function to the validationFunction property of the wrapped form. For each field you need to chain the errors with ternary expressions and return null if everything is fine.
            </p>
            <strong>Note: </strong> Please really try to use Yup instead. Only use this if there is no other way.
          </DescriptionBox>
          <CodeBox>
            {CustomValidation}
          </CodeBox>
          <DescriptionBox>
            Displaying the errors is handled by the form automatically if the corresponding form element has an invalidLabel prop. Otherwise you need to add a visual indication in the form yourself. For example:
          </DescriptionBox>
          <CodeBox>
            {ErrorDisplay}
          </CodeBox>
          <DescriptionBox>
            Multiselect elements need another validation if you wish to validate their inner selected options and not only the entire multiselect as true or false. In order to do this add the multiSelectOptionValidation function when wrapping the form.
          </DescriptionBox>
          <CodeBox>
            {MultiSelectValidation}
          </CodeBox>
          <DescriptionBox>
            Example of a bigger form with validation:
          </DescriptionBox>
          <DisplayBox>
            <WrappedForm />
          </DisplayBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default FormUsage;


