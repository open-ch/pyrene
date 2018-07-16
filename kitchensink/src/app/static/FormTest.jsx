import React from 'react';
import '../../css/componentPage.css';
import { Form, Checkbox } from 'pyrene';


const FormTest = () => (
  <div styleName="page">
    <div className="header">
      <div styleName="title">Test</div>
      <div styleName="description">
      </div>

      <div className="topicContent">
        <Form />
      </div>
    </div>
  </div>
);

export default FormTest;
