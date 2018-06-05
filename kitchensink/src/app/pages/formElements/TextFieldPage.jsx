import React from 'react';
import { TextField } from 'pyrene';

import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const TextFieldPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Textfield</div>
      <div styleName="description">
        Textfields are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={TextField} startProps={{ title: 'Field Label', placeholder: 'Placeholder Text', helperLabel: 'Helper text for instructions', width: 499 }} />
    </div>
  </div>
);


TextFieldPage.displayName = 'TextFieldPage';

export default TextFieldPage;
