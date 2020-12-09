import React from 'react';
import * as yup from 'yup';
import '../../../css/componentPage.css';
import {
  Form, Checkbox, Button, TextField, RadioGroup, SingleSelect, MultiSelect, Link,
} from '@osag/pyrene/dist/pyrene.dev';
import CodeBox from '../../common/PageElements/HowTo/CodeBox/CodeBox';
import Paragraph from '../../common/PageElements/Paragraph/Paragraph';
import DescriptionBox from '../../common/PageElements/DescriptionBox/DescriptionBox';
import DisplayBox from '../../common/PageElements/HowTo/DisplayBox/DisplayBox';

/* eslint-disable react/jsx-props-no-spreading */

const testOptionsWithoutInvalid = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'bacon', label: 'Bacon' },
  { value: 'cookiedough', label: 'Cookie Dough' },
  { value: 'beer', label: 'Beer' },
  { value: 'cottoncandy', label: 'Cotton Candy' },
  { value: 'crab', label: 'Crab' },
  { value: 'greentea', label: 'Green Tea' },
  { value: 'mango', label: 'Mango' },
  { value: 'tuttifrutti', label: 'Tutti Frutti' },
  { value: 'grape', label: 'Grape' },
  { value: 'coconutmilk', label: 'Coconut Milk' },
  { value: 'dulce', label: 'Dulce de Leche' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'garlic', label: 'Garlic' },
  { value: 'twix', label: 'Twix' },
  { value: 'mintchocolatechip', label: 'Mint Chocolate Chip' },
  { value: 'spearmint', label: 'Spearmint' },
  { value: 'oyster', label: 'Oyster' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'rice', label: 'Rice' },
  { value: 'chickenliver', label: 'Chicken Liver' },
  { value: 'superman', label: 'Superman' },
  { value: 'lucuma', label: 'Lucuma' },
  { value: 'bluemoon', label: 'Blue Moon' },
  { value: 'charcoal', label: 'Charcoal' },
  { value: 'cheesecake', label: 'Cheesecake' },
  { value: 'rumandraisin', label: 'Rum and Raisin' },
  { value: 'moosetracks', label: 'Moose Tracks' },
];

function delay(values, ms) {
  let ctr;
  let rej;
  const p = new Promise(((resolve, reject) => {
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

const SmallForm = (
  <Form
    render={({
      initField, values, errors, touched, isSubmitting, submitDisabled, // eslint-disable-line no-unused-vars
    }) => (
      <>
        <TextField
          width={300}
          title="Email"
          placeholder="Email"
          {...initField('email')}
        />
        <TextField
          width={300}
          title="Password in plain text 👀"
          placeholder="Password"
          disabled={values.checkBox}
          {...initField('password')}
        />
        <Checkbox
          label="Lock password input"
          {...initField('checkBox')}
        />

        <Button
          label="Submit"
          type="danger"
          disabled={submitDisabled}
          loading={isSubmitting}
        />
      </>
    )}

    initialValues={{
      email: 'blabl@abla.com',
      password: '',
      checkBox: false,
    }}
    onSubmit={(values) => delay(values, 2000)}
  />
);

const SmallFormCode = `<Form

  // initField: func, used to connect an element to the form
  // values: object, all the current element values
  // errors: object, error messages
  // touched: object, true for each element that the user interacted with
  // isSubmitting: bool, true between submission and completion of onSubmit
  // submitDisabled: bool, true when any validation errors exist

  render={({initField, values, errors, touched, isSubmitting, submitDisabled}) => (
    <React.Fragment>
      <TextField
        width={300}
        title={'Email'}
        placeholder={'Email'}
        {...initField('email')} // Adding textfield 'email' to the form via initField
      />
      <TextField
        width={300}
        title={'Password in plain text 👀'}
        placeholder={'Password'}
        disabled={values.checkBox} // Conditionaly disable this field if the checkbox is set
        {...initField('password')} // Adding textfield 'password' to the form via initField
      />
      <Checkbox
        label={'Lock password input'}
        {...initField('checkBox')}
      />

      // A button pressed inside of the form, or hitting enter on a textfield triggers a submit
      // No need to add an onSubmit handler to the button
      <Button
        label={'Submit'}
        type={'danger'}
        disabled={submitDisabled}
        loading={isSubmitting}
      />
    </React.Fragment>
  )}

  // Needed for every registered form field
  initialValues={{
    email: 'blabl@abla.com',
    password: '',
    checkBox: false,
  }}

  onSubmit={values => delay(values, 2000)}
/>`;

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
    iceSelect: yup.object().shape({
      value: yup.string().test('isVanilla', 'Only vanilla is the real deal..', value => value === 'vanilla'),
    })
      .required('You need to choose an icecream!')
      .nullable(),

  // Validation structure for multiselects
  iceMultiselect: yup.array().of(yup.object().shape({
    value: yup.string()
      .required()
      .matches(/[a]/, 'An icecream without an A is not A-cream!')
      .matches(/[i]/, 'An icecream without an I is not I-cecream!'),
  })),

  // conditional validation for spam checkbox depending on terms checkbox
  terms: yup.boolean()
    .test('acceptTerms', 'You need to accept the terms of conditioners for nicer hair!', value => value === true),
  spam: yup.boolean()
    .when('terms', {
      is: true,
      then: yup.boolean().oneOf([true], 'Our terms and conditions need you to sign up to spam mails. 🙂'),
    }),
});`;

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
  iceSelect: yup.object().shape({
    value: yup.string().test('isVanilla', 'Only vanilla is the real deal..', (value) => value === 'vanilla'),
  })
    .required('You need to choose an icecream!')
    .nullable(),

  // Validation structure for multiselects
  iceMultiselect: yup.array().of(yup.object().shape({
    value: yup.string()
      .required()
      .matches(/[a]/, 'An icecream without an A is not A-cream!')
      .matches(/[i]/, 'An icecream without an I is not I-cecream!'),
  })),

  // conditional validation for spam checkbox depending on terms checkbox
  terms: yup.boolean().test('acceptTerms', 'You need to accept the terms of conditioners for nicer hair!', (value) => value === true),
  spam: yup.boolean()
    .when('terms', {
      is: true,
      then: yup.boolean().oneOf([true], 'Our terms and conditions need you to sign up to spam mails. 🙂'),
    }),
});

const ErrorDisplay = `<Form
  render={(...) => (
    <Checkbox
      label={'Lock password input'}
      {...initField('checkBox')}
    />

    // Display errors for the checkbox
    {errors.checkBox && touched.checkBox && <div>{errors.checkBox}</div>}
  )}
  ...
/>`;

const BigForm = (
  <Form
    render={({
      initField, values, errors, touched, isSubmitting, submitDisabled,
    }) => (
      <>
        <TextField width={300} title="Email" placeholder="Email" disabled={values.checkBox1} required {...initField('email')} />
        <div style={{ height: 24 }} />
        <TextField width={300} title="Password in plain text 👀" placeholder="Password" required {...initField('password')} />
        <div style={{ height: 24 }} />

        <div style={{ width: 300 }}>
          <RadioGroup
            alignment="horizontal"
            options={[
              { label: 'Beer', value: 'beer' },
              { label: 'Coffee', value: 'coffee' },
              { label: 'Coffeebeer', value: 'coffeebeer' },
            ]}
            {...initField('radioGroup')}
          />
          {errors.radioGroup && touched.radioGroup && <div style={errorStyle}>{errors.radioGroup}</div>}
        </div>

        <div style={{ height: 24 }} />
        <div style={{ width: 300 }}>
          <SingleSelect title="Select favorite icecream" options={testOptionsWithoutInvalid} required clearable {...initField('iceSelect')} />
          <div style={{ height: 24 }} />
          <MultiSelect title="Select icecream.. again" options={testOptionsWithoutInvalid} required creatable clearable keepMenuOnSelect {...initField('iceMultiselect')} />
        </div>

        <div style={{ height: 24 }} />
        <div style={{
          width: 300,
        }}
        >
          <Checkbox label="I accept the terms of conditioners." required {...initField('terms')} />
          <Checkbox label="Hit me with them juicy spam mails." {...initField('spam')} />
        </div>
        {errors.terms && touched.terms && <div style={errorStyle}>{errors.terms}</div>}
        {errors.spam && <div style={errorStyle}>{errors.spam}</div>}

        <div style={{ height: 24 }} />
        <Button label="Submit" type="danger" disabled={submitDisabled} loading={isSubmitting} />
      </>
    )}

    validationSchema={validationSchema}
    initialValues={{
      email: 'blabl@abla.com',
      password: '',
      radioGroup: null,
      iceSelect: null,
      iceMultiselect: [],
      terms: false,
      spam: false,
    }}
    onSubmit={(values) => delay(values, 2000)}
    onChange={(values, setFieldValue) => {
      if (values.iceSelect === 'vanilla') {
        setFieldValue('radioGroup', 'coffeebeer');
      }
    }}
  />
);

const BigFormCode = `<Form
  render={({initField, values, errors, touched, isSubmitting, submitDisabled}) => (
    <React.Fragment>
      <TextField
        title={'Email'}
        placeholder={'Email'}
        disabled={props.values.checkBox1}
        required // Note that the required prop only applies some styling
        {...props.initField('email')}
      />

      <TextField
        title={'Password in plain text 👀'}
        placeholder={'Password'}
        required
        {...props.initField('password')}
      />

      <RadioGroup
        alignment={'horizontal'}
        options={[
          {label: 'Beer', value: 'beer'},
          {label:'Coffee', value: 'coffee'},
          {label:'Coffeebeer', value: 'coffeebeer'}
        ]}
        {...props.initField('radioGroup')}
      />
      {props.errors.radioGroup && props.touched.radioGroup && <div>{props.errors.radioGroup}</div>}

      <SingleSelect
        title={'Select favorite icecream'}
        options={iceOptions}
        clearable
        required
        {...props.initField('iceSelect')}
      />

      <MultiSelect
        title={'Select icecream.. again'}
        options={iceOptions}
        creatable
        clearable
        required
        keepMenuOnSelect
        {...props.initField('iceMultiselect')}
      />

      <Checkbox label={'I accept the terms of conditioners.'} required {...props.initField('terms')} />
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
  )}

  validationSchema={validationSchema}
  initialValues={{
    email: 'blabl@abla.com',
    password: '',
    radioGroup: null,
    iceSelect: null,
    iceMultiselect: [],
    terms: false,
    spam: false,
  }}
  onSubmit={values => delay(values, 2000)}
  onChange={(values, setFieldValue) => {
    if (values.iceSelect === 'vanilla') {
      setFieldValue('radioGroup', 'coffeebeer');
    }
  }}
/>`;


const FormUsage = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Form</div>
      <div styleName="description">
        <p>
          Forms need a central place to keep the state of all the components in order to allow the implementation of important features like dynamic input disabling and to guarantee a
          <strong>single source of truth</strong>
          .
        </p>
        <p>
          As it needs to manage a lot of different input components and types, the Form component has a very custom implementation. With this component using the
          <strong>render props pattern</strong>
          {' '}
          we try to standardise the general behaviour and logic behind the React way of doing forms with the intent to reduce boilerplate code.
        </p>
      </div>
      <div className="topicContent">
        <Paragraph title="Getting started">
          <DescriptionBox>
            <p>
              Start by using the Form component and fill its render prop with all the form elements that you need.
              Register each element with the initField function and add a button for submission at the end of the form.
            </p>
            <strong>Note:</strong>
            {' '}
            The initField function needs to be called with the spread operator and as the *LAST* prop of the element.
          </DescriptionBox>
          <CodeBox>
            {SmallFormCode}
          </CodeBox>
          <DescriptionBox>
            {'Let\'s have a look at that beauty. ✨'}
          </DescriptionBox>
          <DisplayBox>
            {SmallForm}
          </DisplayBox>
        </Paragraph>

        <Paragraph title="Forms with validation">
          <DescriptionBox>
            {'For validation we use '}
            <Link type="inline" label="Yup" path="https://github.com/jquense/yup" />
            {'. Simply create your validation schema like below and pass it to the wrapped form via the validationScheme property. For further information go to the'}
            <Link type="inline" label="Yup github page" path="https://github.com/jquense/yup" />
            {'. Remember that the keys used in the schema need to equal the names given to the fields with the initField method.'}
          </DescriptionBox>
          <CodeBox>
            {Yupscheme}
          </CodeBox>
          <DescriptionBox>
            Displaying the errors is handled by the form automatically if the corresponding form element has an invalidLabel prop. Otherwise you need to add a visual indication in the form yourself like this:
          </DescriptionBox>
          <CodeBox>
            {ErrorDisplay}
          </CodeBox>
        </Paragraph>
        <Paragraph title="Detailed Example">
          <DescriptionBox>
            Using the yup validation from above:
          </DescriptionBox>
          <DisplayBox>
            {BigForm}
          </DisplayBox>
          <CodeBox>
            {BigFormCode}
          </CodeBox>
        </Paragraph>
      </div>
    </div>
  </div>
);

export default FormUsage;
