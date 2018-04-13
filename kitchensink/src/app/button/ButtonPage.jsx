import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SubPagingMenu from '../common/SubPagingMenu';

import '../../css/componentPage.css';

const ButtonPage = ({ match }) => (
    <div className="page">
      <div styleName="header">
        <div styleName="title">Buttons</div>
        <div styleName="description">
          Buttons are used primarily on action items.
          Some examples include Add, Start, Save, Delete.
          Do not use Buttons as navigational elements.
          Instead, use Links because it takes the user to a new page and is not associated with an action.
          Each page may have one to two primary buttons. Any remaining calls-to-action are represented as secondary buttons .
        </div>

        <SubPagingMenu currentPageUrl={match.url}/>
      </div>

      <div styleName="topicContent">
        <Route path={`${match.url}/:topicName`} component={Topic} />
        <Route exact={true} path={match.url} render={() => <h3>Please select a topic.</h3>} />
      </div>
    </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicName}</h3>
  </div>
);

ButtonPage.displayName = 'ButtonPage';

ButtonPage.propTypes = {
};

ButtonPage.defaultProps = {
};

export default ButtonPage;