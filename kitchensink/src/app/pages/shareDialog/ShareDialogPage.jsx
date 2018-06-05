import React from 'react';
import PropTypes from 'prop-types';
import { ShareDialog } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const ShareDialogPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Share</div>
      <div styleName="description">
          Share dialogs are used primarily on ....
      </div>

    </div>

    <div styleName="topicContent">
      <CodePage component={ShareDialog} startProps={{ position: 'bottom-right', link: 'http://www.veryveryverylonglinkonanydomainintheinternet.com' }} />
    </div>
  </div>
);


ShareDialogPage.displayName = 'ShareDialogPage';

ShareDialogPage.propTypes = {
};

ShareDialogPage.defaultProps = {
};

export default ShareDialogPage;
