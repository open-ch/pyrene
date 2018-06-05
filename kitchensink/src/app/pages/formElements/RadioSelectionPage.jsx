import React from 'react';
import { RadioSelection } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const RadioSelectionPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Radio Group</div>
      <div styleName="description">
        Radio groups are used primarily on ....
      </div>
    </div>

    <div styleName="topicContent">
      <CodePage component={RadioSelection} startProps={{radioLabels:['option 1', 'option 2', 'option 3'], selectedOption: 'option 1' }} />
    </div>
  </div>
);


RadioSelectionPage.displayName = 'RadioSelectionPage';

export default RadioSelectionPage;
