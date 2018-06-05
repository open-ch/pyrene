import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Checkbox } from 'pyrene';

import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import FormElementsUsage from './FormElementsUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const CheckboxPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Checkbox</div>
      <div styleName="description">
         Checkboxes are used primarily on ....
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
          <CodePage component={Checkbox} startProps={{ label: 'Click Me'}} />
        </React.Fragment>
      );
    case 'usage':
      return <FormElementsUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


CheckboxPage.displayName = 'CheckboxPage';

export default CheckboxPage;
