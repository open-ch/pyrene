import React from 'react';
import * as yup from 'yup';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField, TextArea, RadioGroup, SingleSelect, MultiSelect, Link } from 'pyrene';
import { testOptionsWithoutInvalid } from '../data/propsData';
import CodeBox from '../common/PageElements/HowToElements/CodeBox/CodeBox';
import Paragraph from '../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../common/PageElements/HowToElements/DisplayBox/DisplayBox';


function delay(values, ms) {
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
  width: 300,
  textAlign: 'left',
  color: 'var(--red-500)',
};

const Form = props => (
  <React.Fragment>
    <TextField width={300} title={'Email'} placeholder={'Email'} disabled={props.values.checkBox1} {...props.initField('email')} />
    <div style={{ height: 24 }} />
    <TextField width={300} title={'Password in plain text 👀'} placeholder={'Password'} {...props.initField('password')} />
    <div style={{ height: 24 }} />

    <div style={{ width: 300 }}>
      <RadioGroup
        alignment={'horizontal'}
        radioLabels={['Beer', 'Coffee', 'Coffeebeer']}
        {...props.initField('radioGroup')}
      />
      {props.errors.radioGroup && props.touched.radioGroup && <div style={errorStyle}>{props.errors.radioGroup}</div>}
    </div>

    <div style={{ height: 24 }} />
    <div style={{ width: 300 }}>
      <SingleSelect title={'Select favorite icecream'} options={testOptionsWithoutInvalid} clearable {...props.initField('iceSelect')} />
      <div style={{ height: 24 }} />
      <MultiSelect title={'Select icecream.. again'} options={testOptionsWithoutInvalid} creatable clearable keepMenuOnSelect {...props.initField('iceMultiselect')} />
    </div>

    <div style={{ height: 24 }} />
    <div style={{
      width: 300,
    }}
    >
      <Checkbox label={'I accept the terms of conditioners.'} {...props.initField('terms')} />
      <Checkbox label={'Hit me with them juicy spam mails.'} {...props.initField('spam')} />
    </div>
    {props.errors.terms && props.touched.terms && <div style={errorStyle}>{props.errors.terms}</div>}
    {props.errors.spam && <div style={errorStyle}>{props.errors.spam}</div>}

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
    .matches(/[A-Z]/, 'Needs one uppercase char.'),

  radioGroup: yup.string()
    .required('Need to choose one option.'),

  // select needs nullable to cover case where user only touches the empty select
  iceSelect: yup.string()
    .required('You need to choose an icecream!')
    .test('isVanilla', 'Only vanilla is the real deal..', value => value === 'vanilla')
    .nullable(),

  // Validation structure for multiselects
  iceMultiselect: yup.array().of(yup.object().shape({
    value: yup.string()
      .required()
      .matches(/[a]/, 'An icecream without an A is not A-cream!')
      .matches(/[i]/, 'An icecream without an I is not I-cecream!'),
  })),

  // conditional validation for spam checkbox depending on terms checkbox
  terms: yup.boolean().test('acceptTerms', 'You need to accept the terms of conditioners for nicer hair!', value => value === true),
  spam: yup.boolean()
    .when('terms', {
      is: true,
      then: yup.boolean().oneOf([true], 'Our terms and conditions need you to sign up to spam mails. 🙂'),
    }),
});


const WrappedForm = withFormLogic(Form)({
  initialValues: {
    email: 'blabl@abla.com',
    password: '',
    radioGroup: '',
    iceSelect: null,
    iceMultiselect: [],
    terms: false,
    spam: false,
  },
  validationSchema: validationSchema,
  onSubmit: values => delay(values, 2000),
  onChange: (values, setFieldValue) => {
    if (values.iceSelect === 'vanilla') {
      setFieldValue('radioGroup', 'coffeebeer');
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
  onSubmit: (values) => delay(values, 3000),
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
    .matches(/[A-Z]/, 'Needs one uppercase char.'),

  radioGroup: yup.string()
    .required('Need to choose one option.'),

  // select needs nullable to cover case where user only touches the empty select
  iceSelect: yup.string()
    .required('You need to choose an icecream!')
    .test('isVanilla', 'Only vanilla is the real deal..', value => value === 'vanilla')
    .nullable(),

  // Validation structure for multiselects
  iceMultiselect: yup.array().of(yup.object().shape({
    value: yup.string()
      .required()
      .matches(/[a]/, 'An icecream without an A is not A-cream!')
      .matches(/[i]/, 'An icecream without an I is not I-cecream!'),
  })),

  // conditional validation for spam checkbox depending on terms checkbox
  terms: yup.boolean().test('acceptTerms', 'You need to accept the terms of conditioners for nicer hair!', value => value === true),
  spam: yup.boolean()
    .when('terms', {
      is: true,
      then: yup.boolean().oneOf([true], 'Our terms and conditions need you to sign up to spam mails. 🙂'),
    }),
});`;

const ErrorDisplay = `const Form = (props) => (
  ...
    <Checkbox
      label={'Lock password input'}
      {...props.initField('checkBox')}
    />
    
    // Display errors for the checkbox
    {props.errors.checkBox && props.touched.checkBox && <div>{props.errors.checkBox}</div>}
  ...
);`;

const BigForm = `// Code for the form above
const Form = props => (
  <React.Fragment>
    <TextField
      title={'Email'}
      placeholder={'Email'}
      disabled={props.values.checkBox1}
      {...props.initField('email')}
     />
     
    <TextField 
      title={'Password in plain text 👀'}
      placeholder={'Password'}
      {...props.initField('password')}
    />
   
    <RadioGroup
      alignment={'horizontal'}
      radioLabels={['Beer', 'Coffee', 'Coffeebeer']}
      {...props.initField('radioGroup')}
    />
    {props.errors.radioGroup && props.touched.radioGroup && <div>{props.errors.radioGroup}</div>}

    <SingleSelect
      title={'Select favorite icecream'}
      options={iceOptions}
      clearable
      {...props.initField('iceSelect')}
    />
     
    <MultiSelect
      title={'Select icecream.. again'}
      options={iceOptions}
      creatable
      clearable
      keepMenuOnSelect
      {...props.initField('iceMultiselect')}
    />
   
    <Checkbox label={'I accept the terms of conditioners.'} {...props.initField('terms')} />
    <Checkbox label={'Hit me with them juicy spam mails.'} {...props.initField('spam')} />
    {props.errors.terms && props.touched.terms && <div style={errorStyle}>{props.errors.terms}</div>}
    {props.errors.spam && <div style={errorStyle}>{props.errors.spam}</div>}

    <Button
      label={'Submit'}
      type={'danger'}
      disabled={props.submitDisabled}
      loading={props.isSubmitting}
     />
  </React.Fragment>
);`;

const WrappedBigForm = `const WrappedForm = withFormLogic(Form)({
  initialValues: {
    email: 'blabl@abla.com',
    password: '',
    radioGroup: '',
    iceSelect: null,
    iceMultiselect: [],
    terms: false,
    spam: false,
  },
  validationSchema: validationSchema,
  onSubmit: (values) => null,
  onChange: (values, setFieldValue) => {
    if (values.iceSelect === 'vanilla') {
      setFieldValue('radioGroup', 'coffeebeer');
    }
  },
});`;

const FormUsage = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Form</div>
      <div styleName="description">
        Forms need a central place to keep the state of all the components in order to allow the implementation of important features like dynamic input disabling based on other inputs and to guarantee a single source of truth. This makes the Form component a very custom implementation as it needs to manage a lot of different input components. With this higher order component we try to standardise the general behaviour and logic behind the React way of doing forms with the intent to reduce boilerplate code.
      </div>
      <div className="topicContent">
        <Paragraph title={'Getting started'} large>
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

        <Paragraph title={'Forms with validation'} large>
          <DescriptionBox>
            For validation we use <Link type={'inline'} label={'Yup'} path={'https://github.com/jquense/yup'} />.
            Simply create your validation schema like below and pass it to the wrapped form via the validationScheme property. For further information go to the <Link type={'inline'} label={'Yup github page'} path={'https://github.com/jquense/yup'} />. Remember that the keys used in the schema need to equal the names given to the fields with the initField method.
          </DescriptionBox>
          <CodeBox>
            {Yupscheme}
          </CodeBox>
          <DescriptionBox>
            Displaying the errors is handled by the form automatically if the corresponding form element has an invalidLabel prop. Otherwise you need to add a visual indication in the form yourself. For example:
          </DescriptionBox>
          <CodeBox>
            {ErrorDisplay}
          </CodeBox>
        </Paragraph>
        <Paragraph title={'Full Example'}>
          <DescriptionBox>
            Using the yup validation from above:
          </DescriptionBox>
          <DisplayBox>
            <WrappedForm />
          </DisplayBox>
          <CodeBox>
            {BigForm}
          </CodeBox>
          <CodeBox>
            {WrappedBigForm}
          </CodeBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default FormUsage;
