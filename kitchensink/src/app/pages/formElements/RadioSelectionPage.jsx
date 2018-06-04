import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RadioSelection } from 'pyrene';

import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import FormElementsUsage from './FormElementsUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const RadioSelectionPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Radio Group</div>
      <div styleName="description">
        Radio groups are used primarily on ....
      </div>

      <SubPagingMenu currentPageUrl={match.url} />
    </div>

    <div styleName="topicContent">
      <Route path={`${match.url}/:topicName`} component={Topic} />
      <Route exact path={match.url} render={() => <Redirect to={`${match.url}/code`} />} />
    </div>
  </div>
);

const Topic = ({ match }) => {
  switch (match.params.topicName) {
    case 'code':
      return (
        <React.Fragment>
          <CodePage component={RadioSelection} startProps={{radioLabels:['option 1', 'option 2', 'option 3'], selectedOption: 'option 1' }} />
        </React.Fragment>
      );
    case 'usage':
      return <FormElementsUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


RadioSelectionPage.displayName = 'RadioSelectionPage';

export default RadioSelectionPage;
