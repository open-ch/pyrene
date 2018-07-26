import React from 'react';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField, TextArea, RadioGroup, SingleSelect, MultiSelect } from 'pyrene';
import {testOptions} from '../data/propsData';

const Form = (props) => (
  <React.Fragment>
    <Checkbox label={'Male'} {...props.initField('checkBox1')} />
    <Checkbox label={'Female'} {...props.initField('checkBox2')} />
    <Checkbox label={'Helicopter'} {...props.initField('checkBox3')} />

    <TextField width={300} placeholder={'Email'} disabled={props.values.checkBox1} {...props.initField('email')} />
    <TextField width={300} placeholder={'Password'} {...props.initField('password')} />

    <TextArea width={300} maxLength={1} placeholder={'text'} {...props.initField('textArea')} />

    <div style={{width: 300}}>
      <RadioGroup
        alignment={'vertical'}
        radioLabels={['option 1','option 2','option 3', 'option 22','option 32']}
        {...props.initField('radioGroup')}
      />
    </div>
    <div style={{width: 300}}>
      <SingleSelect options={testOptions} clearable {...props.initField('select')} />
      <MultiSelect options={testOptions} creatable clearable keepMenuOnSelect {...props.initField('multiselect')} />
    </div>

    <Button label={'Submit'} type={'danger'} disabled={props.submitDisabled} loading={props.isSubmitting} />
  </React.Fragment>
);


const WrappedForm = withFormLogic(Form)({
  initialValues: {
    checkBox1: false,
    checkBox2: true,
    checkBox3: true,
    email: 'blablabla',
    password: 'secure',
    textArea: '',
    radioGroup: '',
    select: null,
    multiselect: [],
  },
  validation: (values) => ({
    email: values.email.length === 0 ? 'Email must be longer than 0 Characters' : null,
    password: values.password.length === 0 ? 'Password must be longer than 0 Characters' : null,
    checkBox1: values.checkBox1 === values.checkBox2,
    checkBox2: false,
    checkBox3: values.checkBox3 !== values.checkBox2,
  }),
  onSubmit: (values) => delayAlert(values, 2000),
});

const FormTest = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Manual Form</div>
      <div styleName="description">
      </div>
      <div className="topicContent">
        <WrappedForm />
      </div>
    </div>
  </div>
);

export default FormTest;

function delayAlert(values, ms){
  console.log('Submitting', values);
  var ctr, rej, p = new Promise(function (resolve, reject) {
    ctr = setTimeout(resolve, ms);
    rej = reject;
  });
  p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
  return p;
}