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
});

const WrappedForm = withFormLogic(Form)({
  initialValues: {
    checkBox1: false,
    checkBox2: true,
    checkBox3: true,
    email: 'blablabla',
    password: '',
    textArea: '',
    radioGroup: '',
    select: null,
    multiselect1: [],
  },
  validationFunction: values => ({
    email: values.email.length === 0 ? 'Email must be longer than 0 Characters' : null,
    password: values.password.length === 0 ? 'Password must be longer than 0 Characters' : null,
    checkBox1: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox2: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox3: !values.checkBox3 ? null : values.checkBox3 === values.checkBox2 ? 'Can not be a female helicopter' : null,
    textArea: values.textArea.length > 1 ? 'TextArea is overfilled!' : null,
    select: (values.select === 'oyster' || values.select === 'chickenliver') ? 'Yuck this is disgusting..' : null,
    radioGroup: values.radioGroup === 'option 1' ? 'Can\'t select option 1' : null,
    multiselect1: values.multiselect1.map(selectedOption => selectedOption.invalid).indexOf(true) !== -1 ? 'Icecreams must contain an A' : null,
  }),
  validationSchema: validationSchema,
  multiSelectOptionValidation: (multiSelectName, values, selectedOption) => (/a/g.test(selectedOption.value)),
  onSubmit: values => delayAlert(values, 2000),
  onChange: (values, setFieldValue) => {
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
