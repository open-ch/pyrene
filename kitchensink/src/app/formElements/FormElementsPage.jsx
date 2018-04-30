import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../common/PageElements/SubPagingMenu';
import { Link } from 'pyrene';
import { Checkbox } from 'pyrene';
import { RadioSelection } from 'pyrene';
import FormElementsUsage from './FormElementsUsage';
import CodePage from '../common/CodePage';
import '../../css/componentPage.css';

const FormElementsPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Form elements</div>
      <div styleName="description">
         Form elements are used primarily on ....
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
          <CodePage component={Checkbox} startProps={{ label: 'Click Me' }} />
          <CodePage component={ RadioSelection } startProps={{ preCheckedLabel: 'option 1' }} />
        </React.Fragment>
      );
    case 'usage':
      return <FormElementsUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


FormElementsPage.displayName = 'FormElementsPage';

export default FormElementsPage;
