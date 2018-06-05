import React from 'react';
import { MultiSelect } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

import testOptions from './selectTestData';

const MultiSelectPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Single-Select</div>
      <div styleName="description">
        Single-Select elements are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={MultiSelect} startProps={{
        title: 'Multi-Select',
        placeholder: 'Choose your favorite ice cream',
        helperLabel: 'Ice cream is delicious',
        defaultValues: [testOptions[1].value, testOptions[2].value],
        options: testOptions,
      }}
      />
    </div>
  </div>
);

MultiSelectPage.displayName = 'MultiSelectPage';

export default MultiSelectPage;
