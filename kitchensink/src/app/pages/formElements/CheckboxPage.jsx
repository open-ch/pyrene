import React from 'react';
import { Checkbox } from 'pyrene';

import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const CheckboxPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Checkbox</div>
      <div styleName="description">
         Checkboxes are used primarily on ....
      </div>
    </div>
    <div styleName="topicContent">
      <CodePage component={Checkbox} startProps={{ label: 'Click Me'}} />
    </div>
  </div>
);


CheckboxPage.displayName = 'CheckboxPage';

export default CheckboxPage;
