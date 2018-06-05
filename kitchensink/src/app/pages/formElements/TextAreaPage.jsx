import React from 'react';
import { TextArea } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const TextAreaPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Textarea</div>
      <div styleName="description">
        Textareas are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={TextArea} startProps={{ title: 'Label', placeholder: 'Placeholder Text', helperLabel: 'Helper text for instructions', width: 499, rows: 3, maxLength: 50 }} />
    </div>
  </div>
);


TextAreaPage.displayName = 'TextAreaPage';

export default TextAreaPage;
