import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import SubPagingMenu from '../../common/PageElements/SubPagingMenu';
import { ShareDialog } from 'pyrene';
import ShareDialogUsage from './ShareDialogUsage';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const ShareDialogPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Share</div>
      <div styleName="description">
          Share dialogs are used primarily on ....
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
      return <CodePage component={ShareDialog} startProps={{ position: 'bottom-right', link: 'http://www.veryveryverylonglinkonanydomainintheinternet.com' }} />;
    case 'usage':
      return <ShareDialogUsage />;
    default:
      return <h3>{match.params.topicName}</h3>;
  }
};


ShareDialogPage.displayName = 'ShareDialogPage';

ShareDialogPage.propTypes = {
};

ShareDialogPage.defaultProps = {
};

export default ShareDialogPage;
