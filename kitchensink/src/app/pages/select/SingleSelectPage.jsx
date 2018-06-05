import React from 'react';
import { SingleSelect } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

import testOptions from './selectTestData';

const SingleSelectPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Selection</div>
      <div styleName="description">
        Selection elements are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={SingleSelect} startProps={{
        title: 'Single-Select',
        placeholder: 'Choose your favorite ice cream',
        helperLabel: 'Ice cream is delicious',
        options: testOptions,
        defaultValue: 'spearmint',
      }}
      />
    </div>
  </div>
);


SingleSelectPage.displayName = 'SingleSelectPage';

export default SingleSelectPage;
