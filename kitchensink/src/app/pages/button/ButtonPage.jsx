import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../../common/PageElements/SubPagingMenu/SubPagingMenu';
import {Button, Button2, Checkbox, RadioSelection, TextArea, TextField} from 'pyrene';
import ButtonUsage from './ButtonUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const ButtonPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Button</div>
      <div styleName="description">
          Buttons are used primarily on action items.
          Some examples include Add, Start, Save, Delete.
          Do not use Buttons as navigational elements.
          Instead, use Links because it takes the user to a new page and is not associated with an action.
          Each page may have one to two primary buttons. Any remaining calls-to-action are represented as secondary buttons.
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
          <CodePage component={Button} startProps={{ label: 'Click Me' }} />
        </React.Fragment>
      );
    case 'usage':
      return <ButtonUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


ButtonPage.displayName = 'ButtonPage';

export default ButtonPage;
