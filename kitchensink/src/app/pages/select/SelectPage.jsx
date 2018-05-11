import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../../common/PageElements/SubPagingMenu';
import { SingleSelect } from 'pyrene';
import SelectUsage from './SelectUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const SelectPage = ({ match }) => (
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
          <CodePage component={SingleSelect} startProps={{label: 'yo' }} />
        </React.Fragment>
      );
    case 'usage':
      return <SelectUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


SelectPage.displayName = 'SelectPage';

export default SelectPage;
