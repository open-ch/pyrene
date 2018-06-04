import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MultiSelect } from 'pyrene';

import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import SelectUsage from './SelectUsage';
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
          <CodePage component={MultiSelect} startProps={{
            title: 'Multi-Select',
            placeholder: 'Choose your favorite ice cream',
            helperLabel: 'Ice cream is delicious',
            defaultValue: [testOptions[1].value, testOptions[2].value],
            options: testOptions,
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


MultiSelectPage.displayName = 'MultiSelectPage';

export default MultiSelectPage;
