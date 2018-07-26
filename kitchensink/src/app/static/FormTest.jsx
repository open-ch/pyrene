import React from 'react';
import '../../css/componentPage.css';
import { withFormLogic, Checkbox, Button, TextField, TextArea, RadioGroup, SingleSelect, MultiSelect } from 'pyrene';
import { testOptionsWithoutInvalid } from '../data/propsData';


const Form = (props) => (
  <React.Fragment>
    <Checkbox label={'Male'} {...props.initField('checkBox1')} />
    <Checkbox label={'Female'} {...props.initField('checkBox2')} />
    <Checkbox label={'Helicopter'} {...props.initField('checkBox3')} />
    {props.errors.checkBox1 && <div>{props.errors.checkBox1}</div>}
    {props.errors.checkBox3 && <div>{props.errors.checkBox3}</div>}

    <TextField width={300} placeholder={'Email'} disabled={props.values.checkBox1} {...props.initField('email')} />
    <TextField width={300} placeholder={'Password'} {...props.initField('password')} />

    <TextArea width={300} maxLength={1} placeholder={'text'} {...props.initField('textArea')} />

    <div style={{width: 300}}>
      <RadioGroup
        alignment={'vertical'}
        radioLabels={['option 1','option 2','option 3', 'option 22','option 32']}
        {...props.initField('radioGroup')}
      />
      {props.errors.radioGroup && <div>{props.errors.radioGroup}</div>}
    </div>
    <div style={{ width: 300 }}>
      <SingleSelect options={testOptionsWithoutInvalid} clearable {...props.initField('select')} />
      <MultiSelect options={testOptionsWithoutInvalid} creatable clearable keepMenuOnSelect {...props.initField('multiselect1')} />
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
    multiselect1: [],
  },
  validation: (values) => ({
    email: values.email.length === 0 ? 'Email must be longer than 0 Characters' : null,
    password: values.password.length === 0 ? 'Password must be longer than 0 Characters' : null,
    checkBox1: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox2: values.checkBox1 === values.checkBox2 ? 'Must choose male or female' : null,
    checkBox3: !values.checkBox3 ? null : values.checkBox3 === values.checkBox2 ? 'Can not be a female helicopter' : null,
    textArea: values.textArea.length > 1 ? 'TextArea is overfilled!' : null,
    select: (values.select === 'oyster' || values.select === 'chickenliver') ? 'Yuck this is disgusting..' : null,
    radioGroup: values.radioGroup === 'option 1' ? 'Can\'t select option 1' : null,
    multiselect1: values.multiselect1.map(selectedOption => selectedOption.invalid).indexOf(true) !== -1 ? 'You selected an invalid element' : null,
  }),
  multiSelectOptionValidation: (multiSelectName, values, selectedOption) => {
    return (/a/g.test(selectedOption.value));
  },
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