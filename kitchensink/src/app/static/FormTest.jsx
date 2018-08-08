import React from 'react';
import * as yup from 'yup';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField, TextArea, RadioGroup, SingleSelect, MultiSelect } from 'pyrene';
import { testOptionsWithoutInvalid } from '../data/propsData';

const errorStyle = {
  marginTop: 4,
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'left',
  color: 'var(--red-500)',
};

// Form is built here
const Form = props => (
  <React.Fragment>
    <div style={{
      display: 'flex',
      width: 300,
      justifyContent: 'space-between',
    }}
    >
      <Checkbox label={'Male'} {...props.initField('checkBox1')} /> {/* Fields need {...props.initField('fieldName')} to be recognised by the form */}
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

    <TextArea width={300} maxLength={1} title={'What\'s on your mind?'} placeholder={'text'} {...props.initField('textArea')} />

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

  // conditional validation for checkbox 1 depending on checkbox 3
  checkBox3: yup.boolean(),
  checkBox1: yup.boolean()
    .when('checkBox3', {
      is: true,
      then: yup.boolean().oneOf([true], 'If helicopter, you have to be male.'),
    }),
  multiselect1: yup.array().of(yup.object().shape({
    value: yup.string()
      .required()
      .matches(/[a]/, 'An icecream without an A is not A-cream!')
      .matches(/[i]/, 'An icecream without an I is not I-cecream!'),
  })),
});

const WrappedForm = withFormLogic(Form)({ // wrapping form
  initialValues: { // Form filled with these initial values, every field that is connected to the form with initField() needs an initial value!
    checkBox1: false,
    checkBox2: true,
    checkBox3: true,
    email: 'blabl@abla.com',
    password: '',
    textArea: '',
    radioGroup: '',
    select: null,
    multiselect1: [],
  },
  validationFunction: values => ({ // NOT USED AS VALIDATION SCHEMA IS DEFINED
    email: values.email.length === 0 ? 'Email must be longer than 0 Characters' : null,
    password: values.password.length === 0 ? 'Password must be longer than 0 Characters' : null,
    checkBox1: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox2: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox3: !values.checkBox3 ? null : values.checkBox3 === values.checkBox2 ? 'Can not be a female helicopter' : null,
    textArea: values.textArea.length > 1 ? 'TextArea is overfilled!' : null,
    select: (values.select === 'oyster' || values.select === 'chickenliver') ? 'Yuck this is disgusting..' : null,
    radioGroup: values.radioGroup === 'option 1' ? 'Can\'t select option 1' : null,
    //multiselect1: values.multiselect1.map(selectedOption => selectedOption.invalid).indexOf(true) !== -1 ? 'Icecreams must contain an A' : null,
  }),
  validationSchema: validationSchema, // PREFERRED TO VALIDATIONFUNCTION
  multiSelectOptionValidation: (multiSelectName, values, selectedOption) => { // Validation for multiselect options
    return /a/g.test(selectedOption.value);
  },
  onSubmit: values => delayAlert(values, 2000), // Promise triggered on submit
  onChange: (values, setFieldValue) => { // Used to override values conditionally
    if (values.select === 'vanilla') {
      setFieldValue('radioGroup', 'option 3');
    }
  },
});

const FormTest = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Form</div>
      <div styleName="description" />
      <div className="topicContent">
        <WrappedForm />
      </div>
    </div>
  </div>
);

export default FormTest;

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
