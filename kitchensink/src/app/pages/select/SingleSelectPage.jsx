import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SingleSelect } from 'pyrene';

import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import SelectUsage from './SelectUsage';
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
          <CodePage component={SingleSelect} startProps={{
            title: 'Single-Select',
            placeholder: 'Choose your favorite ice cream',
            helperLabel: 'Ice cream is delicious',
            options: testOptions,
            defaultValue: 'spearmint',
          }}
          />
        </React.Fragment>
      );
    case 'usage':
      return <SelectUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


SingleSelectPage.displayName = 'SingleSelectPage';

export default SingleSelectPage;
