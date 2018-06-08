import React from 'react';
import { Link } from 'pyrene';
import CodePage from '../../common/CodePage';
import '../../../css/componentPage.css';

const LinkPage = ({ match }) => (
  <div className="page">
    <div styleName="header">
      <div styleName="title">Link</div>
      <div styleName="description">
          Links are used primarily on ....
      </div>
    </div>
    <div styleName="topicContent">
      <CodePage component={Link} startProps={{ label: 'Click Me', path: '#' }} />
    </div>
  </div>
);


LinkPage.displayName = 'LinkPage';

export default LinkPage;
