import React from 'react';
import '../../css/componentPage.css';
import { Form, Checkbox, ChildrenForm, Button, TextField } from 'pyrene';


const FormTest = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Manual Form</div>
      <div styleName="description">
      </div>
      <div className="topicContent">
        <Form />
      </div>

      <div styleName="title">Children form</div>
      <ChildrenForm>
        <Checkbox label={'Male'} />
        <Checkbox label={'Female'} />
        <div>Test 123
          <Checkbox label={'Helicopter'} />
          <Checkbox label={'Unicorn'} />
          <div>
            <TextField placeholder={'Nested'} width={300} />
          </div>
        </div>
        <TextField placeholder={'Email'} width={300} />
        <TextField placeholder={'password'} width={300} />
      </ChildrenForm>
    </div>
  </div>
);

export default FormTest;
