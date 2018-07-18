import React from 'react';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField } from 'pyrene';

const Form = (props) => (
  <React.Fragment>
    <Checkbox label={'Male'} {...props.initField('checkBox1', props.errors)} />
    <Checkbox label={'Female'} {...props.initField('checkBox2', props.errors)} />
    <Checkbox label={'Helicopter'} {...props.initField('checkBox3', props.errors)} />

    <TextField width={300} placeholder={'Email'} disabled={props.values.checkBox1} {...props.initField('email', props.errors)} />
    <TextField width={300} placeholder={'Password'} {...props.initField('password', props.errors)} />

    <Button label={'Submit'} type={'danger'} disabled={props.submitDisabled} loading={props.isSubmitting}/>
  </React.Fragment>
);


const WrappedForm = withFormLogic(Form)({
  initialValues: {
    checkBox1: false,
    checkBox2: true,
    checkBox3: true,
    email: 'blablabla',
    password: 'secure'
  },
  validation: (values) => ({
    email: values.email.length === 0,
    password: values.password.length === 0,
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