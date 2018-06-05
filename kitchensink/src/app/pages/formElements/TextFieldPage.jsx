import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TextField } from 'pyrene';

import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import FormElementsUsage from './FormElementsUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const TextFieldPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Textfield</div>
      <div styleName="description">
        Textfields are used primarily on ....
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
          <CodePage component={TextField} startProps={{ title: 'Field Label', placeholder: 'Placeholder Text', helperLabel: 'Helper text for instructions', width: 499 }} />
        </React.Fragment>
      );
    case 'usage':
      return <FormElementsUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


TextFieldPage.displayName = 'TextFieldPage';

export default TextFieldPage;
